<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMarcadorIdToEventosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::table('eventos', function (Blueprint $table) {
            $table->foreign('marcador_id', 'eventos_marcador_id_foreign')->references('id')->on('marcadores')->onDelete('cascade');
        });
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::table('eventos', function (Blueprint $table) {
            $table->dropForeign('eventos_marcador_id_foreign');
        });
        Schema::enableForeignKeyConstraints();
    }
}
