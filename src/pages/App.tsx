import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function App() {
  const [form, setForm] = useState({
    nombre_cliente: '', correo: '', telefono: '', equipo: '', falla: ''
  });
  const [ticketUrl, setTicketUrl] = useState('');

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { data, error } = await supabase.from('tickets').insert([form]).select();
    if (error) { alert('Error al registrar'); return; }
    const id = data![0].id;
    setTicketUrl(`${window.location.origin}/estatus/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Registro de Equipos - NexaHelp</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4">
        {['nombre_cliente','correo','telefono','equipo','falla'].map((field) => (
          <input key={field} name={field} onChange={handleChange}
            placeholder={field.replace('_', ' ').toUpperCase()} className="w-full p-2 border rounded-md" required />
        ))}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold">
          Registrar equipo
        </button>
      </form>

      {ticketUrl && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
          <p><strong>Ticket generado:</strong></p>
          <a href={ticketUrl} className="text-blue-600 underline">{ticketUrl}</a>
        </div>
      )}
    </div>
  );
}