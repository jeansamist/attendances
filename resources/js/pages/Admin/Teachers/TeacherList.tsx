import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { router } from '@inertiajs/react';

interface Teacher {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string;
    status: boolean;
}

interface TeacherListProps {
    teachers: Teacher[];
}

export default function TeacherList({ teachers }: TeacherListProps) {
    const handleStatusToggle = (teacherId: number) => {
        router.put(`/teachers/${teacherId}/toggle-status`);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Teachers List</h2>
                <Button
                    onClick={() => router.get('/teachers/create')}
                    className="bg-primary"
                >
                    Add New Teacher
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teachers.map((teacher) => (
                        <TableRow key={teacher.id}>
                            <TableCell>{teacher.name}</TableCell>
                            <TableCell>{teacher.email}</TableCell>
                            <TableCell>{teacher.phone || '-'}</TableCell>
                            <TableCell>{teacher.subject}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={teacher.status ? "default" : "secondary"}
                                >
                                    {teacher.status ? "Active" : "Inactive"}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mr-2"
                                    onClick={() => router.get(`/teachers/${teacher.id}/edit`)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleStatusToggle(teacher.id)}
                                >
                                    {teacher.status ? "Deactivate" : "Activate"}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
