<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Superhéroes</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-4">
    <h1 class="mb-4">Lista de Superhéroes</h1>
    <a href="{{ route('superheroes.create') }}" class="btn btn-primary mb-3">+ Nuevo Superhéroe</a>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Nombre Real</th>
                <th>Nombre de Héroe</th>
                <th>Foto</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            @foreach($superheroes as $superhero)
            <tr>
                <td>{{ $superhero->nombre_real }}</td>
                <td>{{ $superhero->nombre_heroe }}</td>
                <td><img src="{{ $superhero->foto_url }}" width="60" height="60" style="object-fit:cover; border-radius:50%"></td>
                <td>
                    <a href="{{ route('superheroes.show', $superhero->id) }}" class="btn btn-info btn-sm">Ver</a>
                    <a href="{{ route('superheroes.edit', $superhero->id) }}" class="btn btn-warning btn-sm">Editar</a>
                    <form action="{{ route('superheroes.destroy', $superhero->id) }}" method="POST" style="display:inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('¿Eliminar superhéroe?')">Eliminar</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
</body>
</html>