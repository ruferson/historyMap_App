<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class UserController extends Controller
{
    private $status_code = 200;

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Mapa  $mapa
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $userData = json_decode($request->getContent(), true);
        $user->update($userData);

        return new UserResource($user);
    }
    public function userSignUp(Request $request) {
        $validator = Validator::make($request->all(), [
            "name" => "required",
            "email" => "required|email",
            "password" => "required",
        ]);

        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "validation_error", "errors" => $validator->errors()]);
        }

        $userDataArray = array(
            "name" => $request->name,
            "email" => $request->email,
            "password" => md5($request->password),
            "email_verfied_at" => now(),
            "remember_token" => Str::random(10),
        );

        $user_status = User::where("email", $request->email)->first();

        if(!is_null($user_status)) {
           return response()->json(["status" => "failed", "success" => false, "message" => "Ooops! Email ya registrado anteriormente"]);
        }

        $user = User::create($userDataArray);
        $user->email_verified_at = now();
        $user->save();

        if(!is_null($user)) {
            return response()->json(["status" => $this->status_code, "success" => true, "message" => "Registro completado correctamente", "data" => $user]);
        }

        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Fallo al registrar"]);
        }
    }

    // ------------ [ User Login ] -------------------
    public function userLogin(Request $request) {

        $attr = $request->validate([
            'email' => 'required|string|email|',
            'password' => 'required|string|min:6'
        ]);

        if (!Auth::attempt($attr)) {
            return response()->json([
                'message' => 'Invalid login details'
                           ], 401);
        }

        $token = auth()->user()->createToken('auth_token')->plainTextToken;
        $user = auth()->user();

        $respon = [
                'status' => 'success',
                'msg' => 'Login successfully',
                'content' => [
                    'status_code' => 200,
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                    'user_name' => $user->name,
                    'user_email' => $user->email,
                    'user_id' => $user->id,
                ]
            ];

            return response()->json($respon, 200);
    }

    // ------------------ [ User Detail ] ---------------------
    public function userDetail() {

        $user = Auth::user();

        $respon = [
            'user_name' => $user->name,
            'user_email' => $user->email,
            'user_id' => $user->id,
        ];

        return response()->json($respon, 200);
    }
}
