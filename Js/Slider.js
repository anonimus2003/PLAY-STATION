let Sliderproductos = [];

// 1️⃣ Cargar productos.json
fetch("data/productos.json")
  .then(res => res.json())
  .then(data => {
    productos = data;

    // 2️⃣ Filtrar solo los del slider
    const sliderproducts = productos.filter(p => p.slider === true);

    // 3️⃣ Renderizar slider
    renderSlider(sliderproducts);

    // 4️⃣ Iniciar slider infinito
    initInfiniteSlider();
  })
  .catch(err => console.error("Error slider:", err));

// ================= RENDER SLIDER =================
function renderSlider(items) {
  const slides = document.querySelector(".slides");
  slides.innerHTML = "";

  items.forEach(item => {
    slides.innerHTML += `
      <div class="slide">
        <img src="img/${item.imagen}" alt="${item.nombre}">
      </div>
    `;
  });
}

// ================= SLIDER INFINITO =================
function initInfiniteSlider() {
  const slides = document.querySelector(".slides");
  let slideItems = document.querySelectorAll(".slide");

  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");

  let index = 1;
  const intervalTime = 5000;
  let autoSlide;

  // CLONES
  const firstClone = slideItems[0].cloneNode(true);
  const lastClone = slideItems[slideItems.length - 1].cloneNode(true);

  firstClone.id = "first-clone";
  lastClone.id = "last-clone";

  slides.appendChild(firstClone);
  slides.insertBefore(lastClone, slideItems[0]);

  slideItems = document.querySelectorAll(".slide");

  const slideWidth = slideItems[index].clientWidth;
  slides.style.transform = `translateX(${-slideWidth * index}px)`;

  function moveSlide() {
    slides.style.transition = "transform 0.6s ease";
    slides.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  function nextSlide() {
    if (index >= slideItems.length - 1) return;
    index++;
    moveSlide();
  }

  function prevSlide() {
    if (index <= 0) return;
    index--;
    moveSlide();
  }

  slides.addEventListener("transitionend", () => {
    if (slideItems[index].id === "first-clone") {
      slides.style.transition = "none";
      index = 1;
      slides.style.transform = `translateX(${-slideWidth * index}px)`;
    }

    if (slideItems[index].id === "last-clone") {
      slides.style.transition = "none";
      index = slideItems.length - 2;
      slides.style.transform = `translateX(${-slideWidth * index}px)`;
    }
  });

  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, intervalTime);
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  next.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });

  prev.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });

  startAutoSlide();
}
