
/// <reference types="vite/client" />

import { Consulta } from "./pages/Pacientes";

declare global {
  interface Window {
    consultasGlobais?: Consulta[];
  }
}
