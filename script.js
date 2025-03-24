const pipedApiUrl = "https://pipedapi.kavin.rocks"; 

async function searchMusic() {
    const query = document.getElementById('search').value;
    if (!query) return;

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = 'Buscando...';

    try {
        // Buscar en Piped directamente
        const response = await fetch(`${pipedApiUrl}/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            resultsContainer.innerHTML = 'No se encontraron resultados.';
            return;
        }

        resultsContainer.innerHTML = '';

        data.items.forEach(item => {
            if (item.url.includes("/watch?v=")) {
                const videoId = item.url.split("/watch?v=")[1];

                const videoElement = document.createElement('div');
                videoElement.className = 'video-item';
                videoElement.innerHTML = `
                    <img src="${item.thumbnail}" width="120">
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
