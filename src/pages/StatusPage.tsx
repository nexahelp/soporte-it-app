import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function StatusPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchTicket = async () => {
      const { data, error } = await supabase.from("tickets").select("*").eq("id", id).single();
      if (error || !data) setErrorMsg("Ticket no encontrado o eliminado.");
      else setTicket(data);
    };
    fetchTicket();
  }, [id]);

  if (errorMsg) return <p className="text-center mt-10 text-red-600">{errorMsg}</p>;
  if (!ticket) return <p className="text-center mt-10 text-gray-600">Cargando información...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Estatus del Equipo</h1>
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <p><strong>Cliente:</strong> {ticket.nombre_cliente}</p>
        <p><strong>Equipo:</strong> {ticket.equipo}</p>
        <p><strong>Falla:</strong> {ticket.falla}</p>
        <p><strong>Estado actual:</strong> <span className="text-green-700">{ticket.estado}</span></p>
        <p><strong>Fecha de ingreso:</strong> {new Date(ticket.fecha_ingreso).toLocaleDateString()}</p>
      </div>
    </div>
  );
}