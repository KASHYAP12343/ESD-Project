export interface Faculty {
    id: number;
    name: string;
    email: string;
}

export interface Course {
    courseId: number;
    courseCode: string;
    name: string;
    description: string;
    credits: number;
    year: number;
    term: string;
}

export interface Student {
    studentCourseId: number;
    studentId: number;
    rollNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    marks: number | null;
    letterGrade: string | null;
    comments: string | null;
}

export interface UpdateMarksRequest {
    marks?: number;
    comments?: string;
}

export interface BulkUpdateRequest {
    graceMarks?: number;
    marksToDecrease?: number;
}

export interface AuthResponse {
    faculty: Faculty;
    courses: Course[];
}
