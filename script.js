const clientId = "8a72c11826f14c4aa20d73b2267d2d1d";  // 🔹 Reemplaza con tu Client ID de Spotify
const redirectUri = "https://user31033.github.io/test/";  // 🔹 Cambia con tu GitHub Pages URL
const scope = "streaming user-read-private user-read-email user-modify-playback-state";  

const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

document.getElementById("loginBtn").addEventListener("click", () => {
    window.location.href = authUrl;
});

const hash = window.location.hash.substring(1);
const params = new URLSearchParams(hash);
const accessToken = params.get("access_token");

if (accessToken) {
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "block";
    document.getElementById("userInfo").style.display = "block";

    // 🔹 Obtener datos del usuario
    fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(res => res.json())
    .then(user => {
        document.getElementById("userName").innerText = user.display_name;
        document.getElementById("userEmail").innerText = user.email;
        if (user.images.length > 0) {
            document.getElementById("userImage").src = user.images[0].url;
            document.getElementById("userImage").style.display = "block";
        }
    });

    // 🔹 Buscar canciones
    document.getElementById("searchBtn").addEventListener("click", () => {
        const query = document.getElementById("searchInput").value.trim();
        if (query === "") return;

        fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then(res => res.json())
        .then(data => {
            const searchResults = document.getElementById("searchResults");
            searchResults.innerHTML = ""; 

            data.tracks.items.forEach(track => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <img src="${track.album.images[0].url}" width="50">
                    <button onclick="playSong('${track.uri}')">▶️ Reproducir</button>
                    ${track.name} - ${track.artists[0].name}
                `;
                searchResults.appendChild(li);
            });
        });
    });

    // 🔹 Reproductor de Spotify
    window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
            name: "Spotify Web Player",