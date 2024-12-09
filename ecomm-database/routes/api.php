<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
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

//Login
Route::post('/login', [UserController::class, 'login']);

//FrontStore
Route::get('/products/{id}', [ProductCRUD::class, 'show']);

//Cart Funtionality
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CartController::class, 'getCart']); 
    Route::post('/cart', [CartController::class, 'addToCart']);      
    Route::put('/cart', [CartController::class, 'updateCart']);      
    Route::delete('/cart/{id}', [CartController::class, 'removeFromCart']); 
    Route::delete('/cart', [CartController::class, 'clearCart']);    
});

//Checkout
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/checkout', [OrderController::class, 'submitOrder']); 
});

// Admin Dashboard
Route::get('/products', [ProductCRUD::class, 'index']);
Route::post('/products', [ProductCRUD::class, 'store']);
Route::put('/products/{id}', [ProductCRUD::class, 'update']);
Route::delete('/products/{id}', [ProductCRUD::class, 'destroy']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
