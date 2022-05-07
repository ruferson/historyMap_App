<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMapaIdToMarcadoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::table('marcadores', function (Blueprint $table) {
            $table->foreign('mapa_id')->references('id')->on('mapas')->onDelete('cascade');
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
        Schema::table('marcadores', function (Blueprint $table) {
            $table->dropForeign('marcadores_mapa_id_foreign');
        });
        Schema::enableForeignKeyConstraints();    }
}
