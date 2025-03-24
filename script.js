const YT_API_KEY = "AIzaSyBnWHeJSEkPKng4qShlwRjpgAwe_yO4DaI"; // Reemplázala con tu clave de API de YouTube

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
            videoElement.onclick = () => playMusic(videoId);
            resultsContainer.appendChild(videoElement);
        });
    } catch (error) {
        resultsContainer.innerHTML = 'Error al buscar música.';
    }
}

function playMusic(videoId) {
    const pipedInstance = "https://piped.video"; // Instancia de Piped
    document.getElementById('playerFrame').src = `${pipedInstance}/watch?v=${videoId}`;
}
