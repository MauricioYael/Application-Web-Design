<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo Superhéroe</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-4">
    <h1 class="mb-4">Registrar Nuevo Superhéroe</h1>

    <form action="{{ route('superheroes.store') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label class="form-label">Nombre Real</label>
            <input type="text" name="nombre_real" class="form-control" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Nombre de Héroe</label>
            <input type="text" name="nombre_heroe" class="form-control" required>
        </div>
        <div class="mb-3">
            <label class="form-label">URL de la Foto</label>
            <input type="text" name="foto_url" class="form-control" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Información Adicional</label>
            <textarea name="informacion" class="form-control" rows="4" required></textarea>
        </div>
        <a href="{{ route('superheroes.index') }}" class="btn btn-secondary">Cancelar</a>
        <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
</div>
</body>
</html>