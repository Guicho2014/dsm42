import { ReactNode } from 'react';
import { View, Text, ScrollView, StyleSheet, useWindowDimensions, RefreshControl } from 'react-native';
import { useDataResponse } from '../hooks/useDataResponse';
import { LineChart, BarChart } from 'react-native-gifted-charts';
import { appTheme } from '../theme/appTheme';

const C = {
  fondo: '#0f172a',
  tarjeta: '#1e293b',
  borde: '#334155',
  texto: '#f1f5f9',
  suave: '#94a3b8',
  frio: '#38bdf8',
  calor: '#f87171',
  top: '#fb923c',
  verde: '#34d399', 
  morado: '#a78bfa',
};

export const DataResponseScreen = () => {
  const { isLoading, data, loadData } = useDataResponse();
  const { width } = useWindowDimensions();

  type Fecha = Date | string;
  type Punto = { value: number, label: string };

  const hora = (f: Fecha) => {
    const d = new Date(f);
    if (isNaN(d.getTime())) return '--:--';
    return `${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}`;
  }

  const dia = (f: Fecha) => {
    const d = new Date(f);
    if (isNaN(d.getTime())) return '--/--';
    return `${d.getDate()}/${d.getMonth() + 1}`;
  }

  const estiloEjes = {
    xAxisLabelTextStyle: { color: C.suave, fontSize: 10 }, 
    yAxisTextStyle: { color: C.suave, fontSize: 10 },
    xAxisColor: C.borde,
    yAxisColor: C.borde,
    rulesColor: C.borde,
    noOfSections: 4,
    isAnimated: false,
  };

  const Tarjeta = ({ titulo, subtitulo, children }: {
    titulo: string;
    subtitulo: string;
    children: ReactNode;
  }) => {
    return (
      <View style={style.tarjeta}>
        <Text style={style.titulo}>{titulo}</Text>
        <Text style={style.sub}>{subtitulo}</Text>
        <View style={{ marginTop: 16 }}>
          {children}
        </View>
      </View>
    );
  }

  const Stat = ({ label, valor, color }: {
    label: string;
    valor: number;
    color: string;
  }) => {
    return ( 
      <View style={{ ...style.stat, borderTopColor: color }}>
        <Text style={style.sub}>{label}</Text>
        <Text style={{ ...style.statValor, backgroundColor: color }}>
          { Number.isFinite(Number(valor)) ? Number(valor).toFixed(1) : '0.0' } C
        </Text>
      </View>
    );
  }

  const GraficoLinea = ({ datos, color }: { datos: Punto[]; color: string }) => {
    return (
      <LineChart
        {...estiloEjes}
        data={datos}
        color={color}
        width={width - 122}
        adjustToWidth
        curved              
        areaChart           
        thickness={3} 
        startFillColor={color}      
        endFillColor={C.tarjeta}
        startOpacity={0.4}
        endOpacity={0.02}
        dataPointsColor={color}
        dataPointsRadius={3}
      />
    );
  };

  const calcularRango = (arr: { value: number }[], margenMinimo = 0) => {
    if (arr.length === 0) return { min: margenMinimo, max: 10 };
    const values = arr.map((a) => a.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    return { 
      min: margenMinimo > 0 ? margenMinimo : Math.floor(min) - 1, 
      max: Math.ceil(max) + 1 
    };
  };

  if(isLoading && !data){
    return( 
      <View style={ appTheme.container }>
        <Text style={ appTheme.text }>Cargando...</Text>
      </View>
    );
  }

  if(!data) return <View style={ appTheme.container }><Text style={ appTheme.text }>Sin datos</Text></View>;

  const { total, estadistica } = data;

  // Datos para las 2 gráficas originales
  const temperatura = data.ultimasHoras.map(a => ({
    value: Number(a.temperatura_celcius),
    label: hora(a.fecha),
  }));

  const distancia = data.alertas.map(a => ({
    value: Number(a.distancia_cm),
    label: hora(a.fecha),
  }));

  // Datos para las nuevas gráficas
  const diasFrios = (data.diasFrios ?? []).map(d => ({ value: Number(d.promedio) || 0, label: dia(d.dia) }));
  const diasCalurosos = (data.diasCalurosos ?? []).map(d => ({ value: Number(d.promedio) || 0, label: dia(d.dia) }));
  
  const topTemps = (data.topTemperaturas ?? []).slice(0, 5).map((t, index) => ({
    value: Number(t.temperatura_celcius) || 0,
    label: `#${index + 1}`,
    frontColor: C.top,
  }));

  const lecturasPorDia = [
    { value: data.hoy?.length || 0, label: 'Hoy', frontColor: C.verde },
    { value: data.ayer?.length || 0, label: 'Ayer', frontColor: C.top },
    { value: data.anteayer?.length || 0, label: 'Antier', frontColor: C.morado },
  ];

  const datosHoy = (data.hoy ?? []).map(h => ({ value: Number(h.temperatura_celcius) || 0, label: hora(h.fecha) }));
  const datosAyer = (data.ayer ?? []).map(h => ({ value: Number(h.temperatura_celcius) || 0, label: hora(h.fecha) }));
  const datosAntier = (data.anteayer ?? []).map(h => ({ value: Number(h.temperatura_celcius) || 0, label: hora(h.fecha) }));

  const rangoFrios = calcularRango(diasFrios);
  const rangoCalurosos = calcularRango(diasCalurosos);
  const rangoTop = calcularRango(topTemps);
  const rangoHoy = calcularRango(datosHoy);
  const rangoAyer = calcularRango(datosAyer);
  const rangoAntier = calcularRango(datosAntier);

  return(
    <ScrollView
      scrollEnabled={ true }
      style={ style.pantalla }
      contentContainerStyle={{
        flexGrow: 1,
        padding: 20
      }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={loadData}
          tintColor={C.frio}
          colors={[ C.frio ]}
          progressBackgroundColor={ C.tarjeta }
        />
      }
    >
      <View>
        <Text style={style.header}>Monitor del sensor</Text>
        <Text style={style.sub}>{total} lecturas registradas</Text>
      </View>

      <View style={style.fila}>
        <Stat label="Promedio" valor={estadistica.temp_promedio} color={C.verde} />
        <Stat label="Mínima" valor={estadistica.temp_minima} color={C.frio} />
        <Stat label="Máxima" valor={estadistica.temp_maxima} color={C.calor} />
      </View>

      <Tarjeta titulo="Temperatura" subtitulo="Gráfico de Línea (Área curva)">
        <GraficoLinea datos={temperatura} color={C.calor} />
      </Tarjeta>

      <Tarjeta
        titulo="Distancia"
        subtitulo="Gráfico de Línea (Área curva)"
      >
        <GraficoLinea datos={distancia} color={C.verde} />
      </Tarjeta>

      <Tarjeta titulo="Días más Fríos" subtitulo="Gráfico de Barras Verticales">
        {diasFrios.length > 0 ? (
          <BarChart 
            {...estiloEjes} 
            data={diasFrios.map(d => ({ ...d, frontColor: C.frio }))} 
            width={width - 122} 
            adjustToWidth 
            barWidth={20}
            barBorderTopLeftRadius={5} 
            barBorderTopRightRadius={5} 
            yAxisOffset={rangoFrios.min}
            maxValue={rangoFrios.max}
          />
        ) : <Text style={style.vacio}>Sin datos</Text>}
      </Tarjeta>

      <Tarjeta titulo="Días Calurosos" subtitulo="Gráfico de Línea (Puntos Grandes)">
        {diasCalurosos.length > 0 ? (
          <LineChart 
            {...estiloEjes} 
            data={diasCalurosos} 
            color={C.top} 
            width={width - 122} 
            adjustToWidth 
            thickness={2} 
            dataPointsRadius={6} 
            dataPointsColor={C.calor} 
            yAxisOffset={rangoCalurosos.min}
            maxValue={rangoCalurosos.max}
          />
        ) : <Text style={style.vacio}>Sin datos</Text>}
      </Tarjeta>

      <Tarjeta titulo="Top 5 Temperaturas" subtitulo="Gráfico de Barras Verticales">
        {topTemps.length > 0 ? (
          <BarChart 
            {...estiloEjes} 
            data={topTemps} 
            width={width - 122} 
            adjustToWidth 
            barWidth={30}
            barBorderTopLeftRadius={5} 
            barBorderTopRightRadius={5} 
            yAxisOffset={rangoTop.min}
            maxValue={rangoTop.max}
          />
        ) : <Text style={style.vacio}>Sin datos</Text>}
      </Tarjeta>

      <Tarjeta titulo="Lecturas por Día" subtitulo="Gráfico de Barras Verticales">
        <BarChart 
          {...estiloEjes} 
          data={lecturasPorDia} 
          width={width - 122} 
          adjustToWidth 
          barWidth={40}
          barBorderTopLeftRadius={8} 
          barBorderTopRightRadius={8} 
        />
      </Tarjeta>

      <Tarjeta titulo="Historial de Hoy" subtitulo="Gráfico de Línea (Área clásica)">
        {datosHoy.length > 0 ? (
          <LineChart 
            {...estiloEjes} 
            data={datosHoy} 
            color={C.verde} 
            width={width - 122} 
            adjustToWidth 
            areaChart 
            startFillColor={C.verde} 
            endFillColor={C.tarjeta} 
            startOpacity={0.3} 
            endOpacity={0.0} 
            yAxisOffset={rangoHoy.min}
            maxValue={rangoHoy.max}
          />
        ) : <Text style={style.vacio}>Sin lecturas hoy</Text>}
      </Tarjeta>

      <Tarjeta titulo="Historial de Ayer" subtitulo="Gráfico de Línea (Recta simple)">
        {datosAyer.length > 0 ? (
          <LineChart 
            {...estiloEjes} 
            data={datosAyer} 
            color={C.top} 
            width={width - 122} 
            adjustToWidth 
            thickness={3} 
            yAxisOffset={rangoAyer.min}
            maxValue={rangoAyer.max}
          />
        ) : <Text style={style.vacio}>Sin lecturas ayer</Text>}
      </Tarjeta>

      <Tarjeta titulo="Historial de Antier" subtitulo="Gráfico de Línea (Curva fina)">
        {datosAntier.length > 0 ? (
          <LineChart 
            {...estiloEjes} 
            data={datosAntier} 
            color={C.morado} 
            width={width - 122} 
            adjustToWidth 
            curved 
            thickness={1.5} 
            yAxisOffset={rangoAntier.min}
            maxValue={rangoAntier.max}
          />
        ) : <Text style={style.vacio}>Sin lecturas antier</Text>}
      </Tarjeta>

    </ScrollView>
  );
}


const style = StyleSheet.create({
  pantalla: { flex:1, backgroundColor: C.fondo },
  centro: { justifyContent: 'center', alignItems: 'center' },
  header: { color: C.texto, fontSize: 13 },
  sub: { color: C.texto, fontSize: 26, fontWeight: "bold" },
  fila: { flexDirection: 'row', gap: 10 },
  stat: { flex: 1, backgroundColor: C.tarjeta, borderRadius: 12, borderTopWidth: 3, padding: 12 },
  statValor: { fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  tarjeta: {
    backgroundColor: C.tarjeta,
    borderColor: C.borde,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 16
  },
  titulo: { color: C.texto, fontSize: 17, fontWeight: 'bold' },
  leyenda: { flexDirection: 'row', textAlign: 'center', gap: 6 },
  punto: { width: 10, height: 10, borderRadius: 5 },
  vacio: { color: C.suave, textAlign: 'center', padding: 20 },
});