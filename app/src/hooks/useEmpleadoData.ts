import { useEffect, useState, useContext } from "react";
import { pandoraApi } from "../api/pandoraApi";
import { ConfigContext } from "../context/ConfigContext";

export interface EmpleadoDataResponse {
  total_empleados: number;
  nomina_mensual_total: string;
  salario_promedio: string;
  salario_minimo: string;
  salario_maximo: string;
  promedio_por_departamento: {
    departamento: string;
    salario_promedio: string;
  }[];
  salario_mas_bajo: {
    nombre: string;
    puesto: string;
    salario_mensual: number;
  }[];
  departamentos_mayores_20000: {
    departamento: string;
    salario_promedio: string;
  }[];
}

export const useEmpleadoData = () => {
  const { ip } = useContext(ConfigContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<EmpleadoDataResponse | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await pandoraApi.get<EmpleadoDataResponse>(`http://${ip}:3000/empleado/consultas/data`);
      setData(response.data);
    } catch (error) {
      console.log("Error al cargar datos de empleados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { isLoading, data, loadData };
};