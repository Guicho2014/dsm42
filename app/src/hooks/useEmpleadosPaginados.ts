import { useState, useRef, useEffect, useContext } from "react";
import { pandoraApi } from "../api/pandoraApi";
import { ConfigContext } from "../context/ConfigContext";

export const useEmpleadosPaginados = (tipo: 'tecnologia' | 'contratados-2022') => {
  const { ip } = useContext(ConfigContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lista, setLista] = useState<any[]>([]);
  const pagina = useRef(1);
  const hayMas = useRef(true);

  const cargarEmpleados = async () => {
    if (!hayMas.current || isLoading) return;
    setIsLoading(true);

    try {
      const url = `http://${ip}:3000/empleado/consultas/${tipo}?pagina=${pagina.current}&limite=20`;
      const response = await pandoraApi.get(url);
      const nuevosDatos = response.data.data;

      if (nuevosDatos.length === 0) {
        hayMas.current = false;
      } else {
        setLista((prev) => [...prev, ...nuevosDatos]);
        pagina.current += 1;
      }
    } catch (error) {
      console.log("Error al cargar lista:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setLista([]);
    pagina.current = 1;
    hayMas.current = true;
    cargarEmpleados();
  }, [tipo]);

  return { isLoading, lista, cargarEmpleados };
};