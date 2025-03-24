import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function CreateTeacher() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        subject: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/teachers', values, {
            onError: (errors) => {
                setErrors(errors);
            },
            onSuccess: () => {
                // Reset form after successful submission
                setValues({
                    name: '',
                    email: '',
                    password: '',
                    phone: '',
                    subject: '',
                });
            },
        });
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold">Add New Teacher</h2>
            </div>

            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Teacher Information</CardTitle>
                    <CardDescription>
                        Enter the details for the new teacher.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                placeholder="Enter teacher's name"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                placeholder="Enter teacher's email"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone (Optional)</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                placeholder="Enter teacher's phone number"
                            />
                            {errors.phone && (
                                <p className="text-sm text-red-500">{errors.phone}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                                id="subject"
                                name="subject"
                                value={values.subject}
                                onChange={handleChange}
                                placeholder="Enter teacher's subject"
                            />
                            {errors.subject && (
                                <p className="text-sm text-red-500">{errors.subject}</p>
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.get('/teachers')}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Create Teacher</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
