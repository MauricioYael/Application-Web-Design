function crearPedido(datos) {
  const pedidos = getPedidos();
  const nuevoPedido = {
    id: Date.now(),                    // ID único basado en timestamp
    factura: getSiguienteFactura(),    // Número consecutivo automático
    numeroCliente: datos.numeroCliente,
    nombreCliente: datos.nombreCliente,
    rfc: datos.rfc,
    razonSocial: datos.razonSocial,
    usoCFDI: datos.usoCFDI,
    direccionFiscal: datos.direccionFiscal,
    direccionEntrega: datos.direccionEntrega,
    notas: datos.notas || '',
    estado: 'Ordenado',                // Estado inicial siempre
    fecha: new Date().toISOString(),   // Fecha y hora actual
    fotoUnidadCargada: null,           // Foto de unidad (rol Ruta)
    fotoEntrega: null,                 // Foto de entrega (rol Ruta)
    eliminado: false,                  // Eliminación lógica
    historial: [
      {
        estado: 'Ordenado',
        fecha: new Date().toISOString(),
        usuario: getSesion()?.nombre || 'Sistema'
      }
    ]
  };
  pedidos.push(nuevoPedido);
  savePedidos(pedidos);
  return nuevoPedido;
}

// Actualiza un pedido existente por su ID
function actualizarPedido(id, cambios) {
  const pedidos = getPedidos();
  const index = pedidos.findIndex(p => p.id === id);
  if (index === -1) return null;

  // Si cambia el estado, lo registramos en el historial
  if (cambios.estado && cambios.estado !== pedidos[index].estado) {
    if (!pedidos[index].historial) pedidos[index].historial = [];
    pedidos[index].historial.push({
      estado: cambios.estado,
      fecha: new Date().toISOString(),
      usuario: getSesion()?.nombre || 'Sistema'
    });
  }

  pedidos[index] = { ...pedidos[index], ...cambios };
  savePedidos(pedidos);
  return pedidos[index];
}

// Eliminación lógica: no borra, solo marca como eliminado
function eliminarPedido(id) {
  return actualizarPedido(id, { eliminado: true });
}

// Restaura un pedido eliminado
function restaurarPedido(id) {
  return actualizarPedido(id, { eliminado: false });
}