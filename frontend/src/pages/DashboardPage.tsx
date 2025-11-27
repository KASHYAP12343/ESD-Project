import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const DashboardPage = () => {
    const { faculty, courses, logout } = useAuth();
    const navigate = useNavigate();
    const [selectedCourseId, setSelectedCourseId] = useState<string>('');

    const handleCourseSelect = (courseId: string) => {
        if (courseId) {
            navigate(`/students/${courseId}`);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Card */}
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold mb-3 tracking-tight">
                                Welcome back, {faculty?.name}! 👋
                            </h1>
                            <p className="text-indigo-100 text-lg">
                                Manage your courses and student grades with ease
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 border border-white/30 hover:scale-105"
                        >
                            <span className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </span>
                        </button>
                    </div>
                </div>

                {/* Faculty Information Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Faculty Information
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400 rounded-full -mr-10 -mt-10 opacity-20"></div>
                            <p className="text-sm text-blue-700 font-semibold mb-2 tracking-wide uppercase">Faculty ID</p>
                            <p className="text-2xl font-bold text-gray-900 relative z-10">{faculty?.id}</p>
                        </div>
                        <div className="group relative overflow-hidden bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-400 rounded-full -mr-10 -mt-10 opacity-20"></div>
                            <p className="text-sm text-indigo-700 font-semibold mb-2 tracking-wide uppercase">Full Name</p>
                            <p className="text-2xl font-bold text-gray-900 relative z-10">{faculty?.name}</p>
                        </div>
                        <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-400 rounded-full -mr-10 -mt-10 opacity-20"></div>
                            <p className="text-sm text-purple-700 font-semibold mb-2 tracking-wide uppercase">Email Address</p>
                            <p className="text-xl font-bold text-gray-900 relative z-10 truncate">{faculty?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Courses Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Your Courses
                        </h2>
                    </div>

                    {courses.length > 0 ? (
                        <div className="space-y-6">
                            {/* Course List */}
                            <div className="space-y-4">
                                {courses.map((course, index) => (
                                    <div
                                        key={course.courseId}
                                        className="group bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600">
                                                        {course.courseCode}
                                                    </span>
                                                    <h3 className="text-xl font-bold text-gray-900">
                                                        {course.name}
                                                    </h3>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{course.description}</p>
                                                <div className="flex flex-wrap gap-4">
                                                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200">
                                                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                        </svg>
                                                        {course.credits} Credits
                                                    </span>
                                                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200">
                                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        Year {course.year}
                                                    </span>
                                                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200">
                                                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Term {course.term}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Course Selection */}
                            <div className="mt-8 pt-8 border-t-2 border-gray-200">
                                <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-8 pb-10 border-2 border-indigo-200 shadow-lg">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                            Select a Course to Manage Students
                                        </h3>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                        <select
                                            value={selectedCourseId}
                                            onChange={(e) => {
                                                setSelectedCourseId(e.target.value);
                                                handleCourseSelect(e.target.value);
                                            }}
                                            className="w-full px-6 py-5 text-lg border-3 border-indigo-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 bg-white font-semibold cursor-pointer hover:border-purple-400 hover:shadow-xl appearance-none relative z-10 shadow-md"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236366f1'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'right 1rem center',
                                                backgroundSize: '1.5em 1.5em',
                                                paddingRight: '3rem',
                                                color: selectedCourseId ? '#4f46e5' : '#374151'
                                            }}
                                        >
                                            <option value="" style={{ color: '#6b7280' }}>✨ Select a course to get started...</option>
                                            {courses.map((course) => (
                                                <option
                                                    key={course.courseId}
                                                    value={course.courseId}
                                                    style={{ color: '#1f2937', fontWeight: '600' }}
                                                >
                                                    📚 {course.courseCode} - {course.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg className="w-6 h-6 text-indigo-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                    {selectedCourseId && (
                                        <div className="mt-6 flex items-center gap-2 text-sm text-indigo-700 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-indigo-200 animate-pulse">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                            <span className="font-semibold">Navigating to student management...</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-500 text-lg font-medium">No courses assigned yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
