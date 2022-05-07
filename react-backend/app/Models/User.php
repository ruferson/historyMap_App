<?php

namespace App\Models;

use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'rol'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function isAdministrator()
    {
        return $this->rol == "administrador";
    }

    public function isProfesor()
    {
        return $this->rol == "profesor";
    }

    public function isAlumno()
    {
        return $this->rol == "alumno";
    }

    public function isOwner($email)
    {
        $permiso = $this->isAdministrator();

        if (!$permiso) {
            $permiso = $this->email == $email;
        }

        return $permiso;
    }

    public function mapasCreados()
    {
        return $this->hasMany(Mapa::class, 'usuario_id');
    }

    public function mapasVisualizados()
    {
        return $this->belongsToMany(Mapa::class, 'invitaciones');
    }

    public function notificaciones()
    {
        return $this->hasMany(Notificacion::class, 'idUsu');
    }
}
