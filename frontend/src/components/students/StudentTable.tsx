import { useState } from 'react';
import type { Student } from '../../types';

interface StudentTableProps {
    students: Student[];
    selectedIds: Set<number>;
    onSelectionChange: (ids: Set<number>) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({
    students,
    selectedIds,
    onSelectionChange,
}) => {
    const [selectAll, setSelectAll] = useState(false);

    const handleSelectAll = (checked: boolean) => {
        setSelectAll(checked);
        if (checked) {
            const allIds = new Set(students.map((s) => s.studentCourseId));
            onSelectionChange(allIds);
        } else {
            onSelectionChange(new Set());
        }
    };

    const handleSelectOne = (id: number, checked: boolean) => {
        const newSelection = new Set(selectedIds);
        if (checked) {
            newSelection.add(id);
        } else {
            newSelection.delete(id);
            setSelectAll(false);
        }
        onSelectionChange(newSelection);
    };

    const getGradeColor = (grade: string | null) => {
        switch (grade) {
            case 'A':
                return 'text-green-600 font-semibold';
            case 'B':
                return 'text-blue-600 font-semibold';
            case 'C':
                return 'text-yellow-600 font-semibold';
            case 'D':
                return 'text-orange-600 font-semibold';
            case 'F':
                return 'text-red-600 font-semibold';
            default:
                return 'text-gray-500';
        }
    };

    if (students.length === 0) {
        return <p className="text-gray-500 text-center py-8">No students enrolled in this course.</p>;
    }

    return (
        <div>
            <div className="flex gap-3 mb-4">
                <button
                    onClick={() => handleSelectAll(true)}
                    className="btn-success"
                >
                    ✓ Select All
                </button>
                <button
                    onClick={() => handleSelectAll(false)}
                    className="btn-secondary"
                >
                    ✗ Deselect All
                </button>
                <div className="ml-auto flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                        Selected: <strong>{selectedIds.size}</strong> student(s)
                    </span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left">
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                />
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Sr. No.
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Roll Number
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Marks
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Grade
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Comments
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {students.map((student, index) => (
                            <tr
                                key={student.studentCourseId}
                                className={selectedIds.has(student.studentCourseId) ? 'bg-blue-50' : 'hover:bg-gray-50'}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.has(student.studentCourseId)}
                                        onChange={(e) =>
                                            handleSelectOne(student.studentCourseId, e.target.checked)
                                        }
                                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {student.rollNumber}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {student.firstName} {student.lastName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {student.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                    {student.marks !== null ? student.marks.toFixed(2) : 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={getGradeColor(student.letterGrade)}>
                                        {student.letterGrade || 'N/A'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {student.comments || '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
