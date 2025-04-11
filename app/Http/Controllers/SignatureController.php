<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Signature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SignatureController extends Controller
{
    // In Laravel 12, middleware should be applied in the routes file
    // instead of in the controller constructor

    public function index()
    {
        $signatures = Auth::user()->signatures()
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Signatures/Index', [
            'signatures' => $signatures,
            'canValidate' => false // Teachers cannot validate signatures
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => ['required', 'in:entry,exit'],
        ]);

        $signature = Auth::user()->signatures()->create([
            'type' => $request->type,
            'validated' => false,
        ]);

        return redirect()->back()->with('success', 'Signature created successfully.');
    }
}