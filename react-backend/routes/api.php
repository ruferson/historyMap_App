<?php

use App\Http\Controllers\API\EventoController;
use App\Http\Controllers\API\MarcadorController;
use App\Http\Controllers\API\MapaController;
use App\Http\Controllers\API\MapaGuardadoController;
use App\Http\Controllers\API\NotificacionController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

    Route::post('/tokens/create', function (Request $request) {

        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        return response()->json([
            'token_type' => 'Bearer',
            'access_token' => $user->createToken('token_name')->plainTextToken // token name you can choose for your self or leave blank if you like to
        ]);
    });

    Route::post("register", [UserController::class, "userSignUp"]);
    Route::put("update", [UserController::class, "update"]);

    //Route::middleware('auth:sanctum')->
        Route::group(['middleware' => 'auth:sanctum'],function () {
            Route::group(['prefix' => '/'], function () {
                Route::get("/mapas/publicos", [MapaController::class, "indexPublicos"]);
                Route::get("/marcadores-mapa/{mapa}", [MarcadorController::class, 'indexMapa']);
                Route::get("/eventos-marcador/{marcadorId}", [EventoController::class, 'showFromMarcadorId']);
                Route::get("/users", [UserController::class, 'index']);
                Route::post("/user/{user}", [UserController::class, 'update']);

                Route::apiResource("/eventos", EventoController::class);
                Route::apiResource("/marcadores", MarcadorController::class)->parameters(['marcadores' => 'marcador']);
                Route::apiResource("/mapas", MapaController::class);
                Route::apiResource("/notificaciones", NotificacionController::class)->parameters(['notificaciones' => 'notificacion']);
                Route::apiResource("/mapas-guardados", MapaGuardadoController::class);

                Route::get("/user", [UserController::class, "userDetail"]);

            });
        });



