
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "../../styles/dashboard.css";


export default function GraficoCalorias({ registros }) {
  // ==========================================
  // DATOS PARA EL GRÁFICO
  // ==========================================
  const data = registros
    .map((item) => {
      return {
        fecha: new Date(item.fecha).toLocaleDateString("es-CR", {
          day: "2-digit",
          month: "2-digit",
        }),
        calorias: Number(item.total_calorias || 0),
      };
    })
    .reverse(); 

  return (
    <div className="tarjeta tarjeta-grafico">
      <h3>Calorías Consumidas</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

          <XAxis
            dataKey="fecha"
            tick={{ fontSize: 12 }}
            stroke="#666"
          />

          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#666"
            width={40}
          />

          <Tooltip
            formatter={(value) => `${value} kcal`}
            labelStyle={{ color: "#333", fontWeight: "bold" }}
          />

          <Line
            type="monotone"
            dataKey="calorias"
            stroke="#ff6b6b"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
