import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/SupabaseClient";

interface Props {
  steps: Record<string, any>;
}

const symptomIds = {
  fiebre: "Fiebre",
  tos: "Tos",
  dolorDeCabeza: "Dolor de cabeza",
  dolorDeGarganta: "Dolor de garganta",
  dolorMuscular: "Dolor muscular",
  congestionNasal: "Congestión nasal",
  nausea: "Náusea",
  diarrea: "Diarrea",
  fatiga: "Fatiga",
};

const SaveForm: React.FC<Props> = ({ steps }) => {
  const { session } = useAuth();
  const [status, setStatus] = useState<"saving" | "error" | "done">("saving");

  useEffect(() => {
    const save = async () => {
      try {
        // 1. Crear paciente
        const { data: paciente, error: err1 } = await supabase
          .from("paciente")
          .insert({
            nombre: steps.leerNombre.value,
            edad: parseInt(steps.leerEdad.value, 10),
            sintoma: "", // opcional, o podrías concatenar los síntomas
          })
          .select("*")
          .single();
        if (err1 || !paciente) throw err1 || new Error("No paciente");

        // 2. Crear formulario
        const today = new Date().toISOString().split("T")[0];
        const { data: formulario, error: err2 } = await supabase
          .from("formulario")
          .insert({
            fecha: today,
            detalles_consulta: steps.leerDetallesConsulta.value,
            tiempo_sintoma: steps.leerTiempoConsulta.value,
            id_user: session!.user.id,
            id_paciente: paciente.id_paciente,
          })
          .select("*")
          .single();
        if (err2 || !formulario) throw err2 || new Error("No formulario");

        // 3. Sintomas M2M
        for (const [stepKey, label] of Object.entries(symptomIds)) {
          if (steps[stepKey].value === "Si") {
            // 3.1 obtener o crear sintoma
            let { data: sintomaRow, error: err3 } = await supabase
              .from("sintoma")
              .select("*")
              .eq("nombre_sintoma", label)
              .single();
            if (err3 || !sintomaRow) {
              const { data, error: err4 } = await supabase
                .from("sintoma")
                .insert({ nombre_sintoma: label, detalles_sintoma: "" })
                .select("*")
                .single();
              if (err4 || !data) throw err4 || new Error("No sintoma creado");
              sintomaRow = data;
            }
            // 3.2 vincular
            const { error: err5 } = await supabase
              .from("formulario_sintoma")
              .insert({
                id_formulario: formulario.id_formulario,
                id_sintomas: sintomaRow.id_sintomas,
              });
            if (err5) throw err5;
          }
        }

        // 4. Antecedentes (si aplica)
        if (steps.leerAntecedentes && steps.leerAntecedentes.value) {
          const { data: ant, error: err6 } = await supabase
            .from("antecedente")
            .insert({ detalles_antecedente: steps.leerAntecedentes.value })
            .select("*")
            .single();
          if (err6 || !ant) throw err6 || new Error("No antecedente");

          const { error: err7 } = await supabase
            .from("formulario_antecedente")
            .insert({
              id_formulario: formulario.id_formulario,
              id_antecedente: ant.id_antecedente,
            });
          if (err7) throw err7;
        }

        setStatus("done");
      } catch (e) {
        console.error(e);
        setStatus("error");
      }
    };

    save();
  }, [steps, session]);

  if (status === "saving") return <div>Guardando datos…</div>;
  if (status === "error")
    return (
      <div style={{ color: "red" }}>Error al guardar. Intenta de nuevo.</div>
    );
  return <div>Datos guardados correctamente 🎉</div>;
};

export default SaveForm;
