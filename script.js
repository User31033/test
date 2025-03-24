const pipedApiUrl = "https://yapi.vyper.me"; // Puedes cambiarla si es necesario

async function searchMusic() {
    const query = document.getElementById('search').value;
    if (!query) return;

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = 'Buscando...';

    try {
        const response = await fetch(`${pipedApiUrl}/search?q=${encodeURIComponent(query)}&filter=music_songs`);
        const data = await response.json();

        resultsContainer.innerHTML = '';

        data.items.forEach(item => {
            const videoId = item.url.split("watch?v=")[1];
            const videoElement = document.createElement('div');
            videoElement.className = 'video-item';
            videoElement.innerHTML = `
                <img src="${item.thumbnail}" width="120">
                <p>${item.title}</p>
            `;
            videoElement.onclick = () => getAudioUrl(videoId, item.title);
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
