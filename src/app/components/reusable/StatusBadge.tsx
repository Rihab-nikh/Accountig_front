import React from 'react';
import { Badge } from '../ui/badge';
import { InvoiceStatus, AccountStatus, ClientStatus, DocumentStatus } from '../../types';

interface StatusBadgeProps {
    status: InvoiceStatus | AccountStatus | ClientStatus | DocumentStatus | string;
    size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
    const statusConfig: Record<string, { label: string; color: string }> = {
        // Invoice/Document statuses
        processed: { label: 'Processed', color: 'bg-green-100 text-green-800' },
        pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
        review: { label: 'Review', color: 'bg-blue-100 text-blue-800' },
        extraction_pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },

        // Account/Client statuses
        active: { label: 'Active', color: 'bg-green-100 text-green-800' },
        archived: { label: 'Archived', color: 'bg-gray-100 text-gray-800' },
        inactive: { label: 'Inactive', color: 'bg-gray-100 text-gray-800' },

        // Upload statuses
        idle: { label: 'Idle', color: 'bg-gray-100 text-gray-800' },
        uploading: { label: 'Uploading', color: 'bg-blue-100 text-blue-800' },
        processing: { label: 'Processing', color: 'bg-blue-100 text-blue-800' },
        success: { label: 'Success', color: 'bg-green-100 text-green-800' },
        error: { label: 'Error', color: 'bg-red-100 text-red-800' },

        // Report statuses
        draft: { label: 'Draft', color: 'bg-orange-100 text-orange-800' },
        finalized: { label: 'Finalized', color: 'bg-green-100 text-green-800' },
    };

    const config = statusConfig[status] || {
        label: status.charAt(0).toUpperCase() + status.slice(1),
        color: 'bg-gray-100 text-gray-800',
    };

    const sizeClass = {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-3 py-1',
        lg: 'text-base px-4 py-2',
    }[size];

    return (
        <Badge className={`${config.color} ${sizeClass}`}>
            {config.label}
        </Badge>
    );
}
