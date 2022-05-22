<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\MapaResource;
use App\Http\Resources\MarcadorResource;
use App\Models\Mapa;
use App\Models\Marcador;
use Exception;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class MarcadorController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Marcador::class, 'marcador');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return MarcadorResource::collection(Marcador::paginate());
    }

    public function indexMapa(Mapa $mapa) // Necesita proteccion con policies
    {
        $marcadoresMapa = $mapa->marcadores();
        return MarcadorResource::collection($marcadoresMapa->paginate());
        //$marcadoresMapa = MarcadorResource::collection(Marcador::where('mapa_id', '=', $mapaId)->paginate());
        //return $marcadoresMapa;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $usuario = Auth::user();

        $marcador = json_decode($request->getContent(), true);
        $marcador = new Marcador($marcador);

        $permiso = false;
        $mapas = $usuario->mapasCreados;
        foreach ($mapas as $mapa) {
            if($mapa->id == $marcador->mapa_id){
                $permiso = true;
            }
        }
        $mapas = $usuario->mapasVisualizados;
        foreach ($mapas as $mapa) {
            if($mapa->id == $marcador->mapa_id){
                $permiso = true;
            }
        }
        if ($permiso) {
            $marcador->save();
            return new MarcadorResource($marcador);
        }else{
            return new response('Forbidden',403);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Marcador  $marcador
     * @return \Illuminate\Http\Response
     */
    public function show(Marcador $marcador)
    {
        return new MarcadorResource($marcador);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Marcador  $marcador
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Marcador $marcador)
    {
        $contenido = $request->getContent();
        $mapaIdLocation = strpos($contenido, 'mapa_id');
        $finalLocation = strpos($contenido, '}', $mapaIdLocation);
        //throw new Exception($contenido);
        $marcadorData = json_decode($contenido, true);
        $marcador->update($marcadorData);

        return new MarcadorResource($marcador);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Marcador  $marcador
     * @return \Illuminate\Http\Response
     */
    public function destroy(Marcador $marcador)
    {
        $marcador->delete();
    }
}
