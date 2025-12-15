

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../../styles/dashboard.css";


export default function GraficoMacros({ registros }) {
  
  // CÁLCULO TOTALES DE MACROS DEL DÍA
  
  const totales = registros.reduce(
    (acc, item) => {
      acc.carbohidratos += Number(item.total_carbohidratos || 0);
      acc.proteinas += Number(item.total_proteinas || 0);
      acc.grasas += Number(item.total_grasas || 0);
      return acc;
    },
    { carbohidratos: 0, proteinas: 0, grasas: 0 }
  );

  
  // FORMATO DE DATOS PARA RECHARTS
 
  const data = [
    {
      name: "Carbohidratos",
      valor: totales.carbohidratos,
    },
    {
      name: "Proteínas",
      valor: totales.proteinas,
    },
    {
      name: "Grasas",
      valor: totales.grasas,
    },
  ];

  return (
    <div className="tarjeta tarjeta-grafico">
      <h3>Distribución de Macros</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            stroke="#444"
          />

          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#444"
            width={40}
          />

          <Tooltip
            formatter={(value) => `${value} g`}
            labelStyle={{ fontWeight: "bold" }}
          />

          <Bar
            dataKey="valor"
            fill="#4dabf7"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
