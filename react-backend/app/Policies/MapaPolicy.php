<?php

namespace App\Policies;

use App\Models\Mapa;
use App\Models\User;
use Exception;
use Illuminate\Auth\Access\HandlesAuthorization;

class MapaPolicy
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
        return true;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Mapa  $mapa
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Mapa $mapa)
    {
        $permiso = false;
        $usuarioCreador = $mapa->usuarioCreador;
        if ($mapa->privado == 0) {
            $permiso = true;
        }else if ($usuarioCreador->id == $user->id) {
            $permiso = true;
        }else {
            $usuarios = $mapa->usuariosVisualizadores;
            if (is_array($usuarios)) {
                foreach ($usuarios as $usuario) {
                    if ($usuario->id == $user->id) {
                        $permiso = true;
                    }
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
     * @param  \App\Models\Mapa  $mapa
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Mapa $mapa)
    {
        $userCreador = $mapa->usuarioCreador;
        return ($user->id == $userCreador->id);
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Mapa  $mapa
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Mapa $mapa)
    {
        $userCreador = $mapa->usuarioCreador;
        return $userCreador->id == $user->id;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Mapa  $mapa
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Mapa $mapa)
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Mapa  $mapa
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Mapa $mapa)
    {
        return false;
    }
}
