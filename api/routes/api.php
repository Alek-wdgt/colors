<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ColorController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/colors', [ColorController::class, 'index']);
//Route::post('/colors', [ColorController::class, 'store']); // Corrected route definition
Route::get('/colors/{id}', [ColorController::class, 'show']);
Route::put('/colors/{id}', [ColorController::class, 'update']);
Route::delete('/colors/{id}', [ColorController::class, 'destroy']);

Route::middleware('api')->group(function () {
  Route::post('/colors', [ColorController::class, 'store']);
});