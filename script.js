async function searchMusic() {
    const query = document.getElementById('search').value;
    if (!query) return;

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = 'Buscando...';

    try {
        const response = await fetch(`https://pipedapi.kavin.rocks/search?q=${encodeURIComponent(query)}&filter=music_songs`);
        const data = await response.json();

        resultsContainer.innerHTML = '';

        data.items.forEach(item => {
            const videoElement = document.createElement('div');
            videoElement.className = 'video-item';
            videoElement.innerHTML = `
                <img src="${item.thumbnail}" width="120">
                <p>${item.title}</p>
            `;
            videoElement.onclick = () => playMusic(item.url);
            resultsContainer.appendChild(videoElement);
        });
    } catch (error) {
        resultsContainer.innerHTML = 'Error al buscar música.';
    }
}

function playMusic(videoUrl) {
    document.getElementById('playerFrame').src = videoUrl;
}
