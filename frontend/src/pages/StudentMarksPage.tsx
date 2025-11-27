import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import type { Student } from '../types';
import { StudentTable } from '../components/students/StudentTable';
import { UpdatePanel } from '../components/students/UpdatePanel';

export const StudentMarksPage = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadStudents = async () => {
        if (!courseId) return;

        try {
            setIsLoading(true);
            setError(null);
            const data = await api.getStudents(Number(courseId));
            setStudents(data);
            setSelectedIds(new Set()); // Clear selection after reload
        } catch (err) {
            setError('Failed to load students. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    useEffect(() => {
        loadStudents();
    }, [courseId]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    <div className="mt-4 text-indigo-600 font-semibold">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Card */}
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="group flex items-center gap-2 text-indigo-100 hover:text-white mb-4 transition-colors duration-200"
                            >
                                <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-200">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                </div>
                                <span className="font-medium">Back to Dashboard</span>
                            </button>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                                Student Marks Management
                            </h1>
                            <p className="mt-2 text-indigo-100 text-lg opacity-90">
                                Manage grades and view student performance for this course
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={loadStudents}
                                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl transition-all duration-200 border border-white/20 hover:scale-105 active:scale-95"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span className="font-semibold">Refresh Data</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-5 py-2.5 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm text-white rounded-xl transition-all duration-200 border border-red-200/30 hover:scale-105 active:scale-95"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="font-semibold">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl shadow-sm flex items-start gap-3">
                        <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h3 className="text-red-800 font-semibold">Error Loading Data</h3>
                            <p className="text-red-700 mt-1">{error}</p>
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Enrolled Students</h2>
                                <p className="text-sm text-gray-500">
                                    {students.length} students total • {selectedIds.size} selected
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <StudentTable
                            students={students}
                            selectedIds={selectedIds}
                            onSelectionChange={setSelectedIds}
                        />
                    </div>
                </div>

                {/* Update Panel */}
                {selectedIds.size > 0 && courseId && (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mt-8">
                        <UpdatePanel
                            selectedCount={selectedIds.size}
                            selectedIds={selectedIds}
                            courseId={Number(courseId)}
                            onUpdate={loadStudents}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
