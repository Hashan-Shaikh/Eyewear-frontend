import nltk
from nltk.stem import WordNetLemmatizer

nltk.download('punkt')
nltk.download('wordnet')

lemmatizer = WordNetLemmatizer()


def tokenize(sentence):
    return nltk.word_tokenize(sentence)


def bag_of_words(tokenized_sentence, all_words):
    tokenized_sentence = [lemmatizer.lemmatize(word.lower()) for word in tokenized_sentence]

    bag = []
    for word in all_words:
        bag.append(1 if word in tokenized_sentence else 0)

    return bag
