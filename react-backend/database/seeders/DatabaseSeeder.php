<?php

namespace Database\Seeders;

use App\Models\Evento;
use App\Models\Mapa;
use App\Models\Marcador;
use App\Models\Notificacion;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name = "HMAPI admin";
        $user->email = "lordfadesta@gmail.com";
        $user->email_verified_at = now();
        $user->password = bcrypt('password');
        $user->remember_token = "HMAPI admin";
        $user->rol = "administrador";
        $user->save();

        User::factory(20)->create();
        Mapa::factory(10)->create();
        Marcador::factory(10)->create();
        Evento::factory(10)->create();
        Notificacion::factory(10)->create();
    }
}
