import React, { useState, useMemo } from 'react';
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
import { Button } from '../ui/button';
import {
    ChevronUp,
    ChevronDown,
    ChevronsUpDown,
    Loader,
    Search,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { Input } from '../ui/input';

export type SortDirection = 'asc' | 'desc' | null;

export interface Column<T> {
    id: string;
    header: string;
    accessor?: keyof T;
    render?: (row: T) => React.ReactNode;
    sortable?: boolean;
    filterable?: boolean;
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
    pageSize?: number;
    enablePagination?: boolean;
    enableSearch?: boolean;
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
    pageSize = 10,
    enablePagination = true,
    enableSearch = false,
}: DataTableProps<T>) {
    const [sortColumn, setSortColumn] = React.useState<string | null>(null);
    const [sortDir, setSortDir] = React.useState<SortDirection>(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchQuery, setSearchQuery] = useState('');

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
        if (selectedIds.length === displayData.length) {
            onSelectionChange?.([]);
        } else {
            onSelectionChange?.(displayData.map((row) => row.id));
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
            return <ChevronsUpDown size={16} className="text-text-tertiary" />;
        }
        return sortDir === 'asc' ? (
            <ChevronUp size={16} className="text-text-primary" />
        ) : (
            <ChevronDown size={16} className="text-text-primary" />
        );
    };

    // Filtering and pagination logic
    const filteredData = useMemo(() => {
        if (!enableSearch || !searchQuery.trim()) {
            return data;
        }

        const query = searchQuery.toLowerCase();
        return data.filter((row) =>
            columns.some((column) => {
                const accessor = column.accessor || column.id;
                const value = (row as any)[accessor];
                return String(value || '').toLowerCase().includes(query);
            })
        );
    }, [data, searchQuery, enableSearch, columns]);

    const displayData = useMemo(() => {
        if (!enablePagination) {
            return filteredData;
        }

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, currentPage, pageSize, enablePagination]);

    const totalPages = Math.ceil(filteredData.length / pageSize);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;

    if (isLoading) {
        return (
            <Card className="p-8 flex items-center justify-center">
                <Loader className="animate-spin text-text-secondary" size={24} />
            </Card>
        );
    }

    if (data.length === 0) {
        return (
            <Card className="p-8 text-center text-text-secondary">
                No data available
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            {enableSearch && (
                <div className="relative">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
                        size={18}
                    />
                    <Input
                        type="text"
                        placeholder="Search table..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="pl-10 bg-background-primary border-border text-text-primary placeholder:text-text-tertiary"
                    />
                </div>
            )}

            {/* Table */}
            <Card className="overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-border hover:bg-transparent bg-background-secondary">
                            {isSelectable && (
                                <TableHead className="w-12 pr-0 flex items-center">
                                    <Checkbox
                                        checked={
                                            displayData.length > 0 && selectedIds.length === displayData.length
                                        }
                                        onChange={() => toggleAllSelection()}
                                        aria-label="Select all rows"
                                    />
                                </TableHead>
                            )}
                            {columns.map((column) => (
                                <TableHead
                                    key={column.id}
                                    className={`${column.width || ''} ${column.sortable ? 'cursor-pointer hover:text-text-primary' : ''}`}
                                    onClick={() => column.sortable && handleSort(column.id)}
                                >
                                    <div className="flex items-center gap-2 text-text-primary font-semibold">
                                        <span>{column.header}</span>
                                        {column.sortable && getSortIcon(column.id)}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {displayData.map((row) => (
                            <TableRow
                                key={row.id}
                                className={`border-b border-border hover:bg-background-secondary transition-colors ${onRowClick ? 'cursor-pointer' : ''
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
                                    <TableCell key={`${row.id}-${column.id}`} className="text-text-primary">
                                        {column.render
                                            ? column.render(row)
                                            : String((row as any)[column.accessor || column.id] || '')}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            {/* Pagination */}
            {enablePagination && totalPages > 1 && (
                <div className="flex items-center justify-between py-4 px-4 bg-background-primary border border-border rounded-lg">
                    <div className="text-sm text-text-secondary">
                        Showing {Math.min((currentPage - 1) * pageSize + 1, filteredData.length)} to{' '}
                        {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} results
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!hasPrevPage}
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            className="text-text-secondary disabled:text-text-muted"
                        >
                            <ChevronLeft size={16} />
                        </Button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter((page) => {
                                    const diff = Math.abs(page - currentPage);
                                    return diff === 0 || diff === 1 || page === 1 || page === totalPages;
                                })
                                .map((page, idx, arr) => (
                                    <React.Fragment key={page}>
                                        {idx > 0 && arr[idx - 1] !== page - 1 && (
                                            <span className="text-text-tertiary">...</span>
                                        )}
                                        <Button
                                            variant={page === currentPage ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setCurrentPage(page)}
                                            className={page === currentPage ? 'bg-accent text-white' : ''}
                                        >
                                            {page}
                                        </Button>
                                    </React.Fragment>
                                ))}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!hasNextPage}
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            className="text-text-secondary disabled:text-text-muted"
                        >
                            <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
