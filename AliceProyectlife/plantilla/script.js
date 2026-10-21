// ===== Proyecto App del Tiempo · OpenWeather API 2.5 =====
// Documentación: https://openweathermap.org/current

const API_KEY = "TU_API_KEY";   // TODO: pon aquí tu clave
const URL_BASE = "https://api.openweathermap.org/data/2.5/weather";

function buscarTiempo(ciudad) {
  const url = `${URL_BASE}?q=${encodeURIComponent(ciudad)}&units=metric&lang=es&appid=${API_KEY}`;
  fetch(url)
    .then(r => r.json())
    .then(datos => {
      console.log(datos);        // mira en F12 → Console todo lo que llega
      // TODO (paso 6): si datos.cod != 200, muestra un mensaje de error y return
      mostrar(datos);
    });
    // TODO (paso 6): añade .catch para cuando no hay internet
}

function mostrar(datos) {
  document.getElementById("ciudad").textContent = datos.name;
  // TODO (paso 3): temperatura redondeada con " °C" en #temp
  // TODO (paso 3): descripción en #desc  → datos.weather[0].description
  // TODO (paso 5): icono → https://openweathermap.org/img/wn/CODIGO@2x.png
  // TODO (paso 5): humedad (%) y viento (m/s × 3.6 = km/h)
}

document.getElementById("buscador").addEventListener("submit", e => {
  e.preventDefault();
  const ciudad = document.getElementById("entrada").value.trim();
  if (ciudad) buscarTiempo(ciudad);
});

buscarTiempo("Las Palmas de Gran Canaria");

// EXTRA (paso 7): crea buscarPronostico(ciudad) con /data/2.5/forecast
