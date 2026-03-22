<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ver Superhéroe</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-4">
    <h1 class="mb-4">Detalle del Superhéroe</h1>

    <div class="card" style="max-width: 500px;">
        <div class="card-body text-center">
            <img src="{{ $superhero->foto_url }}" width="150" height="150" style="object-fit:cover; border-radius:50%" class="mb-3">
            <h4>{{ $superhero->nombre_heroe }}</h4>
            <p class="text-muted">{{ $superhero->nombre_real }}</p>
            <hr>
            <p>{{ $superhero->informacion }}</p>
        </div>
    </div>

    <div class="mt-3">
        <a href="{{ route('superheroes.index') }}" class="btn btn-secondary">Volver</a>
        <a href="{{ route('superheroes.edit', $superhero->id) }}" class="btn btn-warning">Editar</a>
        <form action="{{ route('superheroes.destroy', $superhero->id) }}" method="POST" style="display:inline">
            @csrf
            @method('DELETE')
            <button type="submit" class="btn btn-danger" onclick="return confirm('¿Eliminar superhéroe?')">Eliminar</button>
        </form>
    </div>
</div>
</body>
</html>