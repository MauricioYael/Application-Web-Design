function iniciarSesion() {
  const usuario = document.getElementById('usuario').value.trim();
  const password = document.getElementById('password').value.trim();

  // Buscamos el usuario en la "base de datos"
  const usuarios = getUsuarios();
  const encontrado = usuarios.find(
    u => u.usuario === usuario && u.password === password && u.activo
  );

  if (encontrado) {
    // Guardamos la sesión activa
    sessionStorage.setItem('sesion', JSON.stringify({
      id: encontrado.id,
      nombre: encontrado.nombre,
      rol: encontrado.rol
    }));
    // Redirigimos al dashboard
    window.location.href = 'dashboard/dashboard.html';
  } else {
    // Mostramos mensaje de error
    document.getElementById('error-msg').classList.remove('hidden');
  }
}

// Obtiene el usuario actualmente en sesión
function getSesion() {
  return JSON.parse(sessionStorage.getItem('sesion'));
}

// Verifica si hay sesión activa, si no redirige al login
function requiereLogin() {
  if (!getSesion()) {
    window.location.href = '../login.html';
  }
}

// Cierra la sesión y regresa al login
function cerrarSesion() {
  sessionStorage.removeItem('sesion');
  window.location.href = '../login.html';
}

// Verifica si el usuario tiene uno de los roles permitidos
function tieneRol(...roles) {
  const sesion = getSesion();
  return sesion && roles.includes(sesion.rol);
}

// Permite presionar Enter para hacer login
document.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') iniciarSesion();
});