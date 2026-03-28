import { AlertTriangle, Check, X } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from './ui/alert-dialog';

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    isDangerous?: boolean;
    isLoading?: boolean;
    onConfirm: () => void | Promise<void>;
    onCancel: () => void;
}

export function ConfirmationModal({
    isOpen,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isDangerous = false,
    isLoading = false,
    onConfirm,
    onCancel,
}: ConfirmationModalProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={() => !isLoading && onCancel()}>
            <AlertDialogContent className="bg-white border border-border rounded-xl">
                <div className="flex gap-4">
                    {isDangerous && (
                        <div className="flex-shrink-0 pt-1">
                            <AlertTriangle size={24} className="text-error" />
                        </div>
                    )}
                    <div className="flex-1">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-text-primary">
                                {title}
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-text-secondary">
                                {description}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                    </div>
                </div>

                <AlertDialogFooter className="flex gap-3 justify-end pt-4 border-t border-border">
                    <AlertDialogCancel
                        className="border-border text-text-primary hover:bg-background-secondary"
                        disabled={isLoading}
                    >
                        <X size={16} className="mr-2" />
                        {cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className={`${isDangerous
                                ? 'bg-error hover:bg-error/90'
                                : 'bg-accent hover:bg-accent/90'
                            } text-white`}
                        disabled={isLoading}
                        onClick={onConfirm}
                    >
                        {isLoading ? (
                            <>
                                <div className="inline-block mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Check size={16} className="mr-2" />
                                {confirmText}
                            </>
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
