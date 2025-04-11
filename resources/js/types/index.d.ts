import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    phone?: string | null;
    subject?: string | null;
    is_teacher?: boolean;
    role?: 'admin' | 'teacher';
    active?: boolean;
    status?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

/**
 * Teacher interface for API response data
 * Note: This represents the flattened structure sent by the TeacherController
 * where user name and email are included at the top level
 */
export interface Teacher {
    id: number;
    name: string;            // From user relation
    email: string;           // From user relation
    phone: string | null;
    subject: string;
    status: boolean;
    user_id?: number;        // May not be included in API responses
    created_at?: string;     // May not be included in API responses
    updated_at?: string;     // May not be included in API responses
    user?: User;             // Full user object, included when needed
}

/**
 * Teacher model as structured in the database
 */
export interface TeacherModel {
    id: number;
    user_id: number;
    phone: string | null;
    subject: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    user?: User;
}
