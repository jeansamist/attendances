<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function index()
    {
        $teachers = Teacher::with('user')->latest()->get();
        return Inertia::render('Admin/Teachers/TeacherList', [
            'teachers' => $teachers->map(fn($teacher) => [
                'id' => $teacher->id,
                'name' => $teacher->user->name,
                'email' => $teacher->user->email,
                'phone' => $teacher->phone,
                'subject' => $teacher->subject,
                'status' => $teacher->status
            ])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Teachers/CreateTeacher');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password'])
        ]);

        $user->teacher()->create([
            'phone' => $validated['phone'],
            'subject' => $validated['subject'],
            'status' => true
        ]);

        return redirect()->back()->with('success', 'Teacher added successfully');
    }

    public function update(Request $request, Teacher $teacher)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $teacher->user_id,
            'password' => 'nullable|min:8',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
        ]);

        $teacher->user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            ...(isset($validated['password']) ? ['password' => Hash::make($validated['password'])] : [])
        ]);

        $teacher->update([
            'phone' => $validated['phone'],
            'subject' => $validated['subject']
        ]);

        return redirect()->back()->with('success', 'Teacher updated successfully');
    }

    public function toggleStatus(Teacher $teacher)
    {
        $teacher->update([
            'status' => !$teacher->status
        ]);

        return redirect()->back()->with('success', 'Teacher status updated successfully');
    }

    public function destroy(Teacher $teacher)
    {
        // The user will be automatically deleted due to onDelete('cascade')
        $teacher->delete();
        return redirect()->back()->with('success', 'Teacher deleted successfully');
    }
}
