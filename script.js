// Reemplaza esta clave por la tuya
const apiKey = 'AIzaSyBnWHeJSEkPKng4qShlwRjpgAwe_yO4DaI';

let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('videoPlayer', {
    height: '300',
    width: '300',
    videoId: '',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  console.log('El reproductor está listo.');
}

function onPlayerStateChange(event) {
  // Actualiza la UI según el estado del video
}

function searchSong() {
  const query = document.getElementById('searchInput').value;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${apiKey}&maxResults=5`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const searchResults = document.getElementById('searchResults');
      searchResults.innerHTML = ''; // Limpiamos los resultados anteriores

      data.items.forEach(item => {
        const videoId = item.id.videoId;
        const title = item.snippet.title;

        const resultElement = document.createElement('div');
        resultElement.classList.add('search-result');
        resultElement.textContent = title;
        resultElement.onclick = () => playVideo(videoId, title);
        searchResults.appendChild(resultElement);
      });
    })
    .catch(error => console.error('Error al buscar videos:', error));
}

function playVideo(videoId, title) {
  player.loadVideoById(videoId);
  document.getElementById('songTitle').textContent = title;
  document.getElementById('artistName').textContent = 'Desconocido'; // Puedes personalizar esto si quieres buscar el artista
}

function playPause() {
  const playPauseBtn = document.getElementById('playPauseBtn');
  if (player.getPlayerState() === YT.PlayerState.PLAYING) {
    player.pauseVideo();
    playPauseBtn.innerText = '▶️';
  } else {
    player.playVideo();
    playPauseBtn.innerText = '⏸️';
  }
}

function sendMessage() {
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');

  const message = document.createElement('p');
  message.textContent = chatInput.value;
  chatMessages.appendChild(message);
  chatInput.value = '';
}

function enterRoom() {
  alert('Entraste a la sala');
}

function leaveRoom() {
  alert('Saliste de la sala');
}

// Cargar el script de YouTube Iframe API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
