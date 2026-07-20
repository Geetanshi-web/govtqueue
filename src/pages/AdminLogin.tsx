import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, LogIn, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Layout from '@/components/layout/Layout';
import { useAdmin } from '@/context/AdminContext';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAdmin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const success = login(username, password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <section className="gov-section min-h-[calc(100vh-200px)] flex items-center">
        <div className="gov-container">
          <div className="max-w-md mx-auto">
            <Card className="gov-card">
              <CardHeader className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Admin Portal</CardTitle>
                <CardDescription>
                  Sign in to access the administration dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="gov-input"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="gov-input"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full gov-button-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      'Signing in...'
                    ) : (
                      <>
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </>
                    )}
                  </Button>

                  <div className="text-center text-sm text-muted-foreground mt-4">
                    <p>Demo credentials:</p>
                    <p className="font-mono">admin / admin123</p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminLogin;
