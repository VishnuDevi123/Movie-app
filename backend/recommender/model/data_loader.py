# model/data_loader.py

import pandas as pd
import pickle
import os

# Define paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR,'..', 'movies.csv')
META_DATA_PATH = os.path.join(BASE_DIR, '..', 'movies_metadata.csv')
MODEL_PATH = os.path.join(BASE_DIR, 'model.pkl')

def load_movies():
    meta_data_content = pd.read_csv(META_DATA_PATH)  # has id, poster_path
    train_content = pd.read_csv(DATA_PATH)           # has id, title, overview, genres
    return meta_data_content, train_content

def load_similarity_model():
    """Load the cosine similarity matrix."""
    with open(MODEL_PATH, 'rb') as f:
        return pickle.load(f)