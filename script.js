let audio = new Audio();
let isPlaying = false;
let songs = [];

// Lista las canciones en la carpeta TP1
function loadSongs() {
    songs = [
        { title: "Canción 1", url: "TP1/birds of a feather.mp3" },
        { title: "Canción 2", url: "TP1/song2.mp3" },
        { title: "Canción 3", url: "TP1/song3.mp3" }
    ];

    displaySongs();
}

// Muestra las canciones en la barra de búsqueda
function displaySongs() {
    const resultsDiv = document.getElementById("searchResults");
    resultsDiv.innerHTML = ""; // Limpia resultados anteriores
    songs.forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.innerText = song.title;
        songDiv.onclick = () => playSong(song);
        resultsDiv.appendChild(songDiv);
    });
}

// Reproduce la canción seleccionada
function playSong(song) {
    audio.src = song.url;
    audio.play();
    isPlaying = true;
    document.getElementById("playPauseBtn").innerText = "⏸️";
    document.getElementById("songTitle").innerText = song.title;
}

// Función para filtrar las canciones
function filterSongs() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filteredSongs = songs.filter(song => song.title.toLowerCase().includes(query));
    displayFilteredSongs(filteredSongs);
}

// Muestra las canciones filtradas
function displayFilteredSongs(filteredSongs) {
    const resultsDiv = document.getElementById("searchResults");
    resultsDiv.innerHTML = ""; // Limpia resultados anteriores
    filteredSongs.forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.innerText = song.title;
        songDiv.onclick = () => playSong(song);
        resultsDiv.appendChild(songDiv);
    });
}

// Carga las canciones al iniciar la página
window.onload = () => {
    loadSongs();  // Carga las canciones al iniciar la página
};
