from flask import Flask, request, jsonify
import yt_dlp
import requests

app = Flask(__name__)

SPOTIFY_API_URL = "https://api.spotify.com/v1/search"
SPOTIFY_TOKEN = "TU_ACCESS_TOKEN_DE_SPOTIFY"  # Necesitas generar esto en Spotify Developer

# 🔹 Buscar canciones en Spotify
def search_spotify(query):
    headers = {"Authorization": f"Bearer {SPOTIFY_TOKEN}"}
    params = {"q": query, "type": "track", "limit": 5}
    response = requests.get(SPOTIFY_API_URL, headers=headers, params=params)

    if response.status_code == 200:
        data = response.json()
        tracks = [
            {
                "title": track["name"],
                "artist": track["artists"][0]["name"],
                "id": track["id"],
                "thumbnail": track["album"]["images"][0]["url"],
            }
            for track in data["tracks"]["items"]
        ]
        return tracks
    else:
        return []

# 🔹 Obtener URL del audio desde YouTube con yt-dlp
def get_audio_url(query):
    ydl_opts = {
        "format": "bestaudio/best",
        "noplaylist": True,
        "quiet": True,
        "default_search": "ytsearch",
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(query, download=False)
        if "entries" in info:
            video = info["entries"][0]  # Tomar el primer resultado
        else:
            video = info
        return video["url"]

@app.route("/search", methods=["GET"])
def search():
    query = request.args.get("q")
    results = search_spotify(query)
    return jsonify(results)

@app.route("/get_audio", methods=["GET"])
def get_audio():
    query = request.args.get("q")
    audio_url = get_audio_url(query)
    return jsonify({"audio_url": audio_url})

if __name__ == "__main__":
    app.run(debug=True)
