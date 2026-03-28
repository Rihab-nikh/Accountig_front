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
                <nav className="mb-4 text-sm" aria-label="Breadcrumb">
                    <ol className="flex items-center gap-2 text-text-secondary">
                        {breadcrumb.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                                {idx > 0 && <span aria-hidden="true">/</span>}
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        className="hover:text-text-primary transition-colors"
                                        aria-current={idx === breadcrumb.length - 1 ? 'page' : undefined}
                                    >
                                        {item.label}
                                    </a>
                                ) : (
                                    <span aria-current="page">{item.label}</span>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
            )}

            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-text-primary">{title}</h1>
                    {description && (
                        <p className="mt-2 text-text-secondary">{description}</p>
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
