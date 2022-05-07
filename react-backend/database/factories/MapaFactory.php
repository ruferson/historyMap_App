<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MapaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nombre' => $this->faker->word(),
            'link_imagen' => 'link de imagen',
            'usuario_id' => $this->faker->numberBetween(1,20),
            'privado' => $this->faker->boolean(80),
        ];
    }
}
