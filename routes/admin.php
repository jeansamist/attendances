<?php

use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Admin\SignatureController;
use Illuminate\Support\Facades\Route;

// Admin routes should be protected by both auth and admin middleware
Route::middleware(['auth', 'admin'])->group(function () {
    // Teacher management
    Route::resource('teachers', TeacherController::class);
    Route::put('teachers/{teacher}/toggle-status', [TeacherController::class, 'toggleStatus'])->name('teachers.toggle-status');
    
    // Attendance management
    Route::get('attendances', [SignatureController::class, 'index'])->name('admin.attendances');
    Route::put('signatures/{signature}/validate', [SignatureController::class, 'validateSignature'])->name('admin.signatures.validate');
    Route::put('signatures/{signature}/invalidate', [SignatureController::class, 'invalidateSignature'])->name('admin.signatures.invalidate');
});
