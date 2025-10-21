import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Dashboard() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    const { data, error } = await supabase.from("tickets").select("*").order("fecha_ingreso", { ascending: false });
    if (error) console.error(error);
    else setTickets(data || []);
    setLoading(false);
  };

  const updateEstado = async (id: string, nuevoEstado: string) => {
    const { error } = await supabase.from("tickets").update({ estado: nuevoEstado }).eq("id", id);
    if (error) alert("Error al actualizar estado");
    else fetchTickets();
  };

  const deleteTicket = async (id: string) => {
    if (!confirm("¿Eliminar este ticket?")) return;
    const { error } = await supabase.from("tickets").delete().eq("id", id);
    if (error) alert("Error al eliminar");
    else fetchTickets();
  };

  useEffect(() => { fetchTickets(); }, []);

  if (loading) return <p className="text-center mt-10 text-gray-600">Cargando tickets...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Dashboard NexaHelp</h1>
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-3">Cliente</th>
              <th className="p-3">Equipo</th>
              <th className="p-3">Falla</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{t.nombre_cliente}</td>
                <td className="p-3">{t.equipo}</td>
                <td className="p-3">{t.falla}</td>
                <td className="p-3">
                  <select
                    value={t.estado}
                    onChange={(e) => updateEstado(t.id, e.target.value)}
                    className="border rounded-md p-1 text-sm"
                  >
                    <option>En revisión</option>
                    <option>Esperando pieza</option>
                    <option>En reparación</option>
                    <option>Listo para entregar</option>
                  </select>
                </td>
                <td className="p-3">
                  <button onClick={() => deleteTicket(t.id)} className="text-red-600 hover:underline">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}