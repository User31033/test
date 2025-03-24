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
                videoElement.onclick = () => playMusicWithIframe(videoId, item.title);
                resultsContainer.appendChild(videoElement);
            }
        });

    } catch (error) {
        resultsContainer.innerHTML = 'Error al buscar música.';
    }
}

function playMusicWithIframe(videoId, title) {
    const pipedPlayer = document.getElementById("pipedPlayer");

    // Cargar el video en un iframe oculto para reproducir solo el audio
    pipedPlayer.src = `https://piped.kavin.rocks/watch?v=${videoId}&autoplay=1`;
    pipedPlayer.style.display = "block"; // Mostrar el iframe si lo deseas

    document.getElementById("trackTitle").textContent = title;
}
