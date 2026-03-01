import React from 'react';

interface PageWrapperProps {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
    headerContent?: React.ReactNode;
    children: React.ReactNode;
}

export function PageWrapper({ title, subtitle, action, headerContent, children }: PageWrapperProps) {
    return (
        <div className="flex flex-col h-full space-y-4 p-4 md:p-8 pt-6">
            {headerContent && <div>{headerContent}</div>}
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                    {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
                </div>
                {action && <div className="flex items-center space-x-2">{action}</div>}
            </div>
            {children}
        </div>
    );
}
