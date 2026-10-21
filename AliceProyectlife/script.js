// ============================================================
//  Proyecto App del Tiempo · OpenWeather API 2.5
//  Si quieres que el laboratorio venga con una clave ya puesta,
//  escríbela aquí (ojo: cualquiera que abra la web podrá verla).
// ============================================================
const DEMO_KEY = "";

// ---------------- Pasos del proyecto ----------------
const PASOS = [
  {
    titulo: "Hola API: tu primera petición",
    resumen: "fetch + console.log",
    texto: `
      <p>Crea un <code>index.html</code> con este código, cambia <code>TU_API_KEY</code> por tu clave y ábrelo en el navegador. Pulsa <kbd>F12</kbd> → <strong>Console</strong>: verás un objeto con todos los datos del tiempo de Londres.</p>
      <ul>
        <li><code>fetch(url)</code> pide los datos al servidor (tarda un poco, por eso usamos <code>.then</code>).</li>
        <li><code>r.json()</code> convierte la respuesta en un objeto de JavaScript.</li>
        <li><code>console.log(datos)</code> lo muestra en la consola para explorarlo.</li>
      </ul>`,
    codigos: [{
      etiqueta: "index.html",
      codigo: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Tiempo</title>
</head>
<body>
  <script>
    const API_KEY = "TU_API_KEY";
    fetch(\`https://api.openweathermap.org/data/2.5/weather?q=London&appid=\${API_KEY}\`)
      .then(r => r.json())
      .then(datos => console.log(datos));
  </script>
</body>
</html>`
    }],
    reto: "Despliega el objeto en la consola y busca dónde está la temperatura. ¿Por qué sale un número tan alto como 285? (Pista: está en Kelvin)."
  },
  {
    titulo: "Grados Celsius y en español",
    resumen: "parámetros units y lang",
    texto: `
      <p>Añadimos dos parámetros a la URL: <code>units=metric</code> (°C y m/s) y <code>lang=es</code> (descripción en español). Y en vez de imprimir todo, sacamos solo lo que nos interesa.</p>`,
    codigos: [{
      etiqueta: "script",
      codigo: `const API_KEY = "TU_API_KEY";
const ciudad = "Las Palmas de Gran Canaria";

fetch(\`https://api.openweathermap.org/data/2.5/weather?q=\${ciudad}&units=metric&lang=es&appid=\${API_KEY}\`)
  .then(r => r.json())
  .then(datos => {
    console.log("Ciudad:", datos.name);
    console.log("Temperatura:", datos.main.temp, "°C");
    console.log("Cielo:", datos.weather[0].description);
  });`
    }],
    reto: "Saca también la humedad y la sensación térmica. Mira la tabla del apartado 5."
  },
  {
    titulo: "Separar en 3 archivos y pintar en la página",
    resumen: "HTML + CSS + JS · getElementById",
    texto: `
      <p>Un proyecto de verdad separa la estructura (<code>index.html</code>), el diseño (<code>style.css</code>) y la lógica (<code>script.js</code>). Ahora los datos ya no van a la consola: los escribimos dentro de la página con <code>textContent</code>.</p>`,
    codigos: [
      {
        etiqueta: "index.html",
        codigo: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mi App del Tiempo</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="tarjeta">
    <h1 id="ciudad">Cargando…</h1>
    <p id="temp" class="temp"></p>
    <p id="desc"></p>
  </main>
  <script src="script.js"></script>
</body>
</html>`
      },
      {
        etiqueta: "script.js",
        codigo: `const API_KEY = "TU_API_KEY";
const URL_BASE = "https://api.openweathermap.org/data/2.5/weather";

fetch(\`\${URL_BASE}?q=Telde&units=metric&lang=es&appid=\${API_KEY}\`)
  .then(r => r.json())
  .then(datos => {
    document.getElementById("ciudad").textContent = datos.name;
    document.getElementById("temp").textContent = Math.round(datos.main.temp) + " °C";
    document.getElementById("desc").textContent = datos.weather[0].description;
  });`
      },
      {
        etiqueta: "style.css",
        codigo: `body {
  font-family: system-ui, Arial, sans-serif;
  background: linear-gradient(135deg, #1f5f99, #eb6e4b);
  min-height: 100vh; margin: 0;
  display: grid; place-items: center;
}
.tarjeta {
  background: white; border-radius: 16px; padding: 30px 40px;
  text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,.2);
}
.temp { font-size: 60px; font-weight: bold; margin: 0; }`
      }
    ],
    reto: "Usa Math.round para quitar decimales en todas las cifras y dale tu propio estilo a la tarjeta."
  },
  {
    titulo: "Buscador de ciudades",
    resumen: "input + botón + función",
    texto: `
      <p>Metemos el <code>fetch</code> dentro de una <strong>función</strong> que recibe la ciudad. Así la podemos llamar cada vez que alguien escribe una ciudad y pulsa el botón (o la tecla Enter, porque usamos un <code>&lt;form&gt;</code>).</p>
      <p><code>encodeURIComponent</code> sirve para que nombres con espacios o tildes (<em>"Gáldar"</em>, <em>"San Bartolomé"</em>) viajen bien en la URL.</p>`,
    codigos: [
      {
        etiqueta: "index.html (dentro de main)",
        codigo: `<form id="buscador">
  <input id="entrada" placeholder="Escribe una ciudad…">
  <button>Buscar</button>
</form>`
      },
      {
        etiqueta: "script.js",
        codigo: `function buscarTiempo(ciudad) {
  const url = \`\${URL_BASE}?q=\${encodeURIComponent(ciudad)}&units=metric&lang=es&appid=\${API_KEY}\`;
  fetch(url)
    .then(r => r.json())
    .then(datos => mostrar(datos));
}

function mostrar(datos) {
  document.getElementById("ciudad").textContent = datos.name;
  document.getElementById("temp").textContent = Math.round(datos.main.temp) + " °C";
  document.getElementById("desc").textContent = datos.weather[0].description;
}

document.getElementById("buscador").addEventListener("submit", e => {
  e.preventDefault();                       // que no se recargue la página
  const ciudad = document.getElementById("entrada").value.trim();
  if (ciudad) buscarTiempo(ciudad);
});

buscarTiempo("Las Palmas de Gran Canaria");   // ciudad al abrir la web`
      }
    ],
    reto: "Añade un parámetro de país para no confundir ciudades con el mismo nombre: q=Arucas,ES"
  },
  {
    titulo: "Icono, humedad, viento y amanecer",
    resumen: "imágenes y conversión de unidades",
    texto: `
      <p>OpenWeather nos da un <strong>código de icono</strong> (por ejemplo <code>03d</code>) y nosotros construimos la URL de la imagen. El viento viene en m/s (×3.6 = km/h) y las horas en <strong>segundos Unix</strong> (×1000 para pasarlas a milisegundos y crear un <code>Date</code>).</p>`,
    codigos: [
      {
        etiqueta: "index.html (añade)",
        codigo: `<img id="icono" alt="">
<ul>
  <li>💧 Humedad: <span id="humedad"></span></li>
  <li>🌬️ Viento: <span id="viento"></span></li>
  <li>🌅 Amanecer: <span id="amanecer"></span></li>
</ul>`
      },
      {
        etiqueta: "script.js (dentro de mostrar)",
        codigo: `const icono = datos.weather[0].icon;
document.getElementById("icono").src = \`https://openweathermap.org/img/wn/\${icono}@2x.png\`;
document.getElementById("humedad").textContent = datos.main.humidity + " %";
document.getElementById("viento").textContent = Math.round(datos.wind.speed * 3.6) + " km/h";

const amanecer = new Date(datos.sys.sunrise * 1000);
document.getElementById("amanecer").textContent =
  amanecer.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });`
      }
    ],
    reto: "Muestra también el atardecer (datos.sys.sunset) y las temperaturas mínima y máxima."
  },
  {
    titulo: "Control de errores",
    resumen: "cod 404 · 401 · sin internet",
    texto: `
      <p>¿Qué pasa si alguien escribe <em>"Lsa Plamas"</em>? La API responde con <code>cod: "404"</code> y <code>message: "city not found"</code>. Y si tu clave aún no está activa, <code>cod: 401</code>. Hay que avisar al usuario en vez de dejar la web rota. <code>.catch</code> recoge los fallos de red (sin internet).</p>`,
    codigos: [{
      etiqueta: "script.js",
      codigo: `function buscarTiempo(ciudad) {
  const url = \`\${URL_BASE}?q=\${encodeURIComponent(ciudad)}&units=metric&lang=es&appid=\${API_KEY}\`;
  fetch(url)
    .then(r => r.json())
    .then(datos => {
      if (datos.cod != 200) {                       // ojo: a veces viene como texto "404"
        if (datos.cod == 404) error("No encuentro esa ciudad 🤔");
        else if (datos.cod == 401) error("API key incorrecta o aún no activada 🔑");
        else error("Error: " + datos.message);
        return;
      }
      mostrar(datos);
    })
    .catch(() => error("No hay conexión a internet 📡"));
}

function error(mensaje) {
  document.getElementById("ciudad").textContent = mensaje;
  document.getElementById("temp").textContent = "";
  document.getElementById("desc").textContent = "";
}`
    }],
    reto: "Muestra el error en un recuadro rojo con CSS en lugar de en el título."
  },
  {
    titulo: "Pronóstico de 5 días",
    resumen: "/data/2.5/forecast · arrays · forEach",
    extra: true,
    texto: `
      <p>Cambiamos <code>weather</code> por <code>forecast</code>. Ahora la respuesta trae <code>datos.list</code>: un <strong>array</strong> con 40 previsiones (una cada 3 horas). Nos quedamos con las de las 12:00 de cada día con <code>filter</code> y creamos una tarjeta por día con <code>forEach</code>.</p>`,
    codigos: [
      {
        etiqueta: "index.html (añade)",
        codigo: `<section id="pronostico" class="pronostico"></section>`
      },
      {
        etiqueta: "script.js",
        codigo: `function buscarPronostico(ciudad) {
  const url = \`https://api.openweathermap.org/data/2.5/forecast?q=\${encodeURIComponent(ciudad)}&units=metric&lang=es&appid=\${API_KEY}\`;
  fetch(url)
    .then(r => r.json())
    .then(datos => {
      const caja = document.getElementById("pronostico");
      caja.innerHTML = "";                                    // vaciamos
      const mediodias = datos.list.filter(p => p.dt_txt.includes("12:00:00"));

      mediodias.forEach(p => {
        const dia = new Date(p.dt * 1000).toLocaleDateString("es-ES", { weekday: "long" });
        caja.innerHTML += \`
          <div class="dia">
            <strong>\${dia}</strong>
            <img src="https://openweathermap.org/img/wn/\${p.weather[0].icon}.png" alt="">
            <p>\${Math.round(p.main.temp)} °C</p>
          </div>\`;
      });
    });
}`
      }
    ],
    reto: "Llama a buscarPronostico(ciudad) desde el buscador, a la vez que buscarTiempo."
  },
  {
    titulo: "Retos para subir nota",
    resumen: "geolocalización · fondos · favoritos",
    extra: true,
    texto: `
      <p>Elige uno o varios:</p>
      <ul>
        <li><strong>📍 Mi ubicación:</strong> pide la posición al navegador y usa <code>lat</code> y <code>lon</code> en vez de <code>q</code>.</li>
        <li><strong>🎨 Fondo según el tiempo:</strong> si <code>datos.weather[0].main</code> es <code>"Rain"</code>, <code>"Clouds"</code> o <code>"Clear"</code>, cambia una clase del <code>body</code>.</li>
        <li><strong>⭐ Favoritas:</strong> guarda las últimas ciudades buscadas con <code>localStorage</code> y muéstralas como botones.</li>
        <li><strong>🌙 Día o noche:</strong> el icono termina en <code>d</code> (día) o <code>n</code> (noche). Úsalo para cambiar los colores.</li>
      </ul>`,
    codigos: [{
      etiqueta: "script.js · geolocalización",
      codigo: `navigator.geolocation.getCurrentPosition(pos => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  fetch(\`\${URL_BASE}?lat=\${lat}&lon=\${lon}&units=metric&lang=es&appid=\${API_KEY}\`)
    .then(r => r.json())
    .then(datos => mostrar(datos));
});`
    }],
    reto: "La geolocalización solo funciona en https (Netlify) o en localhost, no abriendo el archivo con doble clic."
  }
];

// ---------------- Pintar los pasos ----------------
const contenedor = document.getElementById("lista-pasos");
PASOS.forEach((p, i) => {
  const det = document.createElement("details");
  det.className = "paso" + (p.extra ? " extra" : "");
  if (i === 0) det.open = true;
  det.innerHTML = `
    <summary>
      <span class="paso-num">${i + 1}</span>
      <span class="paso-titulo"><strong>${p.titulo}</strong><span>${p.resumen}${p.extra ? " · extra" : ""}</span></span>
      <span class="flecha">▶</span>
    </summary>
    <div class="paso-cuerpo">${p.texto}</div>`;
  const cuerpo = det.querySelector(".paso-cuerpo");

  p.codigos.forEach(c => {
    const bloque = document.createElement("div");
    bloque.className = "codigo";
    bloque.innerHTML = `<span class="etiqueta"></span><button class="copiar">Copiar</button><pre><code></code></pre>`;
    bloque.querySelector(".etiqueta").textContent = c.etiqueta;
    bloque.querySelector("code").textContent = c.codigo;      // textContent: el código se ve tal cual
    bloque.querySelector(".copiar").onclick = e => copiar(c.codigo, e.target);
    cuerpo.appendChild(bloque);
  });

  if (p.reto) {
    const r = document.createElement("p");
    r.className = "reto";
    r.innerHTML = "<strong>✏️ Reto:</strong> ";
    r.append(p.reto);
    cuerpo.appendChild(r);
  }
  contenedor.appendChild(det);
});

function copiar(texto, boton) {
  const ok = () => { boton.textContent = "¡Copiado!"; setTimeout(() => (boton.textContent = "Copiar"), 1500); };
  if (navigator.clipboard) navigator.clipboard.writeText(texto).then(ok).catch(() => fallback());
  else fallback();
  function fallback() {
    const t = document.createElement("textarea");
    t.value = texto; document.body.appendChild(t); t.select();
    try { document.execCommand("copy"); ok(); } catch {}
    t.remove();
  }
}

// ---------------- Laboratorio ----------------
const labKey = document.getElementById("lab-key");
const labCiudad = document.getElementById("lab-ciudad");
const labTipo = document.getElementById("lab-tipo");
const labUrl = document.getElementById("lab-url");
const labRes = document.getElementById("lab-resultado");
const labJsonBox = document.getElementById("lab-json-box");
const labJson = document.getElementById("lab-json");

try { labKey.value = localStorage.getItem("owKey") || DEMO_KEY; } catch { labKey.value = DEMO_KEY; }

document.getElementById("lab-form").addEventListener("submit", e => {
  e.preventDefault();
  const key = labKey.value.trim();
  const ciudad = labCiudad.value.trim();
  if (!key) { pintarError("Escribe primero tu API key."); return; }
  if (!ciudad) { pintarError("Escribe una ciudad."); return; }
  try { localStorage.setItem("owKey", key); } catch {}

  const url = `https://api.openweathermap.org/data/2.5/${labTipo.value}?q=${encodeURIComponent(ciudad)}&units=metric&lang=es&appid=${key}`;
  labUrl.textContent = "GET " + url.replace(key, "TU_API_KEY");
  labRes.innerHTML = "<p>Consultando…</p>";

  fetch(url)
    .then(r => r.json())
    .then(datos => {
      labJson.textContent = JSON.stringify(datos, null, 2);
      labJsonBox.classList.remove("oculto");
      if (datos.cod != 200) {
        if (datos.cod == 401) pintarError("401 · API key incorrecta o todavía no activada (puede tardar un par de horas).");
        else if (datos.cod == 404) pintarError("404 · Ciudad no encontrada.");
        else pintarError(datos.cod + " · " + datos.message);
        return;
      }
      if (labTipo.value === "weather") pintarActual(datos);
      else pintarPronostico(datos);
    })
    .catch(() => pintarError("No se pudo conectar con OpenWeather."));
});

function pintarError(msg) {
  labRes.innerHTML = "";
  const d = document.createElement("div");
  d.className = "error";
  d.textContent = msg;
  labRes.appendChild(d);
}

const hora = s => new Date(s * 1000).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function pintarActual(d) {
  labRes.innerHTML = `
    <div class="tiempo-card">
      <img src="https://openweathermap.org/img/wn/${esc(d.weather[0].icon)}@2x.png" alt="">
      <div class="grados">${Math.round(d.main.temp)}°</div>
      <div>
        <div class="lugar">${esc(d.name)}, ${esc(d.sys.country)}</div>
        <div class="desc">${esc(d.weather[0].description)} · sensación ${Math.round(d.main.feels_like)}°</div>
        <div class="extras">
          <span>💧 ${d.main.humidity} %</span>
          <span>🌬️ ${Math.round(d.wind.speed * 3.6)} km/h</span>
          <span>🌅 ${hora(d.sys.sunrise)}</span>
          <span>🌇 ${hora(d.sys.sunset)}</span>
        </div>
      </div>
    </div>`;
}

function pintarPronostico(d) {
  const dias = d.list.filter(p => p.dt_txt.includes("12:00:00"));
  labRes.innerHTML = `<p><strong>${esc(d.city.name)}</strong> · previsión a mediodía</p><div class="pronostico">` +
    dias.map(p => `
      <div class="dia">
        <strong>${new Date(p.dt * 1000).toLocaleDateString("es-ES", { weekday: "long", day: "numeric" })}</strong>
        <img src="https://openweathermap.org/img/wn/${esc(p.weather[0].icon)}@2x.png" alt="">
        <div>${Math.round(p.main.temp)} °C</div>
        <span>${esc(p.weather[0].description)}</span>
      </div>`).join("") + "</div>";
}
