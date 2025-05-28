import { useEffect, useState } from 'react';
import { supabase } from "../lib/SupabaseClient"; // Asegúrate que la ruta sea correcta
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Tipos para los datos
type SymptomData = {
  id_sintomas: number;
  nombre_sintoma: string;
};

type FormData = {
  id_formulario: number;
  fecha: string;
};

type JoinedData = {
  id_formulario: number;
  sintomas: SymptomData;
  formularios: FormData;
};

type ChartData = {
  nombre: string;
  cantidad: number;
};

const EstadisticasFormularios = () => {
  const [datos, setDatos] = useState<ChartData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSintomasFrecuentes = async () => {
      try {
        setLoading(true);
        
        // Consulta corregida
        const { data, error } = await supabase
          .from('formulario_sintoma')
          .select(`
            id_formulario,
            sintomas: id_sintomas (id_sintomas, nombre_sintoma),
            formularios: id_formulario (id_formulario, fecha)
          `)
          .gte('formularios.fecha', '2025-05-01')
          .lte('formularios.fecha', '2025-05-31');

        if (error) throw error;

        // Tipamos la data recibida
        const joinedData = data as unknown as JoinedData[];

        const conteo: Record<string, number> = {};
        joinedData.forEach((item) => {
          const nombre = item.sintomas?.nombre_sintoma;
          if (nombre) {
            conteo[nombre] = (conteo[nombre] || 0) + 1;
          }
        });

        const datosFormateados: ChartData[] = Object.entries(conteo).map(([nombre, cantidad]) => ({
          nombre,
          cantidad
        }));

        setDatos(datosFormateados);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchSintomasFrecuentes();
  }, []);

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Síntomas más frecuentes (Mayo 2025)</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      {!error && datos.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={datos}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cantidad" fill="#8884d8" name="Frecuencia" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No hay datos disponibles en este periodo.</p>
      )}
    </div>
  );
};

export default EstadisticasFormularios;