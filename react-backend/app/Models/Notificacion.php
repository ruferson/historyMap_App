<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notificacion extends Model
{
    use HasFactory;

    protected $table = 'notificaciones';

    protected $fillable = [
        'type',
        'description',
        'url',
        'idUsu',
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'id');
    }
}
