import axios from 'axios';
import type {
    AuthResponse,
    Student,
    UpdateMarksRequest,
} from '../types';

const API_BASE = 'http://localhost:8080/api/faculty';

// Configure axios to send cookies
axios.defaults.withCredentials = true;

export const api = {
    // Authentication
    checkAuth: async (): Promise<AuthResponse> => {
        const response = await axios.get(`${API_BASE}/courses`);
        return response.data;
    },
    logout: async (): Promise<void> => {
        await axios.post('http://localhost:8080/logout');
    },

    // Courses
    getCourses: async (): Promise<AuthResponse> => {
        const response = await axios.get(`${API_BASE}/courses`);
        return response.data;
    },

    // Students
    getStudents: async (courseId: number): Promise<Student[]> => {
        const response = await axios.get(
            `${API_BASE}/courses/${courseId}/students`
        );
        return response.data;
    },

    // Marks Updates
    updateExactMarks: async (
        courseId: number,
        studentCourseId: number,
        data: UpdateMarksRequest
    ): Promise<Student> => {
        const response = await axios.put(
            `${API_BASE}/courses/${courseId}/students/${studentCourseId}/grade`,
            data
        );
        return response.data;
    },

    addGraceMarks: async (
        courseId: number,
        graceMarks: number,
        studentCourseIds?: number[]
    ): Promise<void> => {
        await axios.post(`${API_BASE}/courses/${courseId}/grace-marks`, {
            graceMarks,
            studentCourseIds,
        });
    },

    decreaseMarks: async (
        courseId: number,
        marksToDecrease: number,
        studentCourseIds?: number[]
    ): Promise<void> => {
        await axios.post(`${API_BASE}/courses/${courseId}/decrease-marks`, {
            marksToDecrease,
            studentCourseIds,
        });
    },
};
