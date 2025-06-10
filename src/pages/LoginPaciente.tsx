
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Stethoscope } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const LoginPaciente = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    senha: ""
  });
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui integraria com a API de autenticação
    console.log("Login paciente:", loginData);
    toast({
      title: "Login realizado!",
      description: "Bem-vindo à área do paciente.",
    });
    navigate("/pacientes");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 bg-red-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <Stethoscope className="h-6 w-6" />
              <h1 className="text-xl font-bold">ClínicaPed</h1>
            </Link>
            <Link to="/login-medicos">
              <Button variant="outline" className="text-red-600 border-white hover:bg-red-50">
                Área Médica
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="w-full max-w-md mx-auto px-4 mt-20">
        <Card className="border-red-200">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Users className="h-12 w-12 text-red-600" />
            </div>
            <CardTitle className="text-red-800">Login do Paciente</CardTitle>
            <CardDescription className="text-red-600">
              Acesse sua área para agendar e acompanhar consultas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-red-800">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="border-red-200 focus:ring-red-500 focus:border-red-500"
                  placeholder="seu.email@exemplo.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="senha" className="text-red-800">Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  value={loginData.senha}
                  onChange={(e) => setLoginData({...loginData, senha: e.target.value})}
                  className="border-red-200 focus:ring-red-500 focus:border-red-500"
                  placeholder="Sua senha"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                Entrar
              </Button>

              <div className="text-center mt-4">
                <p className="text-red-600 text-sm">
                  Não tem conta?{" "}
                  <Link to="/pacientes" className="text-red-800 font-semibold hover:underline">
                    Cadastre-se aqui
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/">
            <Button variant="outline" className="text-red-600 border-red-200">
              Voltar ao Início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPaciente;
