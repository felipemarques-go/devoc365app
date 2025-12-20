import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersData, { UserData, UserDevocion } from '@/data/users';
import { LogOut, BookOpen, User, Calendar, Crown, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const AppPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [selectedDevocion, setSelectedDevocion] = useState<UserDevocion | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    
    if (!stored) {
      navigate('/');
      return;
    }

    try {
      const { uid } = JSON.parse(stored);
      const userData = usersData[uid];
      
      if (!userData) {
        localStorage.removeItem('currentUser');
        navigate('/');
        return;
      }

      setUser(userData);
      if (userData.devocoes.length > 0) {
        setSelectedDevocion(userData.devocoes[0]);
      }
    } catch {
      localStorage.removeItem('currentUser');
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8" />
            <h1 className="text-xl md:text-2xl font-bold">Devoc365</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-white/90">Hola, {user.name}</span>
            <Button 
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Devoções List */}
          <Card className="lg:col-span-3 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                Mis Devociones
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[300px] lg:h-[calc(100vh-280px)]">
                <div className="px-4 pb-4 space-y-2">
                  {user.devocoes.map((devocion) => (
                    <button
                      key={devocion.id}
                      onClick={() => setSelectedDevocion(devocion)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedDevocion?.id === devocion.id
                          ? 'bg-purple-100 border-2 border-purple-500 text-purple-900'
                          : 'bg-muted/50 hover:bg-muted border-2 border-transparent'
                      }`}
                    >
                      <span className="font-medium">{devocion.title}</span>
                    </button>
                  ))}
                  {user.devocoes.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">
                      No tienes devociones aún
                    </p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Main Area - Selected Devoción */}
          <Card className="lg:col-span-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-purple-900">
                {selectedDevocion ? selectedDevocion.title : 'Selecciona una devoción'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] lg:h-[calc(100vh-320px)]">
                {selectedDevocion ? (
                  <div className="prose prose-purple max-w-none">
                    <p className="text-foreground leading-relaxed">
                      {selectedDevocion.content}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Selecciona una devoción del panel izquierdo para ver su contenido
                  </p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Right Sidebar - User Details */}
          <Card className="lg:col-span-3 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-purple-600" />
                Mi Perfil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Nombre</p>
                  <p className="font-medium">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <span className="text-muted-foreground">@</span>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium text-sm break-all">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Fecha de acceso</p>
                  <p className="font-medium">{user.accessDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Crown className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Plan</p>
                  <Badge variant={user.plan === 'premium' ? 'default' : 'secondary'}>
                    {user.plan === 'premium' ? 'Premium' : 'Básico'}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Hash className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Total devociones</p>
                  <p className="font-medium">{user.devocoes.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppPage;
