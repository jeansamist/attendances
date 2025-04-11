<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // First, add teacher-specific fields to users table
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable()->after('email');
            $table->string('subject')->nullable()->after('phone');
            $table->boolean('is_teacher')->default(false)->after('subject');
            $table->boolean('status')->default(true)->after('is_teacher');
        });

        // Migrate existing teacher data to users table
        if (Schema::hasTable('teachers')) {
            $teachers = DB::table('teachers')->get();
            foreach ($teachers as $teacher) {
                DB::table('users')
                    ->where('id', $teacher->user_id)
                    ->update([
                        'phone' => $teacher->phone,
                        'subject' => $teacher->subject,
                        'is_teacher' => true,
                        'status' => $teacher->status
                    ]);
            }

            // Drop the teachers table
            Schema::dropIfExists('teachers');
        }
    }

    public function down(): void
    {
        // Recreate teachers table
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('phone')->nullable();
            $table->string('subject');
            $table->boolean('status')->default(true);
            $table->timestamps();
        });

        // Migrate data back to teachers table
        $teachers = DB::table('users')
            ->where('is_teacher', true)
            ->get();

        foreach ($teachers as $teacher) {
            DB::table('teachers')->insert([
                'user_id' => $teacher->id,
                'phone' => $teacher->phone,
                'subject' => $teacher->subject,
                'status' => $teacher->status,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }

        // Remove teacher-specific fields from users table
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['phone', 'subject', 'is_teacher', 'status']);
        });
    }
};