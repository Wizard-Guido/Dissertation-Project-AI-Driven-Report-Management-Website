---
title: NLP from Scratch
date: 2021-01-05
---

# NLP—NLTK—Text analysis

## 1. Tokenization

**Tokenization—1st Step in text analysis**

This process can **break down a text paragraph into smaller chunks such as words or sentence**.

Token is a single entity that is building blocks for sentence or paragraph.

### 1.1 Sentence Tokenization

Sentence tokeniser **breaks a text paragraph into sentences**.

### 1.2 Word Tokenization

It can **break a text paragraph into words**.

### 1.3 Frequency Distribution

The frequency of every unique word in the text

## 2. Stopwords

Stopwords considered as **noise in the text**. Text may contain **stop words such as is, am, are, this, a, an, the, etc**.

So in order to remove stopwords, we have to **create a list of stopwords** and **filter out your list of tokens from these words**.

## 3. Lexicon Normalization

Lexicon normalization considers different forms of a word as another type of noise. For example, **connection, connected, connecting** words **reduce to** a common word **"connect"**.

1. **Stemming**

   a process that reduces words to their word root. For example, **connection, connected, connecting words reduce to a common word "connect".

2. **Lemmatization**

   It's more **sophisticated** than stemming. Stemmer works on an individual word without knowledge of the context. For example, the word "better" has "good" as its lemma. But this will be missed by stemming because it requires a dictionary look-up

3. **POS Tagging**

   Part-of-Speech(POS) tagging is to identify the grammatical group of a given word. Whether it's noun, pronoun, adjective, verb, adverbs ect, based on the context.


### Feature Generation using Bag of Words

Bag of words model (BoW) is the simplest way of extracting features from the text. BoW converts text into the matrix of occurrence of words within a document. This model concerns about whether given words occurred or not in the document.

For example, this matrix is known as Document-Term Matrix(DTM).

![image-20220106103054521](/Users/arieskoo/Library/Application Support/typora-user-images/image-20220106103054521.png)

This matrix uses a single word. But it can also be a combiantion of two or more words, which is called a bigram or trigram model and the general approach is called the n-gram model.

### Split train and test set

To understand model performance, dividing the dataset into a training set and a test set is a good strategy.

### Model Building and Evaluation

When we fit the model on a train set and perform prediction on the test set. Sometimes, the accuracy is not good. We can use TF-IDF to improve it.

### Feature Generation using TF-IDF

In Term Frequency, we just count the number of words occurred in each document. The main issue with this Term Frequency i that it will give more weight to the longer documents. Term frequency is basically the output of the BoW model.

IDF(Inverse Document Frequency) measures the amount of information a given word provides across the document. 

 $IDF = log\frac{(documents)}{(documents--containing--word--W)}$

TF-IDF(Term Frequency-Inverse Document Frequency) normalises the document term matrix. It is the product of TF and IDF. Word with high tf-idf in a document, it is most of times occurred in given documents and must be absent in the other documents. So the words must be a signature word.

# Document Similarity

## 1. Clustering documents by using similarity features

### 1.1 Hierarchical Agglomerative clustering

Hierarchical Agglomerative clustering starts with treating **each observation as an individual cluster**, and then iteratively merges clusters until all the data points are merged into a single cluster. Dendrograms are used to represent hierarchical clustering results.

**Clusters are merged based on the distance between them**. To calculate the distance between the clusters we have different types of linkages.

- **Single Linkage** ---- the distance between two clusters is the minimum distance between members of the two clusters
- **Complete Linkage** ---- the distance between two clusters is the maximum distance between members of the two clusters
- **Average Linkage** ---- the distance between two clusters is the average of all distances between members of the two clusters
- **Cetroid Linkage** ---- the distance between two clusters is the distance between their centroids
- **Ward Linkage** ---- uses the Ward variance minimization algorithm



## K-Means Clustering

K-Means clustering is one of the most popular unsuperivised machine learning algorithms.





































