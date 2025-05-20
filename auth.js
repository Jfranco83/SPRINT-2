// auth.js - Lógica de registro e inicio de sesión simulados
// usando localStorage para almacenar los datos


// Referencia al contenedor de mensajes
const messageDiv = document.getElementById('message');

/**
 * Mostrar mensaje al usuario
 * @param {string} msg - El mensaje a mostrar
 * @param {string} type - Tipo: 'success' o 'error'
 */
function showMessage(msg, type = 'success') {
  messageDiv.textContent = msg;
  messageDiv.style.color = type === 'success' ? 'green' : 'red';
}

/**
 * REGISTRO DE USUARIO
 * Escucha el evento 'submit' del formulario de registro
 */
document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Evita que se recargue la página al enviar

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Validación básica
  if (password.length < 6) {
    showMessage('La contraseña debe tener al menos 6 caracteres.', 'error');
    return;
  }

  // Verifica si el correo ya está registrado
  if (localStorage.getItem(email)) {
    showMessage('Este correo ya está registrado.', 'error');
    return;
  }

  // Guarda los datos en localStorage (se puede encriptar en proyectos reales)
  localStorage.setItem(email, JSON.stringify({ password }));

  showMessage('Usuario registrado exitosamente.');
});

/**
 * INICIO DE SESIÓN
 * Escucha el evento 'submit' del formulario de login
 */
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  // Verifica si el usuario existe
  const userData = localStorage.getItem(email);

  if (!userData) {
    showMessage('Usuario no encontrado.', 'error');
    return;
  }

  const user = JSON.parse(userData);

  // Verifica si la contraseña es correcta
  if (user.password !== password) {
    showMessage('Contraseña incorrecta.', 'error');
    return;
  }

  showMessage('Inicio de sesión exitoso.');
  
  // Aquí se redirige a la tienda  home:
 window.location.href = 'index.html';
});
