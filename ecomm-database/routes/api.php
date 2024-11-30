<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductCRUD;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//User Registration
Route::post('/register', [UserController::class, 'register']);
Route::get('/users', [UserController::class, 'index']);

// Admin Dashboard
Route::get('/products', [ProductCRUD::class, 'index']);
Route::post('/products', [ProductCRUD::class, 'store']);
Route::put('/products/{id}', [ProductCRUD::class, 'update']);
Route::delete('/products/{id}', [ProductCRUD::class, 'destroy']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
