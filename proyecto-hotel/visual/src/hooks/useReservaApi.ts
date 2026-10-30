import { useEffect, useState } from "react";
import { Reserva } from "../interfaces/reserva";

const urlApi = "http://192.168.7.6:3000/reservas";

export const useReservaApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listaReservas, setListaReservas] = useState<Reserva[]>([]);

  const cargarReservas = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(urlApi);
      if (!response.ok) throw new Error("Error en la petición");
      const data = await response.json();
      setListaReservas(data);
    } catch (error) {
      console.log("Error al cargar reservas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  const eliminarReserva = async (id: string) => {
    try {
      await fetch(`${urlApi}/${id}`, { method: 'DELETE' });
      await cargarReservas();
    } catch (error) {
      console.log("Error al eliminar:", error);
    }
  };

  return { isLoading, listaReservas, cargarReservas, eliminarReserva };
};