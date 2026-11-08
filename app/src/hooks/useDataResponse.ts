import { useEffect, useState } from "react";
import { pandoraApi } from "../api/pandoraApi";

export interface SensorDataResponse {
  total: number;
  diasFrios: { dia: string; promedio: number }[];
  diasCalurosos: { dia: string; promedio: number }[];
  topTemperaturas: { id_sensor: number; temperatura_celcius: number }[];
  estadistica: {
    total: string;
    temp_promedio: string;
    temp_minima: string;
    temp_maxima: string;
    dist_promedio: string;
  };
  ultimasHoras: { id_sensor: number; fecha: string; temperatura_celcius: number; distancia_cm: number }[];
  alertas: { id_sensor: number; fecha: string; distancia_cm: number }[];
  hoy: { id_sensor: number; fecha: string; temperatura_celcius: number }[];
  ayer: { id_sensor: number; fecha: string; temperatura_celcius: number }[];
  anteayer: { id_sensor: number; fecha: string; temperatura_celcius: number }[];
}

export const useDataResponse = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<SensorDataResponse | null>(null);
  const urlApi = "http://192.168.100.139:3000/sensors/consultas/data";

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await pandoraApi.get<SensorDataResponse>(urlApi);
      setData(response.data);
    } catch (error) {
      console.log("Error al cargar datos del sensor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { isLoading, data, loadData };
};