<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificacionResource;
use App\Models\Notificacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificacionController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Notificacion::class, 'notificacion');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $usuario = Auth::user();
        $usuarioNotificaciones = $usuario->usuario;
        return NotificacionResource::collection($usuarioNotificaciones);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $notificacion = json_decode($request->getContent(), true);

        $notificacion = Notificacion::create($notificacion);

        return new NotificacionResource($notificacion);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Notificacion  $notificacion
     * @return \Illuminate\Http\Response
     */
    public function show(Notificacion $notificacion)
    {
        return new NotificacionResource($notificacion);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Notificacion  $notificacion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Notificacion $notificacion)
    {
        $notificacionData = json_decode($request->getContent(), true);
        $notificacion->update($notificacionData);

        return new NotificacionResource($notificacion);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Notificacion  $notificacion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Notificacion $notificacion)
    {
        $notificacion->delete();
    }
}
