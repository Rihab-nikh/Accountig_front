import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../ui/button';
import { LogOut, Settings, Lock, User, ChevronDown } from 'lucide-react';

export function UserMenu() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleProfileClick = () => {
        navigate(user?.role === 'admin' ? '/admin/settings' : '/accountant/settings');
        setIsOpen(false);
    };

    if (!user) return null;

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-background-primary text-text-primary transition-colors"
                aria-label="User menu"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-2 flex-col text-right sm:flex-row">
                    <div>
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                    <div className="hidden sm:block text-sm">
                        <p className="font-medium text-text-primary">{user.name}</p>
                        <p className="text-xs text-text-secondary capitalize">{user.role}</p>
                    </div>
                </div>
                <ChevronDown
                    size={16}
                    className={`text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg z-50">
                    <div className="p-3 border-b border-border">
                        <p className="font-medium text-text-primary text-sm">{user.name}</p>
                        <p className="text-xs text-text-secondary capitalize">{user.role}</p>
                    </div>

                    <div className="py-2">
                        <button
                            onClick={handleProfileClick}
                            className="w-full flex items-center gap-3 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-background-secondary transition-colors text-sm"
                        >
                            <User size={16} />
                            <span>Profile Settings</span>
                        </button>

                        <button
                            onClick={() => {
                                navigate(user?.role === 'admin' ? '/admin/settings' : '/accountant/settings');
                                setIsOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-background-secondary transition-colors text-sm"
                        >
                            <Lock size={16} />
                            <span>Security Settings</span>
                        </button>
                    </div>

                    <div className="border-t border-border p-2">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2 text-error hover:bg-error-bg transition-colors text-sm rounded"
                        >
                            <LogOut size={16} />
                            <span>Log Out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
