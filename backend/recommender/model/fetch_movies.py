import requests
import pandas as pd
import os
from dotenv import load_dotenv

# Load API key from .env
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)
API_KEY = os.getenv('TMDB_API_KEY')

if not API_KEY:
    raise ValueError("TMDB_API_KEY not set in environment variables.")

# API and constants
TMDB_API_URL = "https://api.themoviedb.org/3/movie/popular"
TOTAL_MOVIES = 500
MOVIES_PER_PAGE = 20
NUMBER_OF_PAGES = TOTAL_MOVIES // MOVIES_PER_PAGE

# Genre mapping
GENRE_ID_MAP = {
    28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
    99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
    27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance",
    878: "Science Fiction", 10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"
}

# Data collections
train_data = []
metadata = []

for page in range(1, NUMBER_OF_PAGES + 1):
    params = {"page": page, "api_key": API_KEY}
    response = requests.get(TMDB_API_URL, params=params)

    if response.status_code != 200:
        print(f"Failed to fetch page {page}: {response.text}")
        continue

    for movie in response.json().get('results', []):
        if movie.get("original_language") != "en" or not movie.get("overview") or not movie.get("genre_ids") or not movie.get("title"):
            continue

        genre_ids = movie.get("genre_ids", [])
        genres = [GENRE_ID_MAP.get(gid, "Unknown") for gid in genre_ids]
        genres_str = ", ".join(genres)

        # For model training
        train_data.append({
            "id": movie.get("id"),
            "title": movie.get("title"),
            "overview": movie.get("overview", ""),
            "genres": genres_str
        })

        # For metadata (frontend)
        metadata.append({
            "id": movie.get("id"),
            "poster_path": movie.get("poster_path", ""),
            "release_date": movie.get("release_date", ""),
        })

# Save training data
train_df = pd.DataFrame(train_data)
train_csv_path = os.path.join(os.path.dirname(__file__), '..', 'movies.csv')
train_df.to_csv(train_csv_path, index=False)

# Save metadata
meta_df = pd.DataFrame(metadata)
meta_csv_path = os.path.join(os.path.dirname(__file__), '..', 'movies_metadata.csv')
meta_df.to_csv(meta_csv_path, index=False)

print(f"Saved {len(train_df)} movies to {train_csv_path}")
print(f"Saved {len(meta_df)} metadata entries to {meta_csv_path}")