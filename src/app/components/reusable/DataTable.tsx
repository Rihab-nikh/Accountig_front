import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import { Checkbox } from '../ui/checkbox';
import { Card } from '../ui/card';
import {
    ChevronUp,
    ChevronDown,
    ChevronsUpDown,
    Loader,
} from 'lucide-react';

export type SortDirection = 'asc' | 'desc' | null;

export interface Column<T> {
    id: string;
    header: string;
    accessor?: keyof T;
    render?: (row: T) => React.ReactNode;
    sortable?: boolean;
    width?: string;
}

interface DataTableProps<T extends { id: string }> {
    columns: Column<T>[];
    data: T[];
    isLoading?: boolean;
    isSelectable?: boolean;
    selectedIds?: string[];
    onSelectionChange?: (ids: string[]) => void;
    onSort?: (columnId: string, direction: SortDirection) => void;
    onRowClick?: (row: T) => void;
}

export function DataTable<T extends { id: string }>({
    columns,
    data,
    isLoading = false,
    isSelectable = false,
    selectedIds = [],
    onSelectionChange,
    onSort,
    onRowClick,
}: DataTableProps<T>) {
    const [sortColumn, setSortColumn] = React.useState<string | null>(null);
    const [sortDir, setSortDir] = React.useState<SortDirection>(null);

    const handleSort = (columnId: string) => {
        let newDir: SortDirection = 'asc';
        if (sortColumn === columnId && sortDir === 'asc') {
            newDir = 'desc';
        } else if (sortColumn === columnId && sortDir === 'desc') {
            newDir = null;
        }

        setSortColumn(newDir ? columnId : null);
        setSortDir(newDir);
        onSort?.(columnId, newDir);
    };

    const toggleAllSelection = () => {
        if (selectedIds.length === data.length) {
            onSelectionChange?.([]);
        } else {
            onSelectionChange?.(data.map((row) => row.id));
        }
    };

    const toggleRowSelection = (id: string) => {
        if (selectedIds.includes(id)) {
            onSelectionChange?.(selectedIds.filter((sid) => sid !== id));
        } else {
            onSelectionChange?.([...selectedIds, id]);
        }
    };

    const getSortIcon = (columnId: string) => {
        if (sortColumn !== columnId) {
            return <ChevronsUpDown size={16} className="text-gray-400" />;
        }
        return sortDir === 'asc' ? (
            <ChevronUp size={16} className="text-gray-900" />
        ) : (
            <ChevronDown size={16} className="text-gray-900" />
        );
    };

    if (isLoading) {
        return (
            <Card className="p-8 flex items-center justify-center">
                <Loader className="animate-spin text-gray-400" size={24} />
            </Card>
        );
    }

    if (data.length === 0) {
        return (
            <Card className="p-8 text-center text-gray-500">
                No data available
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="border-b border-gray-200 hover:bg-transparent">
                        {isSelectable && (
                            <TableHead className="w-12 pr-0">
                                <Checkbox
                                    checked={
                                        data.length > 0 && selectedIds.length === data.length
                                    }
                                    indeterminate={
                                        selectedIds.length > 0 && selectedIds.length < data.length
                                    }
                                    onChange={toggleAllSelection}
                                />
                            </TableHead>
                        )}
                        {columns.map((column) => (
                            <TableHead
                                key={column.id}
                                className={column.width || ''}
                                onClick={() => column.sortable && handleSort(column.id)}
                            >
                                <div className="flex items-center gap-2">
                                    <span>{column.header}</span>
                                    {column.sortable && getSortIcon(column.id)}
                                </div>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.id}
                            className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''
                                }`}
                            onClick={() => onRowClick?.(row)}
                        >
                            {isSelectable && (
                                <TableCell className="pr-0 w-12">
                                    <Checkbox
                                        checked={selectedIds.includes(row.id)}
                                        onChange={() => toggleRowSelection(row.id)}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </TableCell>
                            )}
                            {columns.map((column) => (
                                <TableCell key={`${row.id}-${column.id}`}>
                                    {column.render
                                        ? column.render(row)
                                        : String(
                                            (row as Record<string, any>)[
                                            column.accessor || column.id
                                            ] || ''
                                        )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}
