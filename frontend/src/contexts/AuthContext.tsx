import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Faculty, Course } from '../types';

interface AuthContextType {
    faculty: Faculty | null;
    courses: Course[];
    isLoading: boolean;
    isAuthenticated: boolean;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [faculty, setFaculty] = useState<Faculty | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = async () => {
        try {
            setIsLoading(true);
            const data = await api.checkAuth();
            setFaculty(data.faculty);
            setCourses(data.courses);
            setIsAuthenticated(true);
        } catch (error) {
            setFaculty(null);
            setCourses([]);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await api.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear state regardless of API call success
            setFaculty(null);
            setCourses([]);
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                faculty,
                courses,
                isLoading,
                isAuthenticated,
                checkAuth,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
