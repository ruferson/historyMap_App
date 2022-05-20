<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mapa extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'link_imagen',
        'usuario_id',
        'privado'
    ];

    public function usuarioCreador()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    public function usuariosVisualizadores()
    {
        return $this->belongsToMany(User::class, 'mapas_guardados');
    }

    public function marcadores()
    {
        return $this->hasMany(Marcador::class, 'mapa_id');
    }

    public function esMapaPrivado()
    {
        return $this->privado;
    }
}
