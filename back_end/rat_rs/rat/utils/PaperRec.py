import numpy as np
import json
from sklearn.metrics.pairwise import cosine_similarity
from scipy import sparse
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
import nltk
import re
import numpy as np
import pandas as pd
from nltk.stem.porter import PorterStemmer
from nltk.stem import WordNetLemmatizer


class PaperRec(object):

    def __init__(self, dataframe):
        self.dataframe = dataframe
        self.stop_words = nltk.corpus.stopwords.words('english')
        self.stop_words.extend(
            ['abm', 'also', 'agent', 'model', 'however', 'one', 'show', 'two', 'use', 'base', 'base model', 'different',
             'study', 'analysis', 'approach', 'result', 'research', 'simulation', 'paper', 'simulate', 'well',
             'social'])

    def normalize_document(self, doc):
        doc = re.sub(r'[^a-zA-Z0-9\s]', '', doc, re.I | re.A)
        doc = doc.lower()
        doc = doc.strip()
        tokens = nltk.word_tokenize(doc)
        tokens_tags = nltk.pos_tag(tokens)
        wordnet_lemmatizer = WordNetLemmatizer()
        lemmatized_tokens = []
        for token, tag in tokens_tags:
            if tag in ['RBS', 'RBR', 'RB']:
                lemmatized_tokens.append(wordnet_lemmatizer.lemmatize(token, pos='r'))
            elif tag in ['JJ', 'JJS', 'JJR']:
                lemmatized_tokens.append(wordnet_lemmatizer.lemmatize(token, pos='a'))
            elif tag in ['VB', 'VBP', 'VBZ', 'VBD', 'VBN', 'VBG']:
                lemmatized_tokens.append(wordnet_lemmatizer.lemmatize(token, pos='v'))
            elif tag in ['NN', 'NNS', 'NNP', 'NNPS']:
                lemmatized_tokens.append(wordnet_lemmatizer.lemmatize(token, pos='n'))
            else:
                lemmatized_tokens.append(wordnet_lemmatizer.lemmatize(token))
        filtered_tokens = [token for token in lemmatized_tokens if token not in self.stop_words]
        doc = ' '.join(filtered_tokens)
        return doc

    def preprocess(self):
        normalize_corpus = np.vectorize(self.normalize_document)
        norm_corpus = normalize_corpus(self.dataframe['paper_description'].values)

        for i in range(len(norm_corpus)):
            sentence = norm_corpus[i]
            if 'agentbased model' in sentence:
                sentence = sentence.replace('agentbased model', 'abm')
            if 'agent base model' in sentence:
                sentence = sentence.replace('agent base model', 'abm')
            if 'abms' in sentence:
                sentence = sentence.replace('abms', 'abm')
            if 'agentbasedmodels' in sentence:
                sentence = sentence.replace('agentbasedmodels', 'abm')
            if 'agentbased' in sentence:
                sentence = sentence.replace('agentbased', 'abm')
            if 'agent model' in sentence:
                sentence = sentence.replace('agent model', 'abm')
            if 'agent based model' in sentence:
                sentence = sentence.replace('agent based model', 'abm')
            if 'review review' in sentence:
                sentence = sentence.replace('review review', 'review')

            norm_corpus[i] = sentence

        return norm_corpus

    def to_tfidf(self):
        norm_corpus = self.preprocess()
        cv = CountVectorizer(ngram_range=(1, 2), min_df=80, max_df=0.9, stop_words=self.stop_words)
        cv_matrix = cv.fit_transform(norm_corpus)
        transformer = TfidfTransformer()
        tfidf = transformer.fit_transform(cv_matrix)

        return tfidf

    # Recommender method
    def recommend(self, sparse_matrix, index1):
        similarities = cosine_similarity(sparse_matrix)
        print(similarities)
        all_indexs = []
        while index1 > 0:
            sorted_list = np.sort(similarities[-1*index1])[::-1]
            index_list1 = []
            for index, value in enumerate(similarities[-1*index1]):
                if value > sorted_list[10]:
                    index_list1.append([index, value])
            # print(index_list1)
            index_list1.sort(key=lambda a: a[1], reverse=True)
            index_list = list(map(lambda a: a[0], index_list1))
            print(sorted_list[0:10])
            print(index_list)
            all_indexs.extend(index_list)
            index1 -= 1
        title_matrix1 = self.dataframe[['paper_name', 'url']]
        result = title_matrix1.iloc[all_indexs].to_json(orient="split")
        parsed = json.loads(result)
        return parsed['data']

