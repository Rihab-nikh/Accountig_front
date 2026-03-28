import React, { useState, useRef } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Cloud, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export interface UploadFile {
    id: string;
    name: string;
    status: 'idle' | 'uploading' | 'processing' | 'success' | 'error';
    progress: number;
    error?: string;
}

interface UploadZoneProps {
    onFilesSelected: (files: File[]) => Promise<void>;
    acceptedFormats?: string[];
    isProcessing?: boolean;
}

export function UploadZone({
    onFilesSelected,
    acceptedFormats = ['.pdf', '.png', '.jpg', '.jpeg'],
    isProcessing = false,
}: UploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [uploads, setUploads] = useState<UploadFile[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        await handleFiles(files);
    };

    const handleFileSelect = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = Array.from(e.currentTarget.files || []);
        await handleFiles(files);
    };

    const handleFiles = async (files: File[]) => {
        // Add files to uploads list
        const newUploads = files.map((file) => ({
            id: `${file.name}-${Date.now()}`,
            name: file.name,
            status: 'uploading' as const,
            progress: 0,
        }));

        setUploads((prev) => [...prev, ...newUploads]);

        // Simulate upload and processing
        for (const file of files) {
            const uploadId = `${file.name}-${Date.now()}`;

            // Simulate upload progress
            const uploadInterval = setInterval(() => {
                setUploads((prev) =>
                    prev.map((u) =>
                        u.id === uploadId && u.progress < 100
                            ? { ...u, progress: Math.min(u.progress + 10, 100) }
                            : u
                    )
                );
            }, 100);

            await new Promise((resolve) => setTimeout(resolve, 1000));
            clearInterval(uploadInterval);

            // Update to processing
            setUploads((prev) =>
                prev.map((u) =>
                    u.id === uploadId
                        ? { ...u, status: 'processing' as const, progress: 100 }
                        : u
                )
            );

            // Simulate processing
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Mark as success
            setUploads((prev) =>
                prev.map((u) =>
                    u.id === uploadId ? { ...u, status: 'success' as const } : u
                )
            );
        }

        // Call onFilesSelected
        try {
            await onFilesSelected(files);
        } catch (error) {
            setUploads((prev) =>
                prev.map((u) =>
                    newUploads.some((nu) => nu.id === u.id)
                        ? {
                            ...u,
                            status: 'error' as const,
                            error: (error as Error).message,
                        }
                        : u
                )
            );
        }
    };

    return (
        <div className="space-y-6">
            <motion.div
                animate={{ scale: isDragging ? 1.02 : 1 }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 transition-colors ${isDragging
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                    }`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={acceptedFormats.join(',')}
                    onChange={handleFileSelect}
                    className="hidden"
                />

                <div className="flex flex-col items-center justify-center space-y-4">
                    <motion.div
                        animate={{ y: isDragging ? -4 : 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                        <Cloud
                            size={48}
                            className={`${isDragging ? 'text-blue-500' : 'text-gray-400'
                                } transition-colors`}
                        />
                    </motion.div>

                    <div className="text-center">
                        <h3 className="font-semibold text-gray-900 mb-1">
                            {isDragging
                                ? 'Drop your files here'
                                : 'Drag and drop your documents'}
                        </h3>
                        <p className="text-sm text-gray-600">
                            PDF, PNG, or JPG (up to 50MB)
                        </p>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isProcessing}
                        className="mt-2"
                    >
                        <Upload size={16} />
                        Select Files
                    </Button>
                </div>
            </motion.div>

            {/* Upload Progress List */}
            {uploads.length > 0 && (
                <div className="space-y-3">
                    {uploads.map((upload) => (
                        <Card key={upload.id} className="p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">{upload.name}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        {upload.status === 'uploading' && (
                                            <span className="text-xs text-blue-600">
                                                Uploading... {upload.progress}%
                                            </span>
                                        )}
                                        {upload.status === 'processing' && (
                                            <span className="text-xs text-blue-600">
                                                Processing with AI...
                                            </span>
                                        )}
                                        {upload.status === 'success' && (
                                            <span className="text-xs text-green-600 flex items-center gap-1">
                                                <CheckCircle size={14} /> Extraction successful
                                            </span>
                                        )}
                                        {upload.status === 'error' && (
                                            <span className="text-xs text-red-600 flex items-center gap-1">
                                                <AlertCircle size={14} /> {upload.error || 'Error'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {(upload.status === 'uploading' ||
                                upload.status === 'processing') && (
                                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${upload.progress}%` }}
                                            className="h-full bg-blue-500"
                                            transition={{ duration: 0.1 }}
                                        />
                                    </div>
                                )}
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
