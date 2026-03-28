import React from 'react';
import { Button } from '../ui/button';

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
        icon?: React.ReactNode;
    };
    breadcrumb?: Array<{ label: string; href?: string }>;
}

export function PageHeader({
    title,
    description,
    action,
    breadcrumb,
}: PageHeaderProps) {
    return (
        <div className="mb-8">
            {breadcrumb && breadcrumb.length > 0 && (
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                    {breadcrumb.map((item, idx) => (
                        <React.Fragment key={idx}>
                            {idx > 0 && <span>/</span>}
                            {item.href ? (
                                <a href={item.href} className="hover:text-gray-900">
                                    {item.label}
                                </a>
                            ) : (
                                <span>{item.label}</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}

            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                    {description && (
                        <p className="mt-2 text-gray-600">{description}</p>
                    )}
                </div>
                {action && (
                    <Button
                        onClick={action.onClick}
                        className="ml-4 gap-2"
                    >
                        {action.icon}
                        {action.label}
                    </Button>
                )}
            </div>
        </div>
    );
}
