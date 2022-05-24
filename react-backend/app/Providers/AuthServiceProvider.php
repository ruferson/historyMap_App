<?php

namespace App\Providers;

use App\Models\Evento;
use App\Models\Mapa;
use App\Models\Marcador;
use App\Models\Notificacion;
use App\Models\User;
use App\Policies\EventoPolicy;
use App\Policies\MapaPolicy;
use App\Policies\MarcadorPolicy;
use App\Policies\NotificacionPolicy;
use Exception;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        Evento::class => EventoPolicy::class,
        Mapa::class => MapaPolicy::class,
        Marcador::class => MarcadorPolicy::class,
        Notificacion::class => NotificacionPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        ResetPassword::createUrlUsing(function ($notifiable, $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });

        Gate::define('show-evento-from-marcador', function (User $user, Marcador $marcador) {
            $mapaOrigen = $marcador->mapaEnlazado;
            $usuarioCreador = $mapaOrigen->usuarioCreador;
            return $user->id === $usuarioCreador->id;
        });


        Gate::define('show-marcadores-from-mapa', function (User $user, Mapa $mapa) {
            $permiso = false;
            $usuarioCreador = $mapa->usuarioCreador;
            $usuariosVisualizadores = $mapa->usuariosVisualizadores;
            if (!$mapa->esMapaPrivado()) {
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
        });

        Gate::define('store-mapa-guardado', function (User $user, Mapa $mapa) {
            $permiso = false;
            if (!$mapa->esMapaPrivado()) {
                $permiso = true;
            }
            return $permiso;
        });

        Gate::define('show-mapa-guardado', function (User $user, Mapa $mapa) {
            $permiso = false;
            $usuariosVisualizadores = $mapa->usuariosVisualizadores;
            foreach ($usuariosVisualizadores as $usuario) {
                if ($usuario->id == $user->id) {
                    $permiso = true;
                }
            }
            return $permiso;
        });
    }
}
