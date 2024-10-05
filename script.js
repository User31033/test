const API_KEY = 'AIzaSyBnWHeJSEkPKng4qShlwRjpgAwe_yO4DaI'; // Tu clave API

function searchSong() {
  const query = document.getElementById('searchQuery').value;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}&maxResults=5`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = ''; // Limpiar resultados anteriores

      data.items.forEach(item => {
        const videoId = item.id.videoId;
        const title = item.snippet.title;
        const thumbnail = item.snippet.thumbnails.default.url;

        // Mostrar los resultados con botones de "Reproducir" y "Compartir"
        const resultItem = `
          <div>
            <img src="${thumbnail}" alt="${title}">
            <p>${title}</p>
            <button onclick="playSong('${videoId}')">Reproducir</button>
            <button onclick="shareSong('${videoId}')">Compartir con amigo</button>
          </div>
        `;
        resultsDiv.innerHTML += resultItem;
      });
    })
    .catch(error => console.error('Error al buscar canciones:', error));
}

function playSong(videoId) {
  const playerDiv = document.getElementById('player');
  playerDiv.innerHTML = `
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  `;
}

// Compartir el enlace de la canción
function shareSong(videoId) {
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  alert(`Comparte este enlace con tu amigo: ${url}`);
}
