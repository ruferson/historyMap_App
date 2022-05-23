<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marcador extends Model
{
    use HasFactory;

    protected $fillable = [
        'x',
        'y',
        'tipo',
        'mapa_id'
    ];

    protected $table = "marcadores";

    public function mapaEnlazado()
    {
        return $this->belongsTo(Mapa::class, 'mapa_id');
    }

    public function evento()
    {
        return $this->hasOne(Evento::class, 'marcador_id');
    }
}
