import React from 'react';
import { Card } from '../ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    unit?: string;
    trend?: string;
    trendUp?: boolean;
    icon?: React.ReactNode;
    color?: string;
    onClick?: () => void;
}

export function StatCard({
    title,
    value,
    unit,
    trend,
    trendUp,
    icon,
    color = 'bg-blue-500',
    onClick,
}: StatCardProps) {
    return (
        <Card
            className={`p-6 ${onClick ? 'cursor-pointer hover:shadow-md' : ''}`}
            onClick={onClick}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-gray-600 font-medium">{title}</p>
                    <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-3xl font-bold text-gray-900">{value}</span>
                        {unit && <span className="text-sm text-gray-600">{unit}</span>}
                    </div>
                    {trend && (
                        <div className="flex items-center gap-1 mt-2">
                            {trendUp ? (
                                <TrendingUp size={16} className="text-green-600" />
                            ) : (
                                <TrendingDown size={16} className="text-red-600" />
                            )}
                            <span
                                className={`text-xs font-semibold ${trendUp ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                {trend}
                            </span>
                        </div>
                    )}
                </div>
                {icon && (
                    <div className={`${color} p-3 rounded-lg text-white`}>
                        {icon}
                    </div>
                )}
            </div>
        </Card>
    );
}
