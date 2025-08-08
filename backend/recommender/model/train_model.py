import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os

MODEL_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(MODEL_DIR,'..', 'movies.csv')
MODEL_PATH = os.path.join(MODEL_DIR, 'model.pkl')

# required columns in the dataset: id, title, genre_ids, overview

movies_df = pd.read_csv(DATA_PATH)

# if any missing overview, fill with empty stirng
# function to create similarity matrix based on the combined features of title, genres, and overview
def create_similarity_matric(movies_df):
    movies_df['combined_features'] = movies_df['title'].fillna('')+" "+ movies_df['genres'].fillna('') + " " + movies_df['overview'].fillna('')
    # Create a TF-IDF Vectorizer to convert the overview text into numerical vectors
    tfidf = TfidfVectorizer(stop_words='english' , max_features=8000 , ngram_range=(1, 2), min_df=2)
    # Create a cosine similarity matrix based on the TF-IDF vectors
    # Fit and transform the overview column
    tfidf_matrix = tfidf.fit_transform(movies_df['combined_features'])
    similarity_matrix = cosine_similarity(tfidf_matrix, tfidf_matrix)
    return similarity_matrix

cosine_sim = create_similarity_matric(movies_df)
# Save the model to a file
with open(MODEL_PATH, 'wb') as f:
    pickle.dump(cosine_sim, f)

print(f"succeffuly saved the Model to {MODEL_PATH}")





