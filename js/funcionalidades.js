//Header oculto
let lastScroll = 0;

const navBar = document.querySelector('.navbar');
window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll) {
      navBar.classList.add("head-oculto");

    } else {
      navBar.classList.remove("head-oculto");
    }

    lastScroll = currentScroll;
  });

  //Cambio de titulo de la pestaña al minimizarla

  const originalTitle = document.title;
  let interval;
  
  document.addEventListener('visibilitychange', ()=>{
  
      if(document.hidden){
          let alternar= false;
          interval = setInterval(()=>{
              document.title = alternar ? 'Volvé, te extrañamos...' : originalTitle;
              alternar = !alternar;
          }, 1500);
          
      }else{
          clearInterval(interval);
          document.title = originalTitle;
      }
  });

//Modal para imagenes de galeria de proyectos

// Crear el modal una sola vez
const modalImg = document.createElement('div');
modalImg.classList.add('modal-img');
modalImg.innerHTML = `
  <div class="modal-content">
    <span class="cerrar">&times;</span>
    <img src="" alt="Imagen del proyecto" class="modal-img-content">
  </div>
`;
document.body.appendChild(modalImg);

const modalImgContent = modalImg.querySelector('.modal-img-content');
const closeModal = modalImg.querySelector('.cerrar');

// Evento para cerrar el modal
closeModal.addEventListener('click', () => {
  modalImg.style.display = 'none';
  document.body.style.overflow = ''; // ✅ Restaura el scroll
});

// Cerrar si se hace click fuera de la imagen
modalImg.addEventListener('click', (e) => {
  if (e.target === modalImg) {
    modalImg.style.display = 'none';
    document.body.style.overflow = ''; // ✅ Restaura el scroll
  }
});

// Evento para abrir modal al hacer click en una imagen de la galería
document.addEventListener('click', (e) => {
    
  if (e.target.classList.contains('grid-img')) {
    modalImgContent.src = e.target.src;
    modalImg.style.display = 'flex';
    navBar.classList.add('head-oculto');
    document.body.style.overflow = 'hidden'; // 🚫 Bloquea el scroll
  }
});

// Modal para funcionalidades de la pagina principal

//FN para crear Carousel
function crearCarousel(id, imagenes = []) {
  const slides = imagenes
    .map(
      (src, i) => `
      <div class="carousel-item ${i === 0 ? 'active' : ''}">
        <img src="${src}" class="d-block w-100" alt="Imagen ${i + 1}">
      </div>`
    )
    .join('');

  return `
    <div id="${id}" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        ${slides}
      </div>
      <a class="carousel-control-prev" href="#${id}" role="button" data-slide="prev">
        <span aria-hidden="true"><i class="fa-solid fa-angle-left fa-2xl" style="color:#e20d13;"></i></span>
        <span class="sr-only">Anterior</span>
      </a>
      <a class="carousel-control-next" href="#${id}" role="button" data-slide="next">
        <span aria-hidden="true"><i class="fa-solid fa-angle-right fa-2xl" style="color:#e20d13;"></i></span>
        <span class="sr-only">Siguiente</span>
      </a>
    </div>`;
}

//FN para mostrar modal
function mostrarModal(titulo, descripcion, imagenes = []) {
  const backToTopBtn = document.querySelector('.back-to-top');
  const modalCategorias = document.getElementById('modal-categorias');
  modalCategorias.style.display = 'flex';
  
  backToTopBtn.style.display = 'none';
  navBar.classList.add('head-oculto');
  document.body.style.overflow = 'hidden';
  const carouselHTML = crearCarousel('carouselModal', imagenes);

  modalCategorias.innerHTML = `
    <div class="modal-categorias-content">
      <span class="cerrar">&times;</span>
      <div class="modal-img-container">
        ${carouselHTML}
      </div>
      <div class="modal-info-container">
        <div class="modal-texto-container">
          <h2>${titulo}</h2>
          <p>${descripcion}</p>
        </div>
        <a href="https://wa.me/2235402839?text=Hola! Quiero cotizar un trabajo."
           class="btn btn-primary mt-3"
           target="_blank"
           rel="noopener noreferrer">
          Quiero contactarme
        </a>
      </div>
    </div>
  `;
}

//FN para cerrar modal
function cerrarModalCategorias() {
  const modalCategorias = document.getElementById('modal-categorias');
  modalCategorias.style.display = 'none';
  modalCategorias.innerHTML = '';
  document.body.style.overflow = ''; // ✅ Restaura el scroll
}

// Eventos para abrir y cerrar el modal dependiendo el boton clickeado
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('cerrar')) {
    cerrarModalCategorias();
  }
  if (e.target.id === 'aluminio-modal') {
  mostrarModal(
  'Trabajos en aluminio',
  'Desarrollamos soluciones a medida en aluminio, un material que combina ligereza, versatilidad y resistencia a la corrosión. Gracias a sus propiedades, es ideal para la fabricación de estructuras, cerramientos, piezas industriales y proyectos de diseño que requieren precisión y estética',
  [
    "/assets/imgs/cocina-aluminio.jpeg",
    "/assets/imgs/DSC00919.jpg",
    "/assets/imgs/.jpg",
    "/assets/imgs/.jpg"
  ]
  );

  }
  if (e.target.id === 'acero-modal') {
    mostrarModal(
  'Trabajos en acero',
  'Ofrecemos servicios especializados en trabajos con acero, un material conocido por su durabilidad y resistencia. Desde la fabricación de estructuras metálicas hasta la creación de piezas personalizadas, nuestro equipo utiliza técnicas avanzadas para garantizar resultados de alta calidad en cada proyecto.',
  [
    "/assets/imgs/balcon-acero.jpeg",
    "/assets/imgs/marquesina-acero.jpeg",
    "/assets/imgs/parrilla-acero.avif",
    "/assets/imgs/reja-acero.avif",
    './assets/imgs/escalera2-acero.jpeg'
  ]
  );
  }
  if (e.target.id === 'cyp-modal') {
    mostrarModal('Corte y plegado',
  'Contamos con tecnología avanzada para el corte y plegado de metales, permitiéndonos ofrecer soluciones precisas y eficientes para una amplia variedad de aplicaciones industriales y comerciales. Nuestro equipo está capacitado para manejar diferentes tipos de materiales, asegurando acabados de alta calidad y adaptados a las necesidades específicas de cada cliente.',
  [
    './assets/imgs/plegado-img.avif',
    './assets/imgs/DSC00933.jpg',
    './assets/imgs/plegado-modal-img.avif',
    './assets/imgs/plegado-modal-img2.avif',
    './assets/imgs/DSC01023.jpg'
  ]
  );
  }
});
