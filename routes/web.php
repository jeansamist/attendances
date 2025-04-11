<?php

use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\SignatureController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::prefix('teachers')->group(function () {
        Route::get('/', [TeacherController::class, 'index'])->name('teachers.index');
        Route::get('/create', [TeacherController::class, 'create'])->name('teachers.create');
        Route::post('/', [TeacherController::class, 'store'])->name('teachers.store');
        Route::get('/{teacher}/edit', [TeacherController::class, 'edit'])->name('teachers.edit');
        Route::put('/{teacher}', [TeacherController::class, 'update'])->name('teachers.update');
        Route::put('/{teacher}/toggle-status', [TeacherController::class, 'toggleStatus'])->name('teachers.toggle-status');
    });

    Route::get('/attendances', [SignatureController::class, 'index'])->name('attendances');
    Route::get('/signatures', [SignatureController::class, 'index'])->name('signatures.index');
    Route::middleware(['teacher'])->group(function () {
        Route::post('/signatures', [SignatureController::class, 'store'])->name('signatures.store');
    });
});
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';