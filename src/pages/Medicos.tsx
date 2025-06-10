import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Stethoscope, Calendar, Users, Trash2, UserCheck, Clock, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Consulta } from "./Pacientes";

// Declaração global para TypeScript
declare global {
  interface Window {
    consultasGlobais?: Consulta[];
  }
}

const Medicos = () => {
  const [activeTab, setActiveTab] = useState("consultas");
  const [pediatraData, setPediatraData] = useState({
    nome: "",
    email: "",
    crm: "",
    especialidade: "",
    telefone: ""
  });

  // Estados para controlar consultas e pediatras
  const [consultas, setConsultas] = useState([
    { 
      id: 1, 
      paciente: "Ana Silva", 
      data: "2024-06-15", 
      horario: "14:30", 
      status: "Agendada",
      observacoes: "Consulta de rotina",
      pediatra: "Dr. João Silva"
    },
    { 
      id: 2, 
      paciente: "João Santos", 
      data: "2024-06-15", 
      horario: "15:00", 
      status: "Confirmada",
      observacoes: "Exame pediátrico geral",
      pediatra: "Dra. Maria Santos"
    },
    { 
      id: 3, 
      paciente: "Maria Costa", 
      data: "2024-06-16", 
      horario: "10:00", 
      status: "Agendada",
      observacoes: "Vacinação",
      pediatra: "Dr. João Silva"
    }
  ]);

  const [pediatras, setPediatras] = useState([
    { 
      id: 1, 
      nome: "Dr. João Silva", 
      crm: "12345-SP", 
      especialidade: "Pediatria Geral",
      email: "joao@clinicaped.com"
    },
    { 
      id: 2, 
      nome: "Dra. Maria Santos", 
      crm: "67890-SP", 
      especialidade: "Neonatologia",
      email: "maria@clinicaped.com"
    }
  ]);

  // Estados para edição de pediatra
  const [editingPediatra, setEditingPediatra] = useState(null);
  const [editPediatraData, setEditPediatraData] = useState({
    nome: "",
    email: "",
    crm: "",
    especialidade: ""
  });

  const handleCancelConsulta = (id: number) => {
    // Remove a consulta da lista
    setConsultas(prev => prev.filter(consulta => consulta.id !== id));
    console.log("Cancelando consulta:", id);
    toast({
      title: "Consulta cancelada",
      description: "A consulta foi cancelada com sucesso.",
      variant: "destructive"
    });
  };

  const handleEditPediatra = (pediatra: any) => {
    setEditingPediatra(pediatra.id);
    setEditPediatraData({
      nome: pediatra.nome,
      email: pediatra.email,
      crm: pediatra.crm,
      especialidade: pediatra.especialidade
    });
  };

  const handleSaveEditPediatra = () => {
    setPediatras(prev => prev.map(p => 
      p.id === editingPediatra 
        ? { ...p, ...editPediatraData }
        : p
    ));
    setEditingPediatra(null);
    setEditPediatraData({
      nome: "",
      email: "",
      crm: "",
      especialidade: ""
    });
    toast({
      title: "Pediatra atualizado!",
      description: "As informações foram atualizadas com sucesso.",
    });
  };

  const handleRemovePediatra = (id: number) => {
    setPediatras(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Pediatra removido",
      description: "O pediatra foi removido do sistema.",
      variant: "destructive"
    });
  };

  const handleCadastroPediatra = (e: React.FormEvent) => {
    e.preventDefault();
    // Adiciona novo pediatra à lista
    const novoPediatra = {
      id: Math.max(...pediatras.map(p => p.id)) + 1,
      ...pediatraData
    };
    setPediatras(prev => [...prev, novoPediatra]);
    setPediatraData({
      nome: "",
      email: "",
      crm: "",
      especialidade: "",
      telefone: ""
    });
    console.log("Cadastrando pediatra:", pediatraData);
    toast({
      title: "Pediatra cadastrado!",
      description: "O cadastro foi realizado com sucesso.",
    });
  };

  // Verificar se existem novas consultas marcadas por pacientes
  useEffect(() => {
    // Verificar se existem consultas globais
    if (window.consultasGlobais && window.consultasGlobais.length > 0) {
      // Filtrar apenas consultas que ainda não estão na lista local
      const novasConsultas = window.consultasGlobais.filter(
        consultaGlobal => !consultas.some(
          consultaLocal => consultaLocal.id === consultaGlobal.id
        )
      );

      // Adicionar novas consultas à lista local
      if (novasConsultas.length > 0) {
        setConsultas(prevConsultas => [...prevConsultas, ...novasConsultas]);
        
        // Notificar o usuário sobre novas consultas
        if (novasConsultas.length === 1) {
          toast({
            title: "Nova consulta",
            description: `Uma nova consulta foi agendada por ${novasConsultas[0].paciente}.`,
          });
        } else {
          toast({
            title: "Novas consultas",
            description: `${novasConsultas.length} novas consultas foram agendadas.`,
          });
        }
      }
    }
  }, []); // Executar apenas uma vez ao montar o componente

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      {/* Header */}
      <header className="bg-red-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <Stethoscope className="h-6 w-6" />
              <h1 className="text-xl font-bold">Área Médica</h1>
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
            Todas as Consultas
          </Button>
          <Button
            variant={activeTab === "pediatras" ? "default" : "outline"}
            onClick={() => setActiveTab("pediatras")}
            className={activeTab === "pediatras" ? "bg-red-600 hover:bg-red-700" : "text-red-600 border-red-200"}
          >
            <Users className="h-4 w-4 mr-2" />
            Pediatras
          </Button>
          <Button
            variant={activeTab === "cadastro" ? "default" : "outline"}
            onClick={() => setActiveTab("cadastro")}
            className={activeTab === "cadastro" ? "bg-red-600 hover:bg-red-700" : "text-red-600 border-red-200"}
          >
            <UserCheck className="h-4 w-4 mr-2" />
            Cadastrar Pediatra
          </Button>
        </div>

        {/* Todas as Consultas */}
        {activeTab === "consultas" && (
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800">Gerenciar Consultas</CardTitle>
              <CardDescription className="text-red-600">
                Visualize e gerencie todas as consultas agendadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {consultas.map((consulta) => (
                  <div key={consulta.id} className="p-4 border border-red-100 rounded-lg bg-white">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="font-semibold text-red-800">{consulta.paciente}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            consulta.status === "Confirmada" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {consulta.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-red-600 mb-2">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {consulta.data}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {consulta.horario}
                          </span>
                        </div>
                        <p className="text-red-600 text-sm">{consulta.observacoes}</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelConsulta(consulta.id)}
                        className="ml-4"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de Pediatras */}
        {activeTab === "pediatras" && (
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800">Pediatras Cadastrados</CardTitle>
              <CardDescription className="text-red-600">
                Lista de todos os pediatras da clínica
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {pediatras.map((pediatra) => (
                  <div key={pediatra.id} className="p-4 border border-red-100 rounded-lg bg-white">
                    <h3 className="font-semibold text-red-800 mb-2">{pediatra.nome}</h3>
                    <div className="space-y-1 text-red-600 text-sm">
                      <p><strong>CRM:</strong> {pediatra.crm}</p>
                      <p><strong>Especialidade:</strong> {pediatra.especialidade}</p>
                      <p><strong>Email:</strong> {pediatra.email}</p>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 border-red-200"
                            onClick={() => handleEditPediatra(pediatra)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="border-red-200">
                          <DialogHeader>
                            <DialogTitle className="text-red-800">Editar Pediatra</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="edit-nome" className="text-red-800">Nome Completo</Label>
                              <Input
                                id="edit-nome"
                                value={editPediatraData.nome}
                                onChange={(e) => setEditPediatraData({...editPediatraData, nome: e.target.value})}
                                className="border-red-200 focus:ring-red-500 focus:border-red-500"
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-email" className="text-red-800">Email</Label>
                              <Input
                                id="edit-email"
                                type="email"
                                value={editPediatraData.email}
                                onChange={(e) => setEditPediatraData({...editPediatraData, email: e.target.value})}
                                className="border-red-200 focus:ring-red-500 focus:border-red-500"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="edit-crm" className="text-red-800">CRM</Label>
                                <Input
                                  id="edit-crm"
                                  value={editPediatraData.crm}
                                  onChange={(e) => setEditPediatraData({...editPediatraData, crm: e.target.value})}
                                  className="border-red-200 focus:ring-red-500 focus:border-red-500"
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-especialidade" className="text-red-800">Especialidade</Label>
                                <Input
                                  id="edit-especialidade"
                                  value={editPediatraData.especialidade}
                                  onChange={(e) => setEditPediatraData({...editPediatraData, especialidade: e.target.value})}
                                  className="border-red-200 focus:ring-red-500 focus:border-red-500"
                                />
                              </div>
                            </div>
                            <Button 
                              onClick={handleSaveEditPediatra} 
                              className="w-full bg-red-600 hover:bg-red-700"
                            >
                              Salvar Alterações
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleRemovePediatra(pediatra.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remover
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cadastro de Pediatra */}
        {activeTab === "cadastro" && (
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800">Cadastrar Novo Pediatra</CardTitle>
              <CardDescription className="text-red-600">
                Adicione um novo pediatra ao sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCadastroPediatra} className="space-y-4">
                <div>
                  <Label htmlFor="nome" className="text-red-800">Nome Completo</Label>
                  <Input
                    id="nome"
                    value={pediatraData.nome}
                    onChange={(e) => setPediatraData({...pediatraData, nome: e.target.value})}
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
                      value={pediatraData.email}
                      onChange={(e) => setPediatraData({...pediatraData, email: e.target.value})}
                      className="border-red-200 focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone" className="text-red-800">Telefone</Label>
                    <Input
                      id="telefone"
                      value={pediatraData.telefone}
                      onChange={(e) => setPediatraData({...pediatraData, telefone: e.target.value})}
                      className="border-red-200 focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="crm" className="text-red-800">CRM</Label>
                    <Input
                      id="crm"
                      value={pediatraData.crm}
                      onChange={(e) => setPediatraData({...pediatraData, crm: e.target.value})}
                      className="border-red-200 focus:ring-red-500 focus:border-red-500"
                      placeholder="12345-SP"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="especialidade" className="text-red-800">Especialidade</Label>
                    <Input
                      id="especialidade"
                      value={pediatraData.especialidade}
                      onChange={(e) => setPediatraData({...pediatraData, especialidade: e.target.value})}
                      className="border-red-200 focus:ring-red-500 focus:border-red-500"
                      placeholder="Pediatria Geral"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  Cadastrar Pediatra
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Medicos;
