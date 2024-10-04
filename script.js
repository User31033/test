let player;
let currentTrackIndex = 0;
let tracks = []; // Almacenará los resultados de búsqueda de YouTube
let isPlaying = false;

// Cargar la API de YouTube
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: '',
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    document.getElementById('playPause').addEventListener('click', playPause);
    document.getElementById('next').addEventListener('click', nextTrack);
    document.getElementById('prev').addEventListener('click', prevTrack);
}

// Búsqueda en YouTube
document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchQuery').value;
    searchYouTube(query);
});

function searchYouTube(query) {
    gapi.client.setApiKey('AIzaSyBnWHeJSEkPKng4qShlwRjpgAwe_yO4DaI'); // Aquí va tu API Key de YouTube
    gapi.client.load('youtube', 'v3', function() {
        const request = gapi.client.youtube.search.list({
            q: query,
            part: 'snippet',
            maxResults: 5
        });

        request.execute(function(response) {
            const results = response.items;
            const searchResults = document.getElementById('searchResults');
            searchResults.innerHTML = '';

            tracks = results.map((item, index) => {
                const trackElement = document.createElement('div');
                trackElement.innerText = item.snippet.title;
                trackElement.addEventListener('click', () => loadTrack(index));
                searchResults.appendChild(trackElement);
                return item.id.videoId;
            });
        });
    });
}

// Cargar y reproducir una canción
function loadTrack(index) {
    player.loadVideoById(tracks[index]);
    currentTrackIndex = index;
    isPlaying = true;
}

// Funciones de control
function playPause() {
    if (isPlaying) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
    isPlaying = !isPlaying;
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
}
