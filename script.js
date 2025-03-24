const pipedApiUrl = "https://pipedapi.kavin.rocks"; 
const songLinkApiUrl = "https://api.song.link/v1-alpha.1/search?query=";

async function searchMusic() {
    const query = document.getElementById('search').value;
    if (!query) return;

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = 'Buscando...';

    try {
        // Buscar canción en SongLink
        const response = await fetch(songLinkApiUrl + encodeURIComponent(query));
        const data = await response.json();

        if (!data.entitiesByUniqueId) {
            resultsContainer.innerHTML = 'No se encontraron resultados.';
            return;
        }

        resultsContainer.innerHTML = '';

        Object.values(data.entitiesByUniqueId).forEach(item => {
            if (item.platforms && item.platforms.youtube) {
                const youtubeUrl = item.platforms.youtube.url;
                const videoId = youtubeUrl.split("v=")[1];

                const videoElement = document.createElement('div');
                videoElement.className = 'video-item';
                videoElement.innerHTML = `
                    <img src="${item.thumbnailUrl}" width="120">
                    <p>${item.title}</p>
                `;
                videoElement.onclick = () => getAudioUrl(videoId, item.title);
                resultsContainer.appendChild(videoElement);
            }
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
            const bestAudio = data.audioStreams[0].url;
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
