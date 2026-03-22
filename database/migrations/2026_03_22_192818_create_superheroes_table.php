<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSuperheroesTable extends Migration
{
    public function up()
    {
        Schema::create('superheroes', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_real');
            $table->string('nombre_heroe');
            $table->string('foto_url');
            $table->string('informacion');
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('superheroes');
    }
}