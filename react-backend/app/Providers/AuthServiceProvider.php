<?php

namespace App\Providers;

use App\Models\Evento;
use App\Models\Mapa;
use App\Models\Marcador;
use App\Models\User;
use App\Policies\EventoPolicy;
use App\Policies\MapaPolicy;
use App\Policies\MarcadorPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        Evento::class => EventoPolicy::class,
        Marcador::class => MarcadorPolicy::class,
        Mapa::class => MapaPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('getRecordsApi-RecordsApi', function (User $user) {
            return $user->isAdministrator();
        });

        Gate::define('userDetail-UserController', function (User $user, $email) {
            return $user->isOwner($email);
        });
    }
}
