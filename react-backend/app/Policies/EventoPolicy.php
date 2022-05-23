<?php

namespace App\Policies;

use App\Models\Evento;
use App\Models\User;
use Exception;
use Illuminate\Auth\Access\HandlesAuthorization;

class EventoPolicy
{
    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     *
     * @param  \App\Models\User  $user
     * @param  string  $ability
     * @return void|bool
     */
    public function before(User $user, $ability)
    {
        if ($user->esAdministrador()) {
            return true;
        }
    }

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Evento  $evento
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Evento $evento)
    {
        $marcadorEnlazado = $evento->marcadorEnlazado;
        $mapaOrigen = $marcadorEnlazado->mapaEnlazado;
        $usuarioCreador = $mapaOrigen->usuarioCreador;
        $usuariosVisualizadores = $mapaOrigen->usuariosVisualizadores;
        $permiso = false;
        if ($mapaOrigen->esMapaPrivado == 0) {
            $permiso = true;
        }else if ($usuarioCreador->id == $user->id) {
            $permiso = true;
        }else{
            foreach ($usuariosVisualizadores as $usuario) {
                if ($usuario->id == $user->id) {
                    $permiso = true;
                }
            }
        }

        return $permiso;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Evento  $evento
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Evento $evento)
    {
        $marcadorEnlazado = $evento->marcadorEnlazado;
        $mapaOrigen = $marcadorEnlazado->mapaEnlazado;
        $usuarioCreador = $mapaOrigen->usuarioCreador;
        return $user->id == $usuarioCreador->id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Evento  $evento
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Evento $evento)
    {
        $marcadorEnlazado = $evento->marcadorEnlazado();
        $mapaOrigen = $marcadorEnlazado->mapaEnlazado();
        $usuarioCreador = $mapaOrigen->usuarioCreador();
        return $user->id == $usuarioCreador->id;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Evento  $evento
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Evento $evento)
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Evento  $evento
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Evento $evento)
    {
        return false;
    }
}
