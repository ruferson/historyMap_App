<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'html',
        'marcador_id'
    ];

    public function marcadorEnlazado()
    {
        return $this->belongsTo(Marcador::class, 'marcador_id');
    }
}
