const clientId = "8a72c11826f14c4aa20d73b2267d2d1d";
const redirectUri = "http://127.0.0.1:5500"; // ¡Cambia esto si usas otro servidor!
let accessToken = "";

// URL de autenticación de Spotify
const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user-read-private user-read-email`;

// Manejar el token después del login
function handleAuthCallback() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    accessToken = params.get("access_token");

    if (accessToken) {
        window.history.replaceState({}, document.title, "/"); // Limpiar la URL
        document.getElementById("loginButton").style.display = "none";
        document.getElementById("searchInput").disabled = false;
        document.getElementById("searchButton").disabled = false;
        getUserProfile();
    }
}

// Obtener información del usuario
async function getUserProfile() {
    try {
        const response = await fetch("https://api.spotify.com/v1/me", {
            headers: { "Authorization": `Bearer ${accessToken}` }
        });
        const data = await response.json();
        document.getElementById("userInfo").textContent = `Hola, ${data.display_name}`;
    } catch (error) {
        console.error("Error obteniendo perfil:", error);
    }
}

// Buscar canciones en Spotify
async function searchSong() {
    const query = document.getElementById("searchInput").value;
    if (!query) return;

    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "Buscando...";

    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`, {
            headers: { "Authorization": `Bearer ${accessToken}` }
        });

        const data = await response.json();
        resultsContainer.innerHTML = "";

        if (!data.tracks || data.tracks.items.length === 0) {
            resultsContainer.innerHTML = "No se encontraron resultados.";
            return;
        }

        data.tracks.items.forEach(track => {
            const songDiv = document.createElement("div");
            songDiv.classList.add("song");
            songDiv.innerHTML = `
                <img src="${track.album.images[0].url}" alt="Cover">
                <div>
                    <strong>${track.name}</strong> - ${track.artists.map(a => a.name).join(", ")}
                    <br>
                    ${track.preview_url ? `<audio controls src="${track.preview_url}"></audio>` : "<span>Sin vista previa disponible</span>"}
                </div>
            `;
            resultsContainer.appendChild(songDiv);
        });

    } catch (error) {
        console.error("Error en la búsqueda:", error);
        resultsContainer.innerHTML = "Error en la búsqueda.";
    }
}

// Evento de inicio de sesión
document.getElementById("loginButton").addEventListener("click", () => {
    window.location.href = authUrl;
});

// Evento de búsqueda
document.getElementById("searchButton").addEventListener("click", searchSong);

// Verificar si hay un token en la URL (después del login)
handleAuthCallback();
