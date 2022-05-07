<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class EventoFactory extends Factory
{

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'titulo' => $this->faker->word(),
            'html' => $this->generaHtml(),
            'marcador_id' => $this->faker->numberBetween(1,10)
        ];
    }

    function generaHtml()
    {
        $faker = $this->faker;
        return ("<h1>" . $faker->word() . "</h1><p><b>" . $faker->text(5) . "</b><i>" . $faker->text(5) . "</i>". $faker->text(30) ."</p>");
    }
}
