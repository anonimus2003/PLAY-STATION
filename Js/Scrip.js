function contactar() {
  const mensaje = encodeURIComponent(
    "Hola, estoy interesado en uno de sus productos."
  );

  const telefono = "573001234567"; // cambia por tu número
  const url = `https://wa.me/${telefono}?text=${mensaje}`;

  window.open(url, "_blank");
}


// Inicializar mapa centrado en Popayán
const map = L.map("map").setView([2.4444, -76.6066], 14);

// Capa de OpenStreetMap (gratis)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Marcadores (coordenadas aproximadas)
const locations = [
  {
    name: "Local 170 – Terraplaza",
    coords: [2.4888461031504283, -76.56064162176257],
    desc: "Play Station Terraplaza, Popayán",
  },
  {
    name: "Local 5 (Sótano) – Campanario",
    coords: [2.459687733429201, -76.59582772044925],
    desc: "Play Station Campanario, Popayán",
  },
  {
    name: "San Andresito",
    coords: [2.4397801890825472, -76.60772847156359],
    desc: "San Andresito, Popayán",
  },
];

// Agregar marcadores
locations.forEach((loc) => {
  L.marker(loc.coords)
    .addTo(map)
    .bindPopup(`<strong>${loc.name}</strong><br>${loc.desc}`);
});

let productos = [];

// 1️⃣ Cargar JSON
fetch("data/productos.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("No se pudo cargar el JSON");
    }
    return response.json();
  })
  .then(data => {
    productos = data;
    renderProductos();
  })
  .catch(error => {
    console.error("Error:", error);
  });

// 2️⃣ Pintar productos en el HTML
function renderProductos() {
  productos.forEach(p => {

    const contenedor = document.getElementById(
      `productos-${p.categoria}`
    );

    if (!contenedor) return;

    contenedor.innerHTML += `
      <div class="product-card">
        <img src="img/${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p>
          ${p.precio 
            ? "$ " + p.precio.toLocaleString() 
            : "Precio a consultar"}
        </p>
        <button onclick="addToCart(${p.id})">
          Agregar al carrito
        </button>
      </div>
    `;
  });
}

// ================= OFERTAS =================
fetch("data/ofertas.json")
  .then(res => res.json())
  .then(ofertas => {
    renderOfertas(ofertas);
  });

// ================= OFERTAS =================
fetch("data/ofertas.json")
  .then(response => response.json())
  .then(ofertas => {
    renderOfertas(ofertas);
  })
  .catch(error => {
    console.error("Error cargando ofertas:", error);
  });

function renderOfertas(ofertas) {
  const contenedor = document.getElementById("productos-ofertas");
  contenedor.innerHTML = "";

  ofertas.forEach(oferta => {
    contenedor.innerHTML += `
      <div class="oferta-card ${oferta.destacado ? "destacado" : ""}">
        <span class="${oferta.badgeClase}">
          ${oferta.badgeTexto}
        </span>

        <img src="img/${oferta.imagen}" alt="${oferta.nombre}">

        <h3>${oferta.nombre}</h3>

        <p class="precio">
          <span class="antes">
            $${oferta.precioAntes.toLocaleString()}
          </span>
          <span class="ahora">
            $${oferta.precioAhora.toLocaleString()}
          </span>
        </p>

        <button onclick="addToCartOferta(${oferta.id})">
          Agregar al carrito
        </button>
      </div>
    `;
  });
}


