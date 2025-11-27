import { useState } from 'react';
import { api } from '../../services/api';

interface UpdatePanelProps {
    selectedCount: number;
    selectedIds: Set<number>;
    courseId: number;
    onUpdate: () => void;
}

export const UpdatePanel: React.FC<UpdatePanelProps> = ({
    selectedCount,
    selectedIds,
    courseId,
    onUpdate,
}) => {
    const [exactMarks, setExactMarks] = useState('');
    const [comments, setComments] = useState('');
    const [adjustValue, setAdjustValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const selectedId = selectedCount === 1 ? Array.from(selectedIds)[0] : null;

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 5000);
    };

    const handleUpdateExactMarks = async () => {
        if (!selectedId || !exactMarks) {
            showMessage('error', 'Please enter marks');
            return;
        }

        try {
            setIsLoading(true);
            await api.updateExactMarks(courseId, selectedId, {
                marks: parseFloat(exactMarks),
                comments: comments || undefined,
            });
            showMessage('success', 'Marks updated successfully!');
            setExactMarks('');
            setComments('');
            onUpdate();
        } catch (error) {
            showMessage('error', 'Failed to update marks');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdjustMarks = async (operation: 'increase' | 'decrease') => {
        if (!adjustValue) {
            showMessage('error', 'Please enter adjustment value');
            return;
        }

        const value = parseFloat(adjustValue);
        const confirmed = window.confirm(
            `Are you sure you want to ${operation} marks by ${value} for ${selectedCount} student(s)?`
        );

        if (!confirmed) return;

        try {
            setIsLoading(true);
            // Convert selectedIds Set to array for API
            const studentCourseIdsArray = Array.from(selectedIds);

            if (operation === 'increase') {
                await api.addGraceMarks(courseId, value, studentCourseIdsArray);
            } else {
                await api.decreaseMarks(courseId, value, studentCourseIdsArray);
            }
            showMessage('success', `Marks ${operation}d successfully for ${selectedCount} student(s)!`);
            setAdjustValue('');
            onUpdate();
        } catch (error) {
            showMessage('error', `Failed to ${operation} marks`);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card space-y-6">
            <div className="bg-primary-50 p-4 rounded-lg">
                <p className="text-primary-800 font-semibold">
                    Selected: {selectedCount} student(s)
                </p>
            </div>

            {message && (
                <div
                    className={`p-4 rounded-lg ${message.type === 'success'
                        ? 'bg-green-50 text-green-800 border-l-4 border-green-500'
                        : 'bg-red-50 text-red-800 border-l-4 border-red-500'
                        }`}
                >
                    {message.text}
                </div>
            )}

            {/* Single Student Options */}
            {selectedCount === 1 && (
                <div className="space-y-6">
                    {/* Option 1: Set Exact Marks */}
                    <div className="border-b border-gray-200 pb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Option 1: Set Exact Marks
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    New Marks (0-100)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    value={exactMarks}
                                    onChange={(e) => setExactMarks(e.target.value)}
                                    className="input-field"
                                    placeholder="Enter marks"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Comments (optional)
                                </label>
                                <input
                                    type="text"
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    className="input-field"
                                    placeholder="Enter comments"
                                />
                            </div>
                            <button
                                onClick={handleUpdateExactMarks}
                                disabled={isLoading || !exactMarks}
                                className="btn-success"
                            >
                                {isLoading ? 'Updating...' : '📝 Set Exact Marks'}
                            </button>
                        </div>
                    </div>

                    {/* Option 2: Adjust Marks */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Option 2: Increase/Decrease Marks
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Adjust By
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={adjustValue}
                                    onChange={(e) => setAdjustValue(e.target.value)}
                                    className="input-field"
                                    placeholder="Enter value"
                                />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleAdjustMarks('increase')}
                                    disabled={isLoading || !adjustValue}
                                    className="btn-success flex-1"
                                >
                                    ➕ Increase
                                </button>
                                <button
                                    onClick={() => handleAdjustMarks('decrease')}
                                    disabled={isLoading || !adjustValue}
                                    className="btn-danger flex-1"
                                >
                                    ➖ Decrease
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Multiple Students Options */}
            {selectedCount > 1 && (
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Bulk Increase/Decrease Marks
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Adjust By
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={adjustValue}
                                onChange={(e) => setAdjustValue(e.target.value)}
                                className="input-field"
                                placeholder="Enter value"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleAdjustMarks('increase')}
                                disabled={isLoading || !adjustValue}
                                className="btn-success flex-1"
                            >
                                ➕ Increase Selected Students
                            </button>
                            <button
                                onClick={() => handleAdjustMarks('decrease')}
                                disabled={isLoading || !adjustValue}
                                className="btn-danger flex-1"
                            >
                                ➖ Decrease Selected Students
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
