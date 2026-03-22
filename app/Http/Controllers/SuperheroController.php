<?php

namespace App\Http\Controllers;

use App\Models\Superhero;
use Illuminate\Http\Request;

class SuperheroController extends Controller
{
    public function index()
    {
        $superheroes = Superhero::all();
        return view('superheroes.index', compact('superheroes'));
    }

    public function create()
    {
        return view('superheroes.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre_real' => 'required',
            'nombre_heroe' => 'required',
            'foto_url' => 'required|url',
            'informacion' => 'required',
        ]);

        Superhero::create($request->all());

        return redirect()->route('superheroes.index')
                         ->with('success', 'Superhéroe creado exitosamente.');
    }

    public function show(Superhero $superhero)
    {
        return view('superheroes.show', compact('superhero'));
    }

    public function edit(Superhero $superhero)
    {
        return view('superheroes.edit', compact('superhero'));
    }

    public function update(Request $request, Superhero $superhero)
    {
        $request->validate([
            'nombre_real' => 'required',
            'nombre_heroe' => 'required',
            'foto_url' => 'required|url',
            'informacion' => 'required',
        ]);

        $superhero->update($request->all());

        return redirect()->route('superheroes.index')
                         ->with('success', 'Superhéroe actualizado exitosamente.');
    }

    public function destroy(Superhero $superhero)
    {
        $superhero->delete();

        return redirect()->route('superheroes.index')
                         ->with('success', 'Superhéroe eliminado exitosamente.');
    }
}
