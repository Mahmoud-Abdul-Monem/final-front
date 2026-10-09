'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTokenStore } from '@/store/token'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { token } = useTokenStore()

    useEffect(() => {
        if (!token) {
            router.replace('/login');
        }
    }, [token, router]);

    if (!token) return null;

    return <>{children}</>;
}