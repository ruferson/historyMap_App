<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeyToMapaUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::table('invitaciones', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('mapa_id')->references('id')->on('mapas');
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
        Schema::table('invitaciones', function (Blueprint $table) {
            $table->dropForeign('invitaciones_user_id_foreign');
            $table->dropForeign('invitaciones_mapa_id_foreign');
        });
        Schema::enableForeignKeyConstraints();
    }
}
