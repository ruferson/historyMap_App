<?php

namespace App\Policies;

use App\Models\Notificacion;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class NotificacionPolicy
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
     * @param  \App\Models\Notificacion  $notificacion
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Notificacion $notificacion)
    {
        return $notificacion->idUsu == $user->id;
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
     * @param  \App\Models\Notificacion  $notificacion
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Notificacion $notificacion)
    {
        return true;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Notificacion  $notificacion
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Notificacion $notificacion)
    {
        return true;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Notificacion  $notificacion
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Notificacion $notificacion)
    {
        return true;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Notificacion  $notificacion
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Notificacion $notificacion)
    {
        return true;
    }
}
