import React from 'react';
import { Button } from '../ui/button';

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export function EmptyState({
    icon,
    title,
    description,
    action,
}: EmptyStateProps) {
    return (
        <div className="flex items-center justify-center py-12 px-4">
            <div className="text-center max-w-md">
                {icon && <div className="mb-4 flex justify-center text-gray-400">{icon}</div>}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                {description && (
                    <p className="text-sm text-gray-600 mb-6">{description}</p>
                )}
                {action && (
                    <Button onClick={action.onClick}>
                        {action.label}
                    </Button>
                )}
            </div>
        </div>
    );
}
