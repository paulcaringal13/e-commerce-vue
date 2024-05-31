<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/{id}', [UserController::class, 'index']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::post('/products/add', [ProductController::class, 'store']);
    Route::put('/products/{id}/update', [ProductController::class, 'update']);
    Route::put('/user/{id}/update', [UserController::class, 'update']);
    Route::put('/user/{id}/change-password', [UserController::class, 'changePassword']);
    Route::delete('/products/{id}/delete', [ProductController::class, 'destroy']);
});