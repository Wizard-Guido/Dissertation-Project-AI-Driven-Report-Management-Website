from rest_framework import serializers
from rat.models import User, Model, Question


class UserSerializer(serializers.ModelSerializer):

    # Ensure passwords are at least 8 characters long, no longer than 128
    # characters, and can not be read by the client.
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'gender', 'last_name', 'first_name']

    def validate(self, attrs):
        username = attrs.get('username', '')
        if not username.isalnum():
            raise serializers.ValidationError(self.default_error_messages)
        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance





class ModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Model
        fields = '__all__'
        # read_only_fields = ('id', 'user_obj')

class ModelUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Model
        fields = '__all__'
        read_only_fields = ('id', 'user_obj')

class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = '__all__'
