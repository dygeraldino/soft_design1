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

export default KPICards;