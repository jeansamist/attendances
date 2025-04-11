import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Teacher } from '@/types';
import { Head, router } from '@inertiajs/react';

interface TeacherListProps {
    teachers: Teacher[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teachers',
        href: '/teachers',
    },
];

export default function TeacherList({ teachers }: TeacherListProps) {
    const handleStatusToggle = (teacherId: number) => {
        router.put(`/teachers/${teacherId}/toggle-status`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Teachers" />
            <div className="flex items-center justify-between p-6">
                <h2 className="text-2xl font-bold">Teachers List</h2>
                <Button onClick={() => router.get('/teachers/create')} className="bg-primary">
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
                                <Badge variant={teacher.status ? 'default' : 'secondary'}>{teacher.status ? 'Active' : 'Inactive'}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm" className="mr-2" onClick={() => router.get(`/teachers/${teacher.id}/edit`)}>
                                    Edit
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleStatusToggle(teacher.id)}>
                                    {teacher.status ? 'Deactivate' : 'Activate'}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AppLayout>
    );
}
