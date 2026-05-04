document.addEventListener('DOMContentLoaded', function () {

  // 1. Verificar que haya sesión activa
  requiereLogin();

  // 2. Mostrar nombre del usuario en la navbar
  const sesion = getSesion();
  document.getElementById('nombre-usuario').textContent =
    `👤 ${sesion.nombre} (${sesion.rol})`;

  // 3. Mostrar u ocultar botones según el rol
  if (!tieneRol('admin', 'ventas')) {
    document.getElementById('btn-nuevo').classList.add('hidden');
  }
  if (!tieneRol('admin')) {
    document.getElementById('btn-usuarios').classList.add('hidden');
  }

  // 4. Cargar la tabla de pedidos
  renderTabla();

  const mensaje = sessionStorage.getItem('mensaje');
if (mensaje) {
  const el = document.getElementById('mensaje-exito');
  el.textContent = mensaje;
  el.classList.remove('hidden');
  sessionStorage.removeItem('mensaje');
  setTimeout(() => el.classList.add('hidden'), 4000);
}

});

// Renderiza la tabla con todos los pedidos activos (no eliminados)
function renderTabla(pedidosFiltrados) {
  const tbody = document.getElementById('cuerpo-tabla');
  const sinPedidos = document.getElementById('sin-pedidos');
  const tabla = document.getElementById('tabla-pedidos');

  // Si no se pasan pedidos filtrados, cargamos todos los activos
  const todos = pedidosFiltrados !== undefined
    ? pedidosFiltrados
    : getPedidos().filter(p => !p.eliminado);

  tbody.innerHTML = '';

  if (todos.length === 0) {
    sinPedidos.classList.remove('hidden');
    tabla.style.display = 'none';
    return;
  }

  sinPedidos.classList.add('hidden');
  tabla.style.display = 'table';

  // Ordenamos del más reciente al más antiguo
  const ordenados = [...todos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  ordenados.forEach(pedido => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>#${pedido.factura}</strong></td>
      <td>${pedido.nombreCliente}</td>
      <td>${pedido.numeroCliente}</td>
      <td>${formatearFecha(pedido.fecha)}</td>
      <td><span class="badge ${getBadgeClase(pedido.estado)}">${pedido.estado}</span></td>
      <td>
        <button onclick="verPedido(${pedido.id})"
          style="width:auto; padding:6px 14px; font-size:0.85rem;">
          Ver / Editar
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Filtra los pedidos según los valores de los inputs
function filtrarPedidos() {
  const factura = document.getElementById('filtro-factura').value.trim().toLowerCase();
  const cliente = document.getElementById('filtro-cliente').value.trim().toLowerCase();
  const fecha   = document.getElementById('filtro-fecha').value;
  const estado  = document.getElementById('filtro-estado').value;

  let pedidos = getPedidos().filter(p => !p.eliminado);

  if (factura) {
    pedidos = pedidos.filter(p => String(p.factura).includes(factura));
  }
  if (cliente) {
    pedidos = pedidos.filter(p =>
      p.numeroCliente.toLowerCase().includes(cliente)
    );
  }
  if (fecha) {
    pedidos = pedidos.filter(p => p.fecha.startsWith(fecha));
  }
  if (estado) {
    pedidos = pedidos.filter(p => p.estado === estado);
  }

  renderTabla(pedidos);
}

// Limpia todos los filtros y recarga la tabla
function limpiarFiltros() {
  document.getElementById('filtro-factura').value = '';
  document.getElementById('filtro-cliente').value = '';
  document.getElementById('filtro-fecha').value   = '';
  document.getElementById('filtro-estado').value  = '';
  renderTabla();
}

// Redirige al detalle del pedido
function verPedido(id) {
  window.location.href = `pedido-detalle.html?id=${id}`;
}

// Convierte fecha ISO a formato legible
function formatearFecha(fechaISO) {
  const d = new Date(fechaISO);
  return d.toLocaleDateString('es-MX', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

// Devuelve la clase CSS del badge según el estado
function getBadgeClase(estado) {
  const clases = {
    'Ordenado':   'badge-ordenado',
    'En proceso': 'badge-proceso',
    'En ruta':    'badge-ruta',
    'Entregado':  'badge-entregado'
  };
  return clases[estado] || '';
}