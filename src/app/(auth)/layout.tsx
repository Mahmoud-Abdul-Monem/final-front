import type { Metadata } from "next";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AuthLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="min-h-screen w-full">
            <div className="w-full flex justify-center items-center min-h-screen bg-login-bgc dark:bg-dark-theme/50 p-4">
                {children}
            </div>
        </div>
    );
}
