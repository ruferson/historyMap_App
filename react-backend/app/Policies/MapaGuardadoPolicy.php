<?php

namespace App\Policies;

use App\Models\Mapa;
use App\Models\User;
use Exception;
use Illuminate\Auth\Access\HandlesAuthorization;

class MapaGuardadoPolicy
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
        throw new Exception("asd");
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
     * @param  \App\Models\Mapa  $mapa
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Mapa $mapa)
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return false;
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
        return false;
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
        return false;
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
