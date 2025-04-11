import { type ErrorBag, type Errors, type PageProps as InertiaPageProps } from '@inertiajs/core';

export interface User {
    role: 'admin' | 'teacher';
}

export interface Auth {
    user: User;
}

export interface PageProps extends InertiaPageProps {
    auth: Auth;
    errors: Errors & ErrorBag;
    deferred?: Record<string, string[] | undefined>;
    [key: string]: unknown;
}
