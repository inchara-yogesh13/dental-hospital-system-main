export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-center h-full min-h-screen bg-slate-50 dark:bg-black">
            {children}
        </div>
    );
}
