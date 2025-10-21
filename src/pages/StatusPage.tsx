import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function StatusPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState<any>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      const { data } = await supabase.from('tickets').select('*').eq('id', id).single();
      setTicket(data);
    };
    fetchTicket();
  }, [id]);

  if (!ticket) return <p className="text-center mt-10 text-gray-600">Cargando...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Estatus del Equipo</h1>
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <p><strong>Cliente:</strong> {ticket.nombre_cliente}</p>
        <p><strong>Equipo:</strong> {ticket.equipo}</p>
        <p><strong>Falla:</strong> {ticket.falla}</p>
        <p><strong>Estado:</strong> {ticket.estado}</p>
        <p><strong>Fecha de ingreso:</strong> {new Date(ticket.fecha_ingreso).toLocaleDateString()}</p>
      </div>
    </div>
  );
}