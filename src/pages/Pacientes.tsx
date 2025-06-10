import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Users, Plus, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Interface compartilhada para uso em ambas as páginas
export interface Consulta {
  id: number;
  pediatra: string;
  data: string;
  horario: string;
  status: string;
  paciente?: string;
  observacoes?: string;
}

const Pacientes = () => {
  const [activeTab, setActiveTab] = useState("consultas");
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    endereco: ""
  });

  const [consultaData, setConsultaData] = useState({
    pediatraId: "",
    data: "",
    horario: "",
    observacoes: ""
  });

  // Estado para armazenar consultas
  const [consultas, setConsultas] = useState<Consulta[]>([
    { id: 1, pediatra: "Dr. João Silva", data: "2024-06-15", horario: "14:30", status: "Agendada" },
    { id: 2, pediatra: "Dra. Maria Santos", data: "2024-06-20", horario: "10:00", status: "Confirmada" }
  ]);

  const pediatras = [
    { id: 1, nome: "Dr. João Silva", especialidade: "Pediatria Geral" },
    { id: 2, nome: "Dra. Maria Santos", especialidade: "Neonatologia" },
    { id: 3, nome: "Dr. Pedro Costa", especialidade: "Cardiologia Pediátrica" }
  ];

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui integraria com a API POST /api/pacientes
    console.log("Cadastrando paciente:", formData);
    toast({
      title: "Cadastro realizado!",
      description: "Seu cadastro foi realizado com sucesso.",
    });
  };

  const handleAgendamento = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Encontrar o pediatra selecionado
    const pediatraSelecionado = pediatras.find(p => p.id.toString() === consultaData.pediatraId);
    
    if (!pediatraSelecionado) {
      toast({
        title: "Erro!",
        description: "Por favor, selecione um pediatra.",
        variant: "destructive"
      });
      return;
    }

    // Criar nova consulta
    const novaConsulta: Consulta = {
      id: Date.now(), // ID temporário
      pediatra: pediatraSelecionado.nome,
      data: consultaData.data,
      horario: consultaData.horario,
      status: "Agendada",
      paciente: "Paciente Atual", // Normalmente seria o nome do paciente logado
      observacoes: consultaData.observacoes
    };

    // Adicionar à lista de consultas
    setConsultas(prev => [...prev, novaConsulta]);

    // Aqui integraria com a API POST /api/consultas
    console.log("Agendando consulta:", consultaData);
    
    // Adicionar à lista global de consultas (simulando integração com backend)
    // Em uma aplicação real, isso seria feito através de uma API
    if (window.consultasGlobais) {
      window.consultasGlobais = [...window.consultasGlobais, novaConsulta];
    } else {
      window.consultasGlobais = [novaConsulta];
    }
    
    // Limpar formulário
    setConsultaData({
      pediatraId: "",
      data: "",
      horario: "",
      observacoes: ""
    });

    // Mudar para aba de consultas para mostrar a nova consulta
    setActiveTab("consultas");

    toast({
      title: "Consulta agendada!",
      description: "Sua consulta foi agendada com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      {/* Header */}
      <header className="bg-red-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <Users className="h-6 w-6" />
              <h1 className="text-xl font-bold">Área do Paciente</h1>
            </Link>
            <Link to="/">
              <Button variant="outline" className="text-red-600 border-white hover:bg-red-50">
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8">
          <Button
            variant={activeTab === "consultas" ? "default" : "outline"}
            onClick={() => setActiveTab("consultas")}
            className={activeTab === "consultas" ? "bg-red-600 hover:bg-red-700" : "text-red-600 border-red-200"}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Minhas Consultas
          </Button>
          <Button
            variant={activeTab === "agendar" ? "default" : "outline"}
            onClick={() => setActiveTab("agendar")}
            className={activeTab === "agendar" ? "bg-red-600 hover:bg-red-700" : "text-red-600 border-red-200"}
          >
            <Plus className="h-4 w-4 mr-2" />
            Agendar Consulta
          </Button>
          <Button
            variant={activeTab === "cadastro" ? "default" : "outline"}
            onClick={() => setActiveTab("cadastro")}
            className={activeTab === "cadastro" ? "bg-red-600 hover:bg-red-700" : "text-red-600 border-red-200"}
          >
            <User className="h-4 w-4 mr-2" />
            Meu Cadastro
          </Button>
        </div>

        {/* Minhas Consultas */}
        {activeTab === "consultas" && (
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800">Minhas Consultas</CardTitle>
              <CardDescription className="text-red-600">
                Acompanhe suas consultas agendadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {consultas.length === 0 ? (
                  <p className="text-red-600 text-center py-8">
                    Nenhuma consulta agendada ainda.
                  </p>
                ) : (
                  consultas.map((consulta) => (
                    <div key={consulta.id} className="p-4 border border-red-100 rounded-lg bg-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-red-800">{consulta.pediatra}</h3>
                          <div className="flex items-center space-x-4 text-red-600 mt-2">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {consulta.data}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {consulta.horario}
                            </span>
                          </div>
                          {consulta.observacoes && (
                            <p className="text-sm text-red-500 mt-2">
                              <strong>Observações:</strong> {consulta.observacoes}
                            </p>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          consulta.status === "Confirmada" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {consulta.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Agendar Consulta */}
        {activeTab === "agendar" && (
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800">Agendar Nova Consulta</CardTitle>
              <CardDescription className="text-red-600">
                Escolha um pediatra e horário disponível
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAgendamento} className="space-y-4">
                <div>
                  <Label htmlFor="pediatra" className="text-red-800">Pediatra</Label>
                  <select 
                    id="pediatra"
                    className="w-full mt-1 p-2 border border-red-200 rounded-md focus:ring-red-500 focus:border-red-500"
                    value={consultaData.pediatraId}
                    onChange={(e) => setConsultaData({...consultaData, pediatraId: e.target.value})}
                    required
                  >
                    <option value="">Selecione um pediatra</option>
                    {pediatras.map((pediatra) => (
                      <option key={pediatra.id} value={pediatra.id.toString()}>
                        {pediatra.nome} - {pediatra.especialidade}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="data" className="text-red-800">Data</Label>
                    <Input
                      id="data"
                      type="date"
                      value={consultaData.data}
                      onChange={(e) => setConsultaData({...consultaData, data: e.target.value})}
                      className="border-red-200 focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="horario" className="text-red-800">Horário</Label>
                    <Input
                      id="horario"
                      type="time"
                      value={consultaData.horario}
                      onChange={(e) => setConsultaData({...consultaData, horario: e.target.value})}
                      className="border-red-200 focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="observacoes" className="text-red-800">Observações</Label>
                  <textarea
                    id="observacoes"
                    className="w-full mt-1 p-2 border border-red-200 rounded-md focus:ring-red-500 focus:border-red-500"
                    rows={3}
                    value={consultaData.observacoes}
                    onChange={(e) => setConsultaData({...consultaData, observacoes: e.target.value})}
                    placeholder="Descreva o motivo da consulta ou observações importantes"
                  />
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  Agendar Consulta
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Cadastro */}
        {activeTab === "cadastro" && (
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800">Meu Cadastro</CardTitle>
              <CardDescription className="text-red-600">
                Mantenha seus dados atualizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCadastro} className="space-y-4">
                <div>
                  <Label htmlFor="nome" className="text-red-800">Nome Completo</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="border-red-200 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-red-800">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="border-red-200 focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone" className="text-red-800">Telefone</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                      className="border-red-200 focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="dataNascimento" className="text-red-800">Data de Nascimento</Label>
                  <Input
                    id="dataNascimento"
                    type="date"
                    value={formData.dataNascimento}
                    onChange={(e) => setFormData({...formData, dataNascimento: e.target.value})}
                    className="border-red-200 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="endereco" className="text-red-800">Endereço</Label>
                  <Input
                    id="endereco"
                    value={formData.endereco}
                    onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                    className="border-red-200 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  Salvar Dados
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Pacientes;
