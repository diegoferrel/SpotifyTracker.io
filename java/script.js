class Usuario {
    constructor(nombre, email, password) {
      this.nombre = nombre;
      this.email = email;
      this.password = password;
    }
  }

function registro(event){
    event.preventDefault()
    document.querySelector(".form_registro")
    const nombre = document.querySelector(".nombre").value;
    const email = document.querySelector(".email").value;
    const pass = document.querySelector(".pass").value;
    if(nombre != "" && email != "" && pass != ""){
        const nuevoUsuario = new Usuario(nombre, email, pass);
    localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
    alert('Registro exitoso');
    window.location.href = 'login.html';
    }
    else{
        alert('Complete todos los campos');
    }
    
}

function login(event){
    event.preventDefault();

    const loginemail = document.querySelector("#login_email").value;
    const loginpass = document.querySelector("#login_pass").value;
    
    const usuarioregistrado = JSON.parse(localStorage.getItem('usuario'));

    if(usuarioregistrado && loginemail === usuarioregistrado.email && loginpass === usuarioregistrado.password){
        alert('Inicio de sesión exitoso');
        window.location.href = 'inicio.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

const usuarioregistrado = JSON.parse(localStorage.getItem('usuario'));

    document.querySelector("#bienvenida").innerHTML = `Bienvenido ${usuarioregistrado.nombre} al tracker de Spotify`;
    document.querySelector("#bienveni2").innerHTML = `!Bienvenido ${usuarioregistrado.nombre}!`;


    function rastrear() {
        const linkcancion = document.querySelector("#link").value.trim();
    
        if (!linkcancion) {
            alert("Ingrese un enlace de Spotify");
            return;
        }
    
        const songIdMatch = linkcancion.match(/track\/([a-zA-Z0-9]+)/);
        if (!songIdMatch) {
            alert("Ingrese un enlace válido de una canción de Spotify");
            return;
        }
    
        const songId = songIdMatch[1];
        const apiKey = "2ac8b79dafmsh1f722aa7e6a7a56p115bdajsn0d28c78ee0ac";
        const headers = {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": "spotify23.p.rapidapi.com"
        };
    
        fetch(`https://spotify23.p.rapidapi.com/tracks/?ids=${songId}`, { method: "GET", headers })
            .then(response => response.json())
            .then(songData => {
                const song = songData.tracks?.[0];
                if (!song) {
                    alert("No se encontró la canción");
                    return;
                }
    
                document.querySelector(".no_letra").innerHTML = `
                    <h2 class="cancion_titulo">${song.name}</h2>
                    <h3 class="artista">${song.artists.map(a => a.name).join(", ")}</h3>
                    <figure class="cancion_img">
                        <img src="${song.album.images[0].url}" alt="Imagen del álbum">
                    </figure>
                `;
    
                fetch(`https://spotify23.p.rapidapi.com/track_lyrics/?id=${songId}`, { method: "GET", headers })
                    .then(response => response.json())
                    .then(lyricsData => {
                        const lyrics = lyricsData.lyrics?.lines.map(line => line.words).join("<br>") || "Letra no disponible";
    
                        document.querySelector(".letra").innerHTML = `<p>${lyrics}</p>`;
                    })
                    .catch(error => {
                        console.error("Error al obtener la letra", error);
                        document.querySelector(".letra").innerHTML = "<p>Error al obtener la letra</p>";
                    });
            })
            .catch(error => {
                console.error("Error al obtener la canción", error);
                document.querySelector(".no_letra").innerHTML = "<p>Error al obtener la canción</p>";
            });
    }