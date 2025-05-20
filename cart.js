// CARRITO DE COMPRAS - cart.js

// Obtenemos elementos del DOM
const cartButton = document.getElementById('cartButton');
const cartModal = document.getElementById('cartModal');
const cartItemsList = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const clearCartBtn = document.getElementById('clearCartBtn');
const checkoutBtn = document.getElementById('checkoutBtn');

// Obtenemos el carrito desde localStorage o lo iniciamos vacío
let cart = JSON.parse(localStorage.getItem('cart')) || [];

/** Guarda el carrito en localStorage
 */
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Actualiza el número de productos en el ícono del carrito
 */
function updateCartCount() {
  cartCount.textContent = cart.length;
}

/**
 * Muestra los productos dentro del modal del carrito
 */
function renderCart() {
  cartItemsList.innerHTML = ''; // Limpia la lista
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nombre} - $${item.precio.toLocaleString()}
      <button onclick="removeFromCart(${index})">❌</button>
    `;
    cartItemsList.appendChild(li);
    total += item.precio;
  });

  cartTotal.textContent = `Total: $${total.toLocaleString()}`;
  updateCartCount();
  saveCart();
}

/**
 * Elimina un producto del carrito por su índice
 * @param {number} index 
 */
function removeFromCart(index) {
  cart.splice(index, 1); // Elimina 1 elemento en la posición index
  renderCart(); // Vuelve a mostrar el carrito
}

/**
 * Limpia completamente el carrito
 */
clearCartBtn.addEventListener('click', () => {
  cart = [];
  renderCart();
});

/**
 * Simulación de compra
 */
checkoutBtn.addEventListener('click', () => {
  alert('¡Gracias por tu compra!');
  cart = [];
  renderCart();
  cartModal.classList.add('hidden');
});

// Mostrar/Ocultar el modal
cartButton.addEventListener('click', () => {
  cartModal.classList.toggle('hidden');
});

// Hacemos accesible la función globalmente para eliminar
window.removeFromCart = removeFromCart;

// Al cargar la página, renderizamos el carrito actual
renderCart();
