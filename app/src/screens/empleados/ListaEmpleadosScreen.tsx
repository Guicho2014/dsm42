import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useEmpleadosPaginados } from '../../hooks/useEmpleadosPaginados';

const C = {
  fondo: '#0f172a',
  tarjeta: '#1e293b',
  borde: '#334155',
  texto: '#f1f5f9',
  suave: '#94a3b8',
  azul: '#3b82f6',
};

export const ListaEmpleadosScreen = ({ route }: any) => {
  const tipo = route.params?.tipo || 'tecnologia'; 
  
  const { isLoading, lista, cargarEmpleados } = useEmpleadosPaginados(tipo);

  return (
    <View style={style.pantalla}>
      <FlatList
        data={lista}
        keyExtractor={(item, index) => `${item.id_empleado || item.id}-${index}`}
        contentContainerStyle={style.listaContenido}
        
        ListHeaderComponent={
          <View style={style.header}>
            <Text style={style.headerTitulo}>
              {tipo === 'tecnologia' ? 'Empleados de Tecnología' : 'Contratados Post-2022'}
            </Text>
            
            <Text style={style.headerSubtitulo}>
              Desliza para ver más...
            </Text>
          </View>
        }
        
        showsVerticalScrollIndicator={false}
        onEndReached={cargarEmpleados}
        onEndReachedThreshold={0.5}
        
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator 
              size="large" 
              color={C.azul} 
              style={style.spinner} 
            />
          ) : null
        }
        
        renderItem={({ item }) => (
          <View style={style.tarjeta}>
            <View style={style.infoContenedor}>
              <Text style={style.nombre}>
                {item.nombre}
              </Text>
              
              <Text style={style.puesto}>
                {item.puesto}
              </Text>
              
              <Text style={style.fecha}>
                {item.fecha_contratacion}
              </Text>
            </View>

            <View style={style.salarioContenedor}>
              <Text style={style.salario}>
                ${Number(item.salario_mensual).toLocaleString()}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const style = StyleSheet.create({
  pantalla: { 
    flex: 1, 
    backgroundColor: C.fondo 
  },
  listaContenido: { 
    padding: 16, 
    paddingBottom: 30 
  },
  header: { 
    marginBottom: 20, 
    marginTop: 10 
  },
  headerTitulo: { 
    color: C.texto, 
    fontSize: 22, 
    fontWeight: 'bold' 
  },
  headerSubtitulo: { 
    color: C.suave, 
    fontSize: 12, 
    marginTop: 4 
  },
  spinner: { 
    marginVertical: 20 
  },
  tarjeta: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: C.tarjeta, 
    borderColor: C.borde, 
    borderWidth: 1, 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 12 
  },
  infoContenedor: { 
    flex: 1, 
    justifyContent: 'center' 
  },
  nombre: { 
    color: C.texto, 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  puesto: { 
    color: C.suave, 
    fontSize: 12, 
    marginTop: 2 
  },
  fecha: { 
    color: C.suave, 
    fontSize: 10, 
    marginTop: 4 
  },
  salarioContenedor: { 
    backgroundColor: 'transparent',
    paddingHorizontal: 12, 
    paddingVertical: 8,
  },
  salario: { 
    color: C.texto, 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
});