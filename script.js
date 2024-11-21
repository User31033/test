// 1. Variables globales y selección de elementos
const darkModeToggle = document.querySelector('#dark-mode-toggle');
const body = document.body;
const menuItems = document.querySelectorAll('.sidebar .menu ul li');
const rangeInput = document.querySelector('input[type="range"]');
const progressBar = document.querySelector('.progress-bar');
const volumeLevel = document.querySelector('.volume-level');
const loader = document.querySelector('.loader-container');
const form = document.querySelector('.form');
const formInputs = document.querySelectorAll('.form input');
const submitButton = document.querySelector('.submit-button');

// 2. Función para manejar el modo oscuro
function toggleDarkMode() {
  body.classList.toggle('dark-mode');
  localStorage.setItem('dark-mode', body.classList.contains('dark-mode'));
}

// 3. Función para aplicar el modo oscuro desde el almacenamiento local
function applyDarkModeFromStorage() {
  if (localStorage.getItem('dark-mode') === 'true') {
    body.classList.add('dark-mode');
  }
}

// 4. Función para manejar la carga de progreso
function updateProgressBar() {
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
    } else {
      width += 1;
      progressBar.style.width = width + '%';
    }
  }, 100);
}

// 5. Validación de formulario
function validateForm() {
  formInputs.forEach(input => {
    if (input.value.trim() === '') {
      input.classList.add('error');
      input.nextElementSibling.textContent = 'Este campo es obligatorio';
    } else {
      input.classList.remove('error');
      input.nextElementSibling.textContent = '';
    }
  });
}

// 6. Interacción con los elementos del menú
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    menuItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// 7. Manejador de eventos para el control de volumen
rangeInput.addEventListener('input', () => {
  const volume = rangeInput.value;
  volumeLevel.textContent = `Volumen: ${volume}%`;
  rangeInput.style.background = `linear-gradient(to right, #4facfe ${volume}%, #ccc ${volume}%)`;
});

// 8. Mostrar/ocultar el loader
function toggleLoader(isVisible) {
  if (isVisible) {
    loader.style.display = 'flex';
  } else {
    loader.style.display = 'none';
  }
}

// 9. Animación de carga
function showLoading() {
  toggleLoader(true);
  setTimeout(() => {
    toggleLoader(false);
    alert('Carga completa');
  }, 3000);
}

// 10. Aplicación del modo oscuro en el switch
darkModeToggle.addEventListener('change', toggleDarkMode);

// 11. Animación de transición en el fondo de la barra lateral
menuItems.forEach(item => {
  item.addEventListener('mouseover', () => {
    item.style.transition = 'all 0.3s ease';
    item.style.backgroundColor = '#d1d9e6';
  });
  item.addEventListener('mouseout', () => {
    item.style.backgroundColor = '';
  });
});

// 12. Establecer una animación en las tarjetas
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'scale(1.05)';
    card.style.transition = 'transform 0.3s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'scale(1)';
  });
});

// 13. Manejadores para los botones de control
document.querySelectorAll('.control-button').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
    setTimeout(() => button.classList.remove('active'), 300);
  });
});

// 14. Implementación del cambio de tema desde la interfaz
applyDarkModeFromStorage();

// 15. Manejo de eventos para el formulario
form.addEventListener('submit', event => {
  event.preventDefault();
  validateForm();
  const isFormValid = [...formInputs].every(input => input.value.trim() !== '');
  if (isFormValid) {
    form.reset();
    alert('Formulario enviado con éxito');
  }
});

// 16. Cambiar el color de los botones de control cuando se hace clic
document.querySelectorAll('.footer-player .control-button').forEach(button => {
  button.addEventListener('click', () => {
    button.style.backgroundColor = '#4facfe';
    button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  });
});

// 17. Efecto para el slider de volumen
rangeInput.addEventListener('mouseover', () => {
  rangeInput.style.background = '#f0f0f0';
});

// 18. Función para manejar el progreso de la música
function handleMusicProgress() {
  const musicProgress = document.querySelector('.music-progress');
  let width = 0;
  const musicInterval = setInterval(() => {
    if (width >= 100) {
      clearInterval(musicInterval);
    } else {
      width += 0.5;
      musicProgress.style.width = width + '%';
    }
  }, 100);
}

// 19. Mostrar y ocultar una sección del menú al hacer clic
document.querySelector('.sidebar .toggle-button').addEventListener('click', () => {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('collapsed');
});

// 20. Implementación de efectos al hacer clic en las tarjetas de contenido
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    alert(`Has seleccionado la tarjeta: ${card.querySelector('h3').textContent}`);
  });
});

// 21. Control de visibilidad de un modal
const openModalButton = document.querySelector('.open-modal');
const closeModalButton = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');

openModalButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

// 22. Función para animar el scroll al hacer clic en un enlace
document.querySelectorAll('a.scroll-to').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth'
    });
  });
});

// 23. Cambiar el color de los enlaces al hacer hover
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('mouseover', () => {
    link.style.color = '#4facfe';
  });
  link.addEventListener('mouseout', () => {
    link.style.color = '';
  });
});

// 24. Generar un efecto de fade-in al cargar una sección
document.querySelectorAll('.fade-in').forEach(element => {
  element.classList.add('fade');
  setTimeout(() => element.classList.remove('fade'), 1000);
});

// 25. Actualizar el contador de la página
let count = 0;
document.querySelector('.count-button').addEventListener('click', () => {
  count++;
  document.querySelector('.count-display').textContent = `Contador: ${count}`;
});

// 26. Establecer la animación de los íconos del menú
document.querySelectorAll('.sidebar .menu ul li i').forEach(icon => {
  icon.addEventListener('click', () => {
    icon.classList.add('rotate');
    setTimeout(() => icon.classList.remove('rotate'), 300);
  });
});

// 27. Realizar la validación y actualización de datos
function updateData() {
  const dataInputs = document.querySelectorAll('.data-input');
  dataInputs.forEach(input => {
    if (input.value.trim() === '') {
      input.classList.add('invalid');
    } else {
      input.classList.remove('invalid');
    }
  });
}

// 28. Realizar una animación al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
  console.log('La ventana ha cambiado de tamaño');
});

// 29. Realizar scroll animado para el header
document.querySelector('.header').addEventListener('mouseover', () => {
  document.querySelector('.header').style.transform = 'translateY(10px)';
});
