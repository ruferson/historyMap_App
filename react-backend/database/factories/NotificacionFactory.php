<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class NotificacionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'type' => $this->faker->word(),
            'description' => $this->faker->text(254),
            'url' => $this->faker->url(),
            'idUsu' => $this->faker->randomDigit(),
        ];
    }
}
