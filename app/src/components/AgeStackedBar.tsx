import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AgeStackedBar = ({ data }: { data: any[] }) => {
  // Extraer nombres de síntomas únicos para las barras
  const symptoms = Array.from(
    new Set(
      data.flatMap(item => 
        Object.keys(item).filter(key => key !== 'rangoEdad')
      )
    )
  );

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Distribución por edad</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="rangoEdad" />
            <YAxis />
            <Tooltip />
            <Legend />
            {symptoms.map((symptom, index) => (
              <Bar 
                key={symptom}
                dataKey={symptom}
                stackId="a"
                fill={colors[index % colors.length]}
                name={symptom}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AgeStackedBar;