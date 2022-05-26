<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class UserController extends Controller
{
    private $status_code = 200;

    public function index()
    {
        return UserResource::collection(User::paginate(DB::select("select max(id) as max from users")[0]->max));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Mapa  $mapa
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $datos = array();
        $query = 'update users';
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
                case 'id':
                    $query = $query . $key . ' = ' . $value . ', ';
                    break;
                case 'name':
                    $query = $query . $key . ' = ' . $value . ', ';
                    break;
                case 'email':
                    if (!$value == getenv('ADMIN_EMAIL')) {
                        $query = $query . $key . ' = ' . $value . ', ';
                    }
                    break;
                case 'password':
                    $query = $query . $key . ' = ' . bcrypt($value) . ', ';
                    break;
            }
        }

        $query = $query . 'updated_at' . ' = \'' . now() . '\', ';
        $query = substr($query, 0, strlen($query) - 2) . ' where id = ' . $user->id;
        DB::update($query);

        return DB::select('select * from users where id = ' . $user->id);
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
        );

        $user_status = User::where("email", $request->email)->first();

        if(!is_null($user_status)) {
           return response()->json(["status" => "failed", "success" => false, "message" => "Ooops! Email ya registrado anteriormente"]);
        }

        $user = User::create($userDataArray);

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
