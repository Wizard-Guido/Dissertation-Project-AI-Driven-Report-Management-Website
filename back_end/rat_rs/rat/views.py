import json
import pandas as pd
from itertools import chain

from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rat.models import User, Model, Question, Stock
from rat_rs.settings import SECRET_KEY
from rat.serializers import UserSerializer, ModelSerializer, QuestionSerializer, ModelUpdateSerializer
from rat.utils.PaperRec import PaperRec


# Account Sign up API
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    print('----')
    user_obj = request.data
    print(user_obj)
    serializer = UserSerializer(data=user_obj)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    user_data = serializer.data
    return Response(user_data, status=status.HTTP_201_CREATED)


# Edit User Info
@api_view(['GET', 'PATCH'])
def user(request, user_id=0):
    if request.method == 'GET':
        try:
            user = User.objects.get(id=user_id)
            print(user)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response('Not Found', status=status.HTTP_404_NOT_FOUND)

    else:
        if not user_id == request.user.id:
            return Response('Not permission', status=status.HTTP_403_FORBIDDEN)

        user_db_obj = User.objects.get(id=user_id)
        serializer = UserSerializer(user_db_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Recommender system
@api_view(['GET'])
def recommendations(request):
    # get header token
    print(request.user)
    model_objs = Model.objects.filter(user_obj=request.user.id)
    dataframe = pd.DataFrame(list(Stock.objects.all().values('paper_name', 'paper_description', 'url')))
    ans = dataframe.head()[['paper_name', 'url']].values.tolist()
    ans = list(chain.from_iterable(ans))
    print(ans)
    if not model_objs:
        return Response(json.dumps(ans), status=200)

    field_object1 = Model._meta.get_field('model_name')
    field_object2 = Question._meta.get_field('answer')
    model_names = []
    index = 0
    print('---1-----')
    for model_obj in model_objs:
        model_name = field_object1.value_from_object(model_obj)
        q_object1 = Question.objects.filter(question_name='What is the purpose of the model?', model_obj=model_obj)
        print(q_object1)
        answer1 = field_object2.value_from_object(q_object1[0])
        print(answer1)
        model_names.append([model_name, answer1, ''])
        index += 1

    dataframe.append(model_names)
    # get new PaperRec Object
    print('---2-----')
    paper_rec = PaperRec(dataframe)
    print('---3-----')
    tfidf = paper_rec.to_tfidf()
    print('---4-----')
    print(index)
    recommendation = paper_rec.recommend(tfidf, index)
    print('---------------')
    print(recommendation)
    return Response(recommendation)
    # return Response(list(chain.from_iterable(recommendation.values.tolist())))


# get all models from certain user
@api_view(['GET', ])
def all_models(request):
    models = Model.objects.filter(Q(user_obj=request.user.id) | Q(public=True))
    serializer = ModelSerializer(models, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# get certain user's models
@api_view(['GET', 'POST'])
def user_models(request, user_id):

    if request.method == 'POST':
        print('---')
        print(request.data)
        if 'modelName' not in request.data:
            return Response("Request Data is not valid", status=status.HTTP_400_BAD_REQUEST)

        if not user_id == request.user.id:
            raise PermissionDenied()

        model_data = {'model_name': request.data['modelName'], 'user_obj': user_id, 'public': request.data['public']}
        print('model_data',model_data)
        model_serializer = ModelSerializer(data=model_data)

        if model_serializer.is_valid():
            model_serializer.save()
            if 'Q1' not in request.data:
                return Response(model_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(model_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        questions_list = request.data['Q1']
        for question_data in questions_list:
            model_obj = Model.objects.latest('id').id
            question_new_data = {'question_name': question_data['content'],
                                 'answer': question_data['answer'],
                                 'model_obj': model_obj}
            question_serializer = QuestionSerializer(data=question_new_data)
            if question_serializer.is_valid():
                question_serializer.save()
            else:
                return Response(question_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(request.data, status=status.HTTP_201_CREATED)

    else:
        if not user_id == request.user.id:
            models = Model.objects.filter(user_obj=user_id, public=True)
        else:
            models = Model.objects.filter(user_obj=user_id)
        serializer = ModelSerializer(models, many=True)
        print(user_id)
        print('s',serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)




# Models API
@api_view(['GET', 'PATCH', 'DELETE'])
def models(request, user_id, model_id):
    try:
        print(model_id)
        print(request.user.id)
        print('-----start-----')
        model_obj = Model.objects.get(Q(id=model_id) & (Q(user_obj=request.user.id) | Q(public=True)))
        questions = Question.objects.filter(model_obj=model_obj)
    except ObjectDoesNotExist:
        return Response('Not Data Found', status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':

        print(model_id)
        print(questions)
        questions_serializer = QuestionSerializer(questions, many=True)
        model_serializer = ModelSerializer(model_obj)
        questions_model = {
            'questions': questions_serializer.data,
            'model': model_serializer.data
        }
        return Response(questions_model, status=status.HTTP_200_OK)


    model_owner_field = Model._meta.get_field('user_obj')
    model_owner_id = model_owner_field.value_from_object(model_obj)
    model_owner = User.objects.get(id=model_owner_id)
    print(model_owner, "model_owner")
    print(request.user, "user")
    if not request.user == model_owner:
        raise PermissionDenied()

    if request.method == 'DELETE':
        model_obj = Model.objects.get(id=model_id)
        model_obj.delete()
        return Response(status=status.HTTP_200_OK)

    else:
        print(request.data)
        if 'model' not in request.data:
            return Response("Request Data is not valid", status=status.HTTP_400_BAD_REQUEST)

        model_serializer = ModelUpdateSerializer(model_obj, data=request.data['model'])

        if model_serializer.is_valid():
            model_serializer.save()
        else:
            return Response(model_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if 'questions' not in request.data:
            return Response(model_serializer.data, status=status.HTTP_201_CREATED)

        questions_list = request.data['questions']
        print('test111')
        question_objs = Question.objects.filter(model_obj=model_obj)
        print('test222')
        for question_data in questions_list:
            for question_obj in question_objs:
                name_field = Question._meta.get_field('question_name')
                question_name = name_field.value_from_object(question_obj)
                if question_name == question_data['question_name']:
                    question_new_data = {'model_obj': model_id, 'question_name': question_name, 'answer': question_data['answer']}
                    print("question_new_data", question_new_data)
                    question_serializer = QuestionSerializer(question_obj, data=question_new_data)

                    if question_serializer.is_valid():
                        question_serializer.save()
                    else:
                        return Response(question_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        return Response(request.data, status=status.HTTP_200_OK)
