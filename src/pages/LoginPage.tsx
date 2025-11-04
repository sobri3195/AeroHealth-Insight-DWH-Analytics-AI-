import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/config/constants';

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const mockUser = {
        id: '1',
        username,
        name: 'Demo User',
        email: 'demo@aerohealth.mil',
        role: 'LEADERSHIP' as const,
        facilities: ['ALL'],
        permissions: ['view:all'],
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      login(mockToken, mockUser);
      navigate(ROUTES.HOME);
    } catch (err) {
      setError('Login gagal. Periksa kredensial Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">AeroHealth Insight</h1>
          <p className="text-blue-100">Healthcare Analytics & DWH Platform</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Login
            </Button>

            <div className="text-xs text-gray-500 text-center">
              <p>SSO & MFA akan diaktifkan di produksi</p>
            </div>
          </form>
        </Card>

        <div className="mt-6 text-center text-sm text-blue-100">
          <p>© 2024 AeroHealth. Platform keamanan tinggi.</p>
        </div>
      </div>
    </div>
  );
}
