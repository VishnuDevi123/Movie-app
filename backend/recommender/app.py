from flask import Flask, request, jsonify
from flask_cors import CORS
from model.recommend import get_recommendations
from model.data_loader import load_movies, load_similarity_model

app = Flask(__name__)
CORS(app)

# Load model + data once
meta_df, train_df = load_movies()
similarity_matrix = load_similarity_model()

@app.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Welcome to the Movie Recommendation API!"}), 200

@app.route('/recommend', methods=['POST'])
def recommend_movies():
    data = request.json
    favorite_ids = data.get('favorite_ids', [])

    if not favorite_ids:
        return jsonify({"error": "No favorite movies provided"}), 400

    try:
        print("Received favorite movie IDs:", favorite_ids)
        recommendations = get_recommendations(favorite_ids, meta_df, train_df, similarity_matrix)
        return jsonify(recommendations), 200
    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)