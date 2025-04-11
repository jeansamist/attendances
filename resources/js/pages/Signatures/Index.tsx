import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';

interface Signature {
    id: number;
    type: 'entry' | 'exit';
    validated: boolean;
    created_at: string;
}

interface SignaturesProps {
    signatures: Signature[];
    canValidate: boolean; // Flag to determine if user can validate signatures
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Signatures',
        href: '/signatures',
    },
];

export default function Signatures({ signatures, canValidate }: SignaturesProps) {
    const createSignature = (type: 'entry' | 'exit') => {
        router.post('/signatures', { type });
    };

    const validateSignature = (id: number) => {
        router.put(`/signatures/${id}/validate`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Signatures" />
            <div className="p-6">
                <h2 className="text-2xl font-bold">Signatures</h2>
            </div>

            <div className="w-full space-y-6">
                {/* {canValidate && ( */}
                <Card className="mx-auto max-w-2xl">
                    <CardHeader>
                        <CardTitle>Create New Signature</CardTitle>
                        <CardDescription>Record your entry or exit signature.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center gap-4">
                        <Button onClick={() => createSignature('entry')} variant="default">
                            Entry Signature
                        </Button>
                        <Button onClick={() => createSignature('exit')} variant="default">
                            Exit Signature
                        </Button>
                    </CardContent>
                </Card>
                {/* )}S */}
                <Card className="mx-auto max-w-2xl">
                    <CardHeader>
                        <CardTitle>Signature History</CardTitle>
                        <CardDescription>View and manage your signatures.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    {canValidate && <TableHead className="text-right">Actions</TableHead>}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {signatures.map((signature) => (
                                    <TableRow key={signature.id}>
                                        <TableCell>{format(new Date(signature.created_at), 'PPpp')}</TableCell>
                                        <TableCell className="capitalize">{signature.type}</TableCell>
                                        <TableCell>{signature.validated ? 'Validated' : 'Pending'}</TableCell>
                                        {canValidate && (
                                            <TableCell className="text-right">
                                                {!signature.validated && (
                                                    <Button variant="outline" size="sm" onClick={() => validateSignature(signature.id)}>
                                                        Validate
                                                    </Button>
                                                )}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
