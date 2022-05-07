<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
            'remember_token' => Str::random(10),
            'rol' => $this->randomRol(),
        ];
    }

    function randomRol()
    {
        $eleccion = random_int(1,30);

        $rolNumero = 3;

        if ($eleccion==1) {
            $rolNumero = 1;
        }else if ($eleccion <=6) {
            $rolNumero = 2;
        }
        switch ($rolNumero) {
            case 1:
                $rol = "administrador";
                break;
            case 2:
                $rol = "profesor";
                break;
            case 3:
                $rol = "alumno";
                break;

        }
        return $rol;
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}
