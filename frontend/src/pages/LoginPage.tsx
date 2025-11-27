import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logoImage from '../assets/newlogo.png';

export const LoginPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleGoogleLogin = () => {
        // Redirect to backend OAuth2 endpoint
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-8 py-16 relative"
            style={{
                backgroundImage: `url(${logoImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* NO overlay - background fully visible */}

            {/* Login Card - Centered with proper margins */}
            <div className="relative z-10 max-w-lg w-full mx-auto">
                {/* Very transparent card (60% white) so background shows through */}
                <div className="backdrop-blur-sm bg-white/60 rounded-3xl shadow-2xl px-10 py-12 space-y-8 border-2 border-white/40">
                    <div className="text-center space-y-3">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3 drop-shadow-sm">
                            🎓 Faculty Grading System
                        </h1>
                        <p className="text-gray-900 font-bold text-lg drop-shadow-sm">
                            Sign in with your faculty account to continue
                        </p>
                    </div>

                    <div className="mt-10 space-y-6">
                        {/* Info box with low opacity */}
                        <div className="bg-blue-200/60 border-l-4 border-primary-700 p-5 rounded-lg backdrop-blur-sm">
                            <p className="text-sm text-gray-900 font-bold drop-shadow-sm">
                                <strong>Note:</strong> Use a Google account with "faculty" in the email address.
                            </p>
                            <p className="text-xs text-gray-900 mt-2 font-semibold drop-shadow-sm">
                                Test accounts: <strong>facultyalgo@gmail.com</strong> or <strong>facultymml1@gmail.com</strong>
                            </p>
                        </div>

                        {/* Login button */}
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-4 btn-primary py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] mt-8"
                        >
                            <svg className="w-7 h-7" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                                />
                            </svg>
                            Sign in with Google
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="text-center text-sm text-gray-900 mt-8 font-bold pt-4 border-t border-gray-400/50 drop-shadow-sm">
                        🔒 Secure authentication via OAuth 2.0
                    </div>
                </div>
            </div>
        </div>
    );
};
