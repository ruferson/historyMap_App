<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\MarcadorResource;
use App\Models\Marcador;
use Illuminate\Http\Request;

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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $marcador = json_decode($request->getContent(), true);

        $marcador = Marcador::create($marcador);

        return new MarcadorResource($marcador);
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
        $marcadorData = json_decode($request->getContent(), true);
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
