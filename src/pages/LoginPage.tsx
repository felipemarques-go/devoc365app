import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import usersData from '@/data/users';
import { Loader2, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ValidationState = 'loading' | 'success' | 'error';

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState<ValidationState>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const uid = searchParams.get('uid');
    const email = searchParams.get('email');

    if (!uid || !email) {
      setState('error');
      setErrorMessage('Faltan parámetros de acceso (uid o email).');
      return;
    }

    const user = usersData[uid];

    if (!user) {
      setState('error');
      setErrorMessage('Usuario no encontrado. Verifica tu enlace de acceso.');
      return;
    }

    if (user.email !== email) {
      setState('error');
      setErrorMessage('El email no coincide con el usuario registrado.');
      return;
    }

    // Valid user - save to localStorage and redirect
    localStorage.setItem('currentUser', JSON.stringify({ uid, email }));
    setState('success');

    setTimeout(() => {
      navigate('/app');
    }, 1500);
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">
            Validación de Acceso
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 py-8">
          {state === 'loading' && (
            <>
              <Loader2 className="h-16 w-16 text-purple-600 animate-spin" />
              <p className="text-muted-foreground text-lg">Verificando credenciales...</p>
            </>
          )}

          {state === 'success' && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500" />
              <p className="text-green-600 text-lg font-medium">¡Acceso verificado!</p>
              <p className="text-muted-foreground">Redirigiendo a la aplicación...</p>
            </>
          )}

          {state === 'error' && (
            <>
              <XCircle className="h-16 w-16 text-destructive" />
              <p className="text-destructive text-lg font-medium text-center">{errorMessage}</p>
              <Button 
                onClick={() => navigate('/')} 
                variant="outline"
                className="mt-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al inicio
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
