const YT_API_KEY = "AIzaSyBnWHeJSEkPKng4qShlwRjpgAwe_yO4DaI"; // Reemplázala con tu clave de API de YouTube
const pipedApiUrl = "https://yapi.vyper.me"; 

async function searchMusic() {
    const query = document.getElementById('search').value;
    if (!query) return;

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = 'Buscando...';

    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&videoCategoryId=10&key=${YT_API_KEY}`);
        const data = await response.json();

        resultsContainer.innerHTML = '';

        data.items.forEach(item => {
            const videoId = item.id.videoId;
            const videoElement = document.createElement('div');
            videoElement.className = 'video-item';
            videoElement.innerHTML = `
                <img src="${item.snippet.thumbnails.default.url}" width="120">
                <p>${item.snippet.title}</p>
            `;
            videoElement.onclick = () => getAudioUrl(videoId, item.snippet.title);
            resultsContainer.appendChild(videoElement);
        });
    } catch (error) {
        resultsContainer.innerHTML = 'Error al buscar música.';
    }
}

async function getAudioUrl(videoId, title) {
    try {
        const response = await fetch(`${pipedApiUrl}/streams/${videoId}`);
        const data = await response.json();

        if (data.audioStreams && data.audioStreams.length > 0) {
            const bestAudio = data.audioStreams[0].url; // URL del mejor audio disponible
            playMusic(bestAudio, title);
        } else {
            alert("No se encontró un enlace de audio disponible.");
        }
    } catch (error) {
        alert("Error al obtener el audio.");
    }
}

function playMusic(audioUrl, title) {
    const audioPlayer = document.getElementById("audioPlayer");
    const trackTitle = document.getElementById("trackTitle");

    audioPlayer.src = audioUrl;
    trackTitle.textContent = title;
    audioPlayer.play();
}
