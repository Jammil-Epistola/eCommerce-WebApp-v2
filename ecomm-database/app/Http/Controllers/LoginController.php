<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(Request $request)
{
    $validatedData = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $validatedData['email'])->first();

    if (!$user || !Hash::check($validatedData['password'], $user->password)) {
        return response()->json(['message' => 'Invalid email or password'], 401);
    }

    // Return role and any other necessary data
    return response()->json([
        'message' => 'Login successful',
        'role' => $user->is_admin ? 'admin' : 'user', // Assuming `is_admin` field exists
    ]);
}

}
