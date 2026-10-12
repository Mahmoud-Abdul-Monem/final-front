export default function AuthLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="h-dvh w-full">
            <div className="w-full flex justify-center items-center h-dvh bg-login-bgc dark:bg-dark-theme/50">
                {children}
            </div>
        </div>
    );
}