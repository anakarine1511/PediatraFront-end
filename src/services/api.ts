
// Simulação das APIs mencionadas
// Em produção, estas funções fariam chamadas HTTP reais

export interface Consulta {
  id: number;
  pacienteId: number;
  pediatraId: number;
  data: string;
  horario: string;
  status: string;
  observacoes?: string;
}

export interface Pediatra {
  id: number;
  nome: string;
  crm: string;
  especialidade: string;
  email: string;
  telefone: string;
}

export interface Paciente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  endereco: string;
}

// Simulação de dados
const consultasMock: Consulta[] = [
  {
    id: 1,
    pacienteId: 1,
    pediatraId: 1,
    data: "2024-06-15",
    horario: "14:30",
    status: "Agendada",
    observacoes: "Consulta de rotina"
  }
];

const pediatrasMock: Pediatra[] = [
  {
    id: 1,
    nome: "Dr. João Silva",
    crm: "12345-SP",
    especialidade: "Pediatria Geral",
    email: "joao@clinicaped.com",
    telefone: "(11) 99999-9999"
  }
];

const pacientesMock: Paciente[] = [
  {
    id: 1,
    nome: "Ana Silva",
    email: "ana@email.com",
    telefone: "(11) 88888-8888",
    dataNascimento: "2015-03-15",
    endereco: "Rua das Flores, 123"
  }
];

// Simulação das APIs mencionadas no prompt
export const apiService = {
  // Consultas
  async getConsultas(): Promise<Consulta[]> {
    // GET /api/consultas
    return Promise.resolve(consultasMock);
  },

  async createConsulta(consulta: Omit<Consulta, 'id'>): Promise<Consulta> {
    // POST /api/consultas
    const newConsulta = { ...consulta, id: Date.now() };
    consultasMock.push(newConsulta);
    return Promise.resolve(newConsulta);
  },

  async deleteConsulta(id: number): Promise<void> {
    // DELETE /api/consultas/{id}
    const index = consultasMock.findIndex(c => c.id === id);
    if (index > -1) consultasMock.splice(index, 1);
    return Promise.resolve();
  },

  // Pediatras
  async getPediatras(): Promise<Pediatra[]> {
    // GET /api/pediatras
    return Promise.resolve(pediatrasMock);
  },

  async getPediatra(id: number): Promise<Pediatra | null> {
    // GET /api/pediatras/{id}
    const pediatra = pediatrasMock.find(p => p.id === id);
    return Promise.resolve(pediatra || null);
  },

  async createPediatra(pediatra: Omit<Pediatra, 'id'>): Promise<Pediatra> {
    // POST /api/pediatras
    const newPediatra = { ...pediatra, id: Date.now() };
    pediatrasMock.push(newPediatra);
    return Promise.resolve(newPediatra);
  },

  async updatePediatra(id: number, pediatra: Partial<Pediatra>): Promise<Pediatra | null> {
    // PUT /api/pediatras/{id}
    const index = pediatrasMock.findIndex(p => p.id === id);
    if (index > -1) {
      pediatrasMock[index] = { ...pediatrasMock[index], ...pediatra };
      return Promise.resolve(pediatrasMock[index]);
    }
    return Promise.resolve(null);
  },

  async deletePediatra(id: number): Promise<void> {
    // DELETE /api/pediatras/{id}
    const index = pediatrasMock.findIndex(p => p.id === id);
    if (index > -1) pediatrasMock.splice(index, 1);
    return Promise.resolve();
  },

  // Pacientes
  async getPacientes(): Promise<Paciente[]> {
    // GET /api/pacientes
    return Promise.resolve(pacientesMock);
  },

  async createPaciente(paciente: Omit<Paciente, 'id'>): Promise<Paciente> {
    // POST /api/pacientes
    const newPaciente = { ...paciente, id: Date.now() };
    pacientesMock.push(newPaciente);
    return Promise.resolve(newPaciente);
  },

  async updatePaciente(id: number, paciente: Partial<Paciente>): Promise<Paciente | null> {
    // PUT /api/pacientes/{id}
    const index = pacientesMock.findIndex(p => p.id === id);
    if (index > -1) {
      pacientesMock[index] = { ...pacientesMock[index], ...paciente };
      return Promise.resolve(pacientesMock[index]);
    }
    return Promise.resolve(null);
  },

  async deletePaciente(id: number): Promise<void> {
    // DELETE /api/pacientes/{id}
    const index = pacientesMock.findIndex(p => p.id === id);
    if (index > -1) pacientesMock.splice(index, 1);
    return Promise.resolve();
  }
};
