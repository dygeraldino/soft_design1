import React, { Component } from "react";
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import SaveForm from './SaveForm';

const DiseñoChat = {
  background: '#f5f8fb',
  fontFamily: 'Arial, sans-serif',
  headerBgColor: '#00bcd4',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#00bcd4',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

export default class MainChatBot extends Component {
  validarNombre = (value) => {
    if (value.length > 100) {
      return 'El nombre debe tener máximo 100 caracteres.';
    }
    if (/\d/.test(value)) {
      return 'El nombre no puede contener números.';
    }
    if (value.charAt(0) !== value.charAt(0).toUpperCase()) {
      return 'El nombre debe comenzar con mayúscula.';
    }
    return true;
  };

  validarEdad = (value) => {
    if (!/\d/.test(value)) {
      return "No contiene números";
    }
    return true;
  }

  render() {
    return (
      <div>
        <ThemeProvider theme={DiseñoChat}>
          <ChatBot
            steps={[
              {
                id: 'intro',
                message: 'Bienvenido Doctor/a. Creemos juntos el formulario de su paciente',
                trigger: 'ingresarNombre',
              },
              {
                id: 'ingresarNombre',
                message: '¿Cuál es el nombre del paciente?',
                trigger: 'leerNombre',
              },
              {
                id: 'leerNombre',
                user: true,
                validator: this.validarNombre,
                trigger: 'ingresarEdad',
              },
              {
                id: 'ingresarEdad',
                message: '¿Cuál es la edad del paciente?',
                trigger: 'leerEdad',
              },
              {
                id: 'leerEdad',
                user: true,
                validator: this.validarEdad,
                trigger: 'ingresarSexo',
              },
              {
                id: 'ingresarSexo',
                message: '¿Cuál es el sexo del paciente?',
                trigger: 'selectSexo',
              },
              {
                id: 'selectSexo',
                options: [
                  { value: 'H', label: 'Hombre', trigger: 'ingresarDetallesConsulta' },
                  { value: 'M', label: 'Mujer', trigger: 'ingresarDetallesConsulta' },
                  { value: 'O', label: 'Otro', trigger: 'ingresarDetallesConsulta' },
                ],
              },
              {
                id: 'ingresarDetallesConsulta',
                message: '¿Cuál es el motivo de la consulta? Añade los detalles que consideres necesarios.',
                trigger: 'leerDetallesConsulta',
              },
              {
                id: 'leerDetallesConsulta',
                user: true,
                trigger: 'ingresarTiempoConsulta',
              },
              {
                id: 'ingresarTiempoConsulta',
                message: '¿Desde hace cuánto tiempo el paciente presenta síntomas?',
                trigger: 'leerTiempoConsulta',
              },
              {
                id: 'leerTiempoConsulta',
                user: true,
                trigger: 'ingresarSintomasConsulta',
              },
              {
                id: 'ingresarSintomasConsulta',
                message: '¿Cuál de los siguientes síntomas presenta el paciente?',
                trigger: 'preguntarFiebre',
              },
              {
                id: 'preguntarFiebre',
                message: '¿Fiebre?',
                trigger: 'fiebre',
              },
              {
                id: 'fiebre',
                options: [
                  { value: 'Si', label: 'Si', trigger: 'preguntarTos' },
                  { value: 'No', label: 'No', trigger: 'preguntarTos' },
                ],
              },
              {
                id: 'preguntarTos',
                message: '¿Tos?',
                trigger: 'tos',
              },
              {
                id: 'tos',
                options: [
                  { value: 'Si', label: 'Si', trigger: 'preguntarDolorDeCabeza' },
                  { value: 'No', label: 'No', trigger: 'preguntarDolorDeCabeza' },
                ],
              },
              {
                id: 'preguntarDolorDeCabeza',
                message: '¿Dolor de cabeza?',
                trigger: 'dolorDeCabeza',
              },
              {
                id: 'dolorDeCabeza',
                options: [
                  { value: 'Si', label: 'Si', trigger: 'preguntarDolorDeGarganta' },
                  { value: 'No', label: 'No', trigger: 'preguntarDolorDeGarganta' },
                ],
              },
              {
                id: 'preguntarDolorDeGarganta',
                message: '¿Dolor de garganta?',
                trigger: 'dolorDeGarganta',
              },
              {
                id: 'dolorDeGarganta',
                options: [
                  { value: 'Si', label: 'Si', trigger: 'preguntarDolorMuscular' },
                  { value: 'No', label: 'No', trigger: 'preguntarDolorMuscular' },
                ],
              },
              {
                id: 'preguntarDolorMuscular',
                message: '¿Dolor muscular?',
                trigger: 'dolorMuscular',
              },
              {
                id: 'dolorMuscular',
                options: [
                  { value: 'Si', label: 'Si', trigger: 'preguntarCongestionNasal' },
                  { value: 'No', label: 'No', trigger: 'preguntarCongestionNasal' },
                ],
              },
              {
                id: 'preguntarCongestionNasal',
                message: '¿Congestión nasal?',
                trigger: 'congestionNasal',
              },
              {
                id: 'congestionNasal',
                options: [
                  { value: 'Si', label: 'Si', trigger: 'preguntarNausea' },
                  { value: 'No', label: 'No', trigger: 'preguntarNausea' },
                ],
              },
              {
                id: 'preguntarNausea',
                message: '¿Náusea?',
                trigger: 'nausea',
              },
              {
                id: 'nausea',
                options: [
                  { value: 'Si', label: 'Si', trigger: 'preguntarDiarrea' },
                  { value: 'No', label: 'No', trigger: 'preguntarDiarrea' },
                ],
              },
              {
                id: 'preguntarDiarrea',
                message: '¿Diarrea?',
                trigger: 'diarrea',
              },
              {
                id: 'diarrea',
                options: [
                  { value: 'Si', label: 'Si', trigger: 'preguntarFatiga' },
                  { value: 'No', label: 'No', trigger: 'preguntarFatiga' },
                ],
              },
              {
                id: 'preguntarFatiga',
                message: '¿Fatiga?',
                trigger: 'fatiga',
              },
              {
                id: 'fatiga',
                options: [
                  { value: 'Si', label: 'Si', trigger: 'ingresarAntecedentes' },
                  { value: 'No', label: 'No', trigger: 'ingresarAntecedentes' },
                ],
              },
              {
                id: 'ingresarAntecedentes',
                message: '¿El paciente tiene antecedentes médicos relevantes?',
                trigger: 'antecedentes',
              },
              {
                id: 'antecedentes',
                options: [
                  { value: 'Si', label: 'Si', trigger: 'preguntarAntecedentes' },
                  { value: 'No', label: 'No', trigger: 'finCHAT' },
                ],
              },
              {
                id: 'preguntarAntecedentes',
                message: 'Describa los antecedentes del paciente.',
                trigger: 'leerAntecedentes',
              },
              {
                id: 'leerAntecedentes',
                user: true,
                trigger: 'finCHAT',
              },
              {
                id: 'finCHAT',
                message: "Con esto hemos terminado el formulario del paciente. ¡Voy a guardar los datos!.",
                trigger: 'guardarDatos'
              },
              {
                id: 'guardarDatos',
                component: <SaveForm steps={undefined} />, // steps serán inyectados automáticamente
                asMessage: false,
                trigger: 'next',
              },
              {
                id: 'next',
                message: "¿Deseas continuar con otro paciente?",
                trigger: 'pregunta',
                
              },
              {
                id: 'pregunta',
                options: [
                  { value: 'Si', label: 'Si', trigger: 'intro' },
                  { value: 'No', label: 'No', trigger: 'despedida' },
                ],
              },
              {
                id: 'despedida',
                message: "Gracias por usar nuestro chatbot. ¡Hasta luego!",
                end: true
              }
            ]}
          />
        </ThemeProvider>
      </div>
    );
  }
}
