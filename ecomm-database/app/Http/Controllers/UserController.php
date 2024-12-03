<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Register a new user
    public function register(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|unique:users,username|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'password' => 'required|string|min:8',
        ]);
    
        $validated['password'] = Hash::make($validated['password']);
        $validated['role'] = 'user'; 
    
        User::create($validated);
    
        return response()->json(['message' => 'Registration successful'], 201);
    }

    //Login a Registered User
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        $user = User::where('email', $request->email)->first();
    
        if ($user && Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Login successful',
                'role' => $user->role, 
            ], 200);
        }
    
        return response()->json(['message' => 'Invalid email or password'], 401);
    }


    // Fetch all users
    public function index()
    {
        return response()->json(User::all());
    }
}
