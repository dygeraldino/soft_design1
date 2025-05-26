
export interface Question {
  id: string;
  text: string;
  field: string; // clave con la que se guardará la respuesta
  type: 'text' | 'number' | 'choice';
  options?: string[]; // si es tipo 'choice'
}

export const questions: Question[] = [
  {
    id: 'q1',
    text: '¿Cuál es el nombre del paciente?',
    field: 'nombre',
    type: 'text',
  },
  {
    id: 'q2',
    text: '¿Cuál es la edad del paciente?',
    field: 'edad',
    type: 'number',
  },
  {
    id: 'q3',
    text: '¿Cuál es el género del paciente?',
    field: 'genero',
    type: 'choice',
    options: ['Masculino', 'Femenino', 'Otro'],
  },
  {
    id: 'q4',
    text: '¿Qué síntomas presenta?',
    field: 'sintomas',
    type: 'text',
  },
  {
    id: 'q5',
    text: '¿Tiene antecedentes médicos?',
    field: 'antecedentes',
    type: 'text',
  },
];
