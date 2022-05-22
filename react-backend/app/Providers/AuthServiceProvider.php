<?php

namespace App\Providers;

use App\Models\Evento;
use App\Models\Mapa;
use App\Models\Marcador;
use App\Models\Notificacion;
use App\Policies\EventoPolicy;
use App\Policies\MapaPolicy;
use App\Policies\MarcadorPolicy;
use App\Policies\NotificacionPolicy;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

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

        //
    }
}
