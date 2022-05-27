<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\MapaResource;
use App\Models\Mapa;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class MapaGuardadoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $usuario = Auth::user();
        $mapasGuardado = $usuario->mapasVisualizados;

        return MapaResource::collection($mapasGuardado);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $content = $request->getContent();
        
        $mapaIdLoc = strpos($content, 'mapa_id=') + 8;
        $mapaIdFinLoc = strpos($content, '&', $mapaIdLoc);
        $mapaId = substr($content, $mapaIdLoc, ($mapaIdFinLoc == - 1)? strlen($content) - $mapaIdLoc : $mapaIdFinLoc - $mapaIdLoc);

        if (!Gate::allows('store-mapa-guardado', $user, $mapaId)) {
            abort(403);
        }

        $aceptado = substr($content, strpos($content, 'aceptado=') + 9, 1);
        $ahora = new DateTime();

        DB::insert('insert into mapas_guardados (user_id, mapa_id, aceptado, created_at, updated_at) values (?, ?, ?, ?, ?)', [$user->id, $mapaId, $aceptado, $ahora->format('Y-m-d H:i:s'), $ahora->format('Y-m-d H:i:s')]);
        $maxId = DB::select('select MAX(id) as max from mapas_guardados');
        return DB::select('select * from mapas_guardados where id = ' . $maxId[0]->max);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = Auth::user();
        if (!Gate::allows('show-mapa-guardado', $user, $id)) {
            abort(403);
        }
        return DB::select('select * from mapas_guardados where id = ' . $id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $datos = array();
        $query = 'update mapas_guardados';
        $content = $request->getContent();
        $definiciones = substr_count($content, '=');
        $inicio = 0;
        $final = 0;
        for ($i=1; $i <= $definiciones; $i++) {
            $final = strpos($content, '=', $inicio) + 1;
            $datos[substr($content, $inicio, $final - $inicio - 1 )] = substr($content, $final, (($definiciones-$i == 0)? strlen($content) - $final: strpos($content, '&', $final) - $final) );
            $inicio = strpos($content, '&', $final) + 1;
        }
        $query = $query . ' set ';
        foreach ($datos as $key => $value) {
            switch ($key) {
                case 'mapa_id':
                    $query = $query . $key . ' = ' . $value . ', ';
                    break;
                case 'aceptado':
                    $query = $query . $key . ' = ' . $value . ', ';
                    break;
                case 'user_id':
                    if ($user->email == getenv('ADMIN_EMAIL')) {
                        $query = $query . $key . ' = ' . $value . ', ';
                    }
                    break;
            }
        }

        $ahora = new DateTime();
        $query = $query . 'updated_at' . ' = \'' . $ahora->format('Y-m-d H:i:s') . '\', ';

        $query = substr($query, 0, strlen($query) - 2) . ' where id = ' . $user->id;
        DB::update($query);
        return DB::select('select * from mapas_guardados where id = ' . $user->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = Auth::user();
        if (!Gate::allows('delete-mapa-guardado', $user, $id)) {
            abort(403);
        }
        $resultado = DB::delete('delete from mapas_guardados where id = ' . $id);
        if ($resultado) {
            $respuesta = "El mapa guardado con id " . $id . " ha sido eliminado correctamente";
        }else{
            $respuesta = "Ha habido un fallo al borrar el mapa guardado con id " . $id;
        }
        return $respuesta;
    }
}
