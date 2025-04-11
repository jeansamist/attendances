<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Signature;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SignatureController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('admin');
    }

    public function index()
    {
        // Get users who are teachers with their signatures
        $teachers = User::where('role', 'teacher')
            ->with(['signatures' => function ($query) {
                $query->orderBy('created_at', 'desc');
            }])
            ->get();

        $teachersData = $teachers->map(function ($teacher) {
            return [
                'id' => $teacher->id,
                'name' => $teacher->name,
                'email' => $teacher->email,
                'phone' => $teacher->phone,
                'subject' => $teacher->subject,
                'status' => $teacher->status,
                'signatures' => $teacher->signatures->map(function ($signature) {
                    return [
                        'id' => $signature->id,
                        'type' => $signature->type,
                        'created_at' => $signature->created_at,
                        'validated' => $signature->validated
                    ];
                })
            ];
        });

        return Inertia::render('Admin/Attendances/Index', [
            'teachers' => $teachersData,
            'canValidate' => true // Admins can validate signatures
        ]);
    }

    public function validateSignature(Signature $signature)
    {
        $signature->update(['validated' => true]);
        return redirect()->back()->with('success', 'Signature validated successfully.');
    }
    
    public function invalidateSignature(Signature $signature)
    {
        $signature->update(['validated' => false]);
        return redirect()->back()->with('success', 'Signature invalidated successfully.');
    }
}
