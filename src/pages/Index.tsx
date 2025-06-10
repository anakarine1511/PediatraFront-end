
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, UserCheck, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      {/* Header */}
      <header className="bg-red-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Stethoscope className="h-8 w-8" />
              <h1 className="text-2xl font-bold">ClínicaPed</h1>
            </div>
            <nav className="flex space-x-4">
              <Link to="/login-pacientes">
                <Button variant="outline" className="text-red-600 border-white hover:bg-red-50">
                  Login Paciente
                </Button>
              </Link>
              <Link to="/login-medicos">
                <Button variant="outline" className="text-red-600 border-white hover:bg-red-50">
                  Login Médico
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-800 mb-4">
            Sistema de Agendamento Pediátrico
          </h2>
          <p className="text-lg text-red-600 max-w-2xl mx-auto">
            Plataforma segura e fácil de usar para agendamento de consultas pediátricas.
            Conectando famílias e profissionais de saúde.
          </p>
        </div>

        {/* Features Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border-red-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-red-600" />
                <CardTitle className="text-red-800">Para Pacientes</CardTitle>
              </div>
              <CardDescription className="text-red-600">
                Faça login e agende consultas facilmente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-red-700 mb-4">
                <li>• Login seguro e protegido</li>
                <li>• Agendamento online de consultas</li>
                <li>• Acompanhamento de agendamentos</li>
                <li>• Histórico de consultas</li>
              </ul>
              <Link to="/login-pacientes">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Fazer Login - Paciente
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-red-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <UserCheck className="h-8 w-8 text-red-600" />
                <CardTitle className="text-red-800">Para Médicos</CardTitle>
              </div>
              <CardDescription className="text-red-600">
                Acesse e gerencie consultas e pacientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-red-700 mb-4">
                <li>• Visualização de todas as consultas</li>
                <li>• Gerenciamento de agendamentos</li>
                <li>• Cancelamento de consultas</li>
                <li>• Controle de disponibilidade</li>
              </ul>
              <Link to="/login-medicos">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Fazer Login - Médico
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md border border-red-100">
            <Calendar className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-red-800">Fácil Agendamento</h3>
            <p className="text-red-600">Interface intuitiva para marcar consultas</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-red-100">
            <UserCheck className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-red-800">Seguro</h3>
            <p className="text-red-600">Proteção total dos dados dos pacientes</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-red-100">
            <Stethoscope className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-red-800">Especializado</h3>
            <p className="text-red-600">Focado em atendimento pediátrico</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-red-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 ClínicaPed. Todos os direitos reservados.</p>
          <p className="text-red-200 mt-2">Sistema seguro de agendamento pediátrico</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
