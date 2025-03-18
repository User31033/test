const clientId = "8a72c11826f14c4aa20d73b2267d2d1d";  // 🔹 Reemplaza con tu Client ID de Spotify
const redirectUri = "https://user31033.github.io/test/";  // 🔹 Cambia con tu GitHub Pages URL
const scope = "user-read-private user-read-email playlist-read-private";  // 🔹 Ahora también obtiene las playlists

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

    console.log("Token de acceso recibido:", accessToken); // Verifica que el token es válido

    // 🔹 Obtener datos del usuario
    fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(res => res.json())
    .then(user => {
        console.log("Datos del usuario:", user); // Muestra los datos en consola
        document.getElementById("userName").innerText = user.display_name;
        document.getElementById("userEmail").innerText = user.email;
        
        if (user.images.length > 0) {
            document.getElementById("userImage").src = user.images[0].url;
            document.getElementById("userImage").style.display = "block";
        }
    })
    .catch(error => console.error("Error al obtener el perfil:", error));

    // 🔹 Obtener listas de reproducción
    fetch("https://api.spotify.com/v1/me/playlists", {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(res => res.json())
    .then(data => {
        console.log("Playlists obtenidas:", data); // Muestra en consola
        const playlistContainer = document.getElementById("playlists");
        playlistContainer.innerHTML = ""; // Limpiar antes de agregar

        data.items.forEach(playlist => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${playlist.external_urls.spotify}" target="_blank">${playlist.name}</a>`;
            playlistContainer.appendChild(li);
        });
    })
    .catch(error => console.error("Error al obtener playlists:", error));
}

// 🔹 Función de búsqueda de canciones
document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.trim();
    
    if (query === "") return;

    fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(res => res.json())
    .then(data => {
        console.log("Resultados de búsqueda:", data);
        const searchResults = document.getElementById("searchResults");
        searchResults.innerHTML = ""; // Limpiar antes de mostrar resultados

        data.tracks.items.forEach(track => {
            const li = document.createElement("li");
            li.innerHTML = `
                <img src="${track.album.images[0].url}" width="50">
                <a href="${track.external_urls.spotify}" target="_blank">${track.name} - ${track.artists[0].name}</a>
            `;
            searchResults.appendChild(li);
        });
    })
    .catch(error => console.error("Error en la búsqueda:", error));
});

// 🔹 Cerrar sesión
document.getElementById("logoutBtn").addEventListener("click", () => {
    window.location.href = redirectUri; // 🔹 Recarga para borrar el token
});