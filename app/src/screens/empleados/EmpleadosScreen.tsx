import { View, Text, ScrollView, StyleSheet, useWindowDimensions, RefreshControl, TouchableOpacity } from 'react-native';
import { useEmpleadoData } from '../../hooks/useEmpleadoData';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { useNavigation } from '@react-navigation/native';
import { appTheme } from '../../theme/appTheme';

const C = {
  fondo: '#0f172a',
  tarjeta: '#1e293b',
  borde: '#334155',
  texto: '#f1f5f9',
  suave: '#94a3b8',
  verde: '#10b981',
  azul: '#3b82f6',
  naranja: '#f97316',
  morado: '#8b5cf6',
  rojo: '#ef4444',
};

export const EmpleadosScreen = () => {
  const { isLoading, data, loadData } = useEmpleadoData();
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>();

  const estiloEjes = {
    xAxisLabelTextStyle: { 
      color: C.suave, 
      fontSize: 10 
    }, 
    yAxisTextStyle: { 
      color: C.suave, 
      fontSize: 10 
    },
    xAxisColor: C.borde, 
    yAxisColor: C.borde, 
    rulesColor: C.borde, 
    noOfSections: 4, 
    isAnimated: false,
  };

  if (isLoading && !data) {
    return (
      <View style={appTheme.container}>
        <Text style={appTheme.text}>
          Cargando datos...
        </Text>
      </View>
    );
  }

  if (!data) return null;

  const promediosData = data.promedio_por_departamento.map(d => ({
    value: Number(d.salario_promedio),
    label: d.departamento.substring(0, 5) + '.',
    frontColor: C.azul,
  }));

  const colores = [
    C.verde, 
    C.azul, 
    C.naranja, 
    C.morado, 
    C.rojo
  ];

  const donaData = data.departamentos_mayores_20000.map((d, index) => {
    return {
      value: Number(d.salario_promedio),
      color: colores[index % colores.length],
      text: "", 
      showText: false,
    };
  });

  const empleadoMasBajo = data.salario_mas_bajo[0];

  return (
    <ScrollView
      style={style.pantalla}
      contentContainerStyle={style.contenido}
      refreshControl={
        <RefreshControl 
          refreshing={isLoading} 
          onRefresh={loadData} 
          tintColor={C.azul} 
        />
      }
    >
      <View style={style.headerContenedor}>
        <Text style={style.headerTitulo}>
          Ejercicios
        </Text>
        
        <Text style={style.headerSubtitulo}>
          Resumen y análisis de la nómina
        </Text>
      </View>

      <View style={style.filaTarjetas}>
        <View style={style.tarjetaStat}>
          <Text style={style.statLabel}>
            Total Empleados
          </Text>
          
          <Text style={style.statValor}>
            {Number(data.total_empleados).toLocaleString()}
          </Text>
        </View>

        <View style={style.tarjetaStat}>
          <Text style={style.statLabel}>
            Nómina Mensual
          </Text>
          
          <Text style={style.statValor}>
            ${(Number(data.nomina_mensual_total) / 1000000).toFixed(1)}M
          </Text>
        </View>
      </View>

      <View style={style.tarjetaSeccion}>
        <Text style={style.seccionTitulo}>
          Promedio Salarial
        </Text>
        
        <Text style={style.seccionSubtitulo}>
          Salario promedio por departamento
        </Text>
        
        <View style={style.graficaContenedor}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <BarChart
              {...estiloEjes}
              data={promediosData}
              width={width * 1.5}
              barWidth={30}
              barBorderTopLeftRadius={5}
              barBorderTopRightRadius={5}
              showBarTops
            />
          </ScrollView>
        </View>
      </View>

      <View style={style.tarjetaSeccion}>
        <Text style={style.seccionTitulo}>
          Salario promedio mayor a $20,000
        </Text>
        
        <View style={style.graficaDona}>
          <PieChart
            data={donaData}
            donut
            radius={70}
            innerRadius={40}
            centerLabelComponent={() => (
              <Text style={{ 
                color: C.texto, 
                fontSize: 12, 
                fontWeight: 'bold' 
              }}>
                VIP
              </Text>
            )}
          />
          
          <View style={style.leyendaContenedor}>
            {data.departamentos_mayores_20000.map((d, index) => (
              <View key={index} style={style.leyendaItem}>
                <View style={[
                  style.leyendaPunto, 
                  { backgroundColor: colores[index % colores.length] }
                ]} />
                
                <Text style={style.leyendaTexto}>
                  {d.departamento} (${Number(d.salario_promedio).toLocaleString()})
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={style.tarjetaSeccion}>
        <Text style={style.seccionTitulo}>
          Salario Más Bajo
        </Text>
        
        <View style={style.empleadoBajoContenedor}>
          <View style={style.infoBajo}>
            <Text style={style.nombreBajo}>
              {empleadoMasBajo?.nombre}
            </Text>
            
            <Text style={style.puestoBajo}>
              {empleadoMasBajo?.puesto}
            </Text>
          </View>
          
          <Text style={style.salarioBajo}>
            ${Number(empleadoMasBajo?.salario_mensual || 0).toLocaleString()}
          </Text>
        </View>
      </View>

      <View style={style.botonesContenedor}>
        <TouchableOpacity 
          style={[style.boton, { backgroundColor: C.azul }]}
          onPress={() => navigation.navigate('ListaEmpleadosScreen', { tipo: 'tecnologia' })}
        >
          <Text style={style.botonTexto}>
            Ver Empleados en Tecnología
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[style.boton, { backgroundColor: C.morado }]}
          onPress={() => navigation.navigate('ListaEmpleadosScreen', { tipo: 'contratados-2022' })}
        >
          <Text style={style.botonTexto}>
            Ver Contratados +2022
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  pantalla: { 
    flex: 1, 
    backgroundColor: C.fondo 
  },
  contenido: { 
    padding: 20, 
    paddingBottom: 40 
  },
  headerContenedor: { 
    marginBottom: 20 
  },
  headerTitulo: { 
    color: C.texto, 
    fontSize: 24, 
    fontWeight: 'bold' 
  },
  headerSubtitulo: { 
    color: C.suave, 
    fontSize: 14, 
    marginTop: 4 
  },
  filaTarjetas: { 
    flexDirection: 'row', 
    gap: 10, 
    marginBottom: 16 
  },
  tarjetaStat: { 
    flex: 1, 
    backgroundColor: C.tarjeta, 
    borderRadius: 12, 
    padding: 16 
  },
  statLabel: { 
    color: C.texto, 
    fontSize: 12, 
    fontWeight: 'bold', 
    marginBottom: 8 
  },
  statValor: { 
    color: C.texto, 
    fontSize: 22, 
    fontWeight: 'bold' 
  },
  tarjetaSeccion: { 
    backgroundColor: C.tarjeta, 
    borderColor: C.borde, 
    borderRadius: 16, 
    borderWidth: 1, 
    padding: 16, 
    marginBottom: 16 
  },
  seccionTitulo: { 
    color: C.texto, 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  seccionSubtitulo: { 
    color: C.suave, 
    fontSize: 12, 
    marginTop: 4 
  },
  graficaContenedor: { 
    marginTop: 16 
  },
  graficaDona: { 
    alignItems: 'center', 
    marginTop: 16 
  },
  leyendaContenedor: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    marginTop: 20, 
    gap: 10 
  },
  leyendaItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6 
  },
  leyendaPunto: { 
    width: 10, 
    height: 10, 
    borderRadius: 5 
  },
  leyendaTexto: { 
    color: C.suave, 
    fontSize: 12 
  },
  empleadoBajoContenedor: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 16 
  },
  infoBajo: { 
    flex: 1, 
  },
  nombreBajo: { 
    color: C.texto, 
    fontSize: 14, 
    fontWeight: 'bold' 
  },
  puestoBajo: { 
    color: C.suave, 
    fontSize: 12 
  },
  salarioBajo: { 
    color: C.texto, 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  botonesContenedor: { 
    flexDirection: 'row', 
    gap: 10, 
    marginTop: 10 
  },
  boton: { 
    flex: 1, 
    paddingVertical: 14, 
    borderRadius: 10, 
    alignItems: 'center' 
  },
  botonTexto: { 
    color: '#fff', 
    fontSize: 12, 
    fontWeight: 'bold',
    textAlign: 'center'
  },
});