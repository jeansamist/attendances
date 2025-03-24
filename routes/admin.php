<?php

use App\Http\Controllers\Admin\TeacherController;
use Illuminate\Support\Facades\Route;

// Use only the 'auth' middleware for now
Route::middleware(['auth'])->group(function () {
    Route::resource('teachers', TeacherController::class);
    Route::put('teachers/{teacher}/toggle-status', [TeacherController::class, 'toggleStatus'])->name('teachers.toggle-status');
});
