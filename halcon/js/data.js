function initData() {

  // --- USUARIOS ---
  // Si no hay usuarios guardados, creamos el admin por defecto
  if (!localStorage.getItem('usuarios')) {
    const usuarios = [
      {
        id: 1,
        nombre: 'Administrador',
        usuario: 'admin',
        password: 'admin123',
        rol: 'admin',
        activo: true
      }
    ];
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }

  // --- PEDIDOS ---
  // Si no hay pedidos guardados, iniciamos con lista vacía
  if (!localStorage.getItem('pedidos')) {
    localStorage.setItem('pedidos', JSON.stringify([]));
  }

  // --- CONTADOR DE FACTURAS ---
  // El número de factura es consecutivo, empezamos en 1000
  if (!localStorage.getItem('contadorFactura')) {
    localStorage.setItem('contadorFactura', '1000');
  }

}

// --- FUNCIONES DE USUARIOS ---

function getUsuarios() {
  return JSON.parse(localStorage.getItem('usuarios')) || [];
}

function saveUsuarios(usuarios) {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function getUsuarioById(id) {
  return getUsuarios().find(u => u.id === id);
}

// --- FUNCIONES DE PEDIDOS ---

function getPedidos() {
  return JSON.parse(localStorage.getItem('pedidos')) || [];
}

function savePedidos(pedidos) {
  localStorage.setItem('pedidos', JSON.stringify(pedidos));
}

function getPedidoById(id) {
  return getPedidos().find(p => p.id === id);
}

// Genera el siguiente número de factura consecutivo
function getSiguienteFactura() {
  let contador = parseInt(localStorage.getItem('contadorFactura')) || 1000;
  contador++;
  localStorage.setItem('contadorFactura', contador.toString());
  return contador;
}

// Llama a initData al cargar este script
initData();