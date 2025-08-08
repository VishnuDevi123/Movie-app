import numpy as np
import pandas as pd

def get_recommendations(favorite_ids, meta_df, train_df, similarity_matrix, top_n=10):
    if not favorite_ids:
        return []
    
    movie_id_to_index = pd.Series(train_df.index, index=train_df['id']).to_dict()
    valid_fav_indices = [movie_id_to_index.get(movie_id) for movie_id in favorite_ids if movie_id in movie_id_to_index]
    
    if not valid_fav_indices:
        raise ValueError("None of the favorite movie IDs were found in the dataset.")
    
    sim_scores = np.sum(similarity_matrix[valid_fav_indices], axis=0)
    sim_scores[valid_fav_indices] = -1
    top_indices = sim_scores.argsort()[-top_n:][::-1]

    # Merge train and metadata
    recommended = train_df.iloc[top_indices].merge(meta_df, on='id', how='left')

    return recommended[['id', 'title', 'genres', 'overview', 'poster_path','release_date']].to_dict(orient='records')