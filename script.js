const clientId = "8a72c11826f14c4aa20d73b2267d2d1d";  // 🔹 Reemplaza con tu Client ID de Spotify
const redirectUri = "https://user31033.github.io/test/";  // 🔹 Cambia con tu GitHub Pages URL
const scope = "user-read-private user-read-email"; 

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

    fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(res => res.json())
    .then(user => {
        document.getElementById("userInfo").innerHTML = `<h3>Bienvenido, ${user.display_name}</h3>`;
    });
}

document.getElementById("logoutBtn").addEventListener("click", () => {
    window.location.href = redirectUri; // 🔹 Recarga para borrar el token
});
