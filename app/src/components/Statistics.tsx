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

    const StackedBarByAge = ({ data }: { data: any[] }) => (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rangoEdad" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="fiebre" stackId="a" fill="#ff7300" name="Fiebre" />
                <Bar dataKey="tos" stackId="a" fill="#387908" name="Tos" />
                <Bar dataKey="dolor" stackId="a" fill="#38abc8" name="Dolor" />
            </BarChart>
        </ResponsiveContainer>
    );

    const KPICards = ({ data }: { data: any }) => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="text-blue-600 font-medium">Total Consultas</h3>
                <p className="text-3xl font-bold text-blue-800">{data.totalConsultas}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="text-green-600 font-medium">Síntoma Principal</h3>
                <p className="text-3xl font-bold text-green-800">{data.topSymptom?.[0] || 'N/A'}</p>
                <p className="text-green-600">{data.topSymptom?.[1] || 0} casos</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <h3 className="text-purple-600 font-medium">Promedio Diario</h3>
                <p className="text-3xl font-bold text-purple-800">{data.promedioDiario}</p>
            </div>
        </div>
    );


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
            <StackedBarByAge data={[
                { rangoEdad: '0-18', fiebre: 5, tos: 3, dolor: 2 },
                { rangoEdad: '19-30', fiebre: 8, tos: 6, dolor: 4 },
                { rangoEdad: '31-45', fiebre: 10, tos: 7, dolor: 5 },
                { rangoEdad: '46-60', fiebre: 6, tos: 4, dolor: 3 },
                { rangoEdad: '60+', fiebre: 2, tos: 1, dolor: 1 }
            ]} />
            <KPICards data={{
                totalConsultas: datos.reduce((acc, curr) => acc + curr.cantidad, 0),
                topSymptom: datos.length > 0 ? [datos[0].nombre, datos[0].cantidad] : null,
                promedioDiario: (datos.reduce((acc, curr) => acc + curr.cantidad, 0) / 31).toFixed(2)
            }} />
        </div>
    );
};


export default EstadisticasFormularios;