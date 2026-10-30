import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { appTheme } from '../../theme/appTheme';
import { BtnTouch } from '../../components/BtnTouch';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { TareaCard } from '../../components/TareaCard';
import { TareaResponse, EstadoTarea } from '../../interfaces/pandoraApiRest';
import { useTareaApi } from '../../hooks/useTareaApi';
import { useTareasTheme } from '../../context/TareasThemeContext';

// Definimos las opciones de filtro
const OPCIONES_FILTRO = ['Todos', EstadoTarea.pendiente, EstadoTarea.en_proceso, EstadoTarea.completado];

export const HomeTarea = () => {

  const { isLoading, loadTareas, listTarea } = useTareaApi();
  const navigation = useNavigation<any>();
  const focused = useIsFocused();
  const { theme, themeName, setTheme } = useTareasTheme();

  // Estado para el filtro seleccionado (por defecto 'Todos')
  const [ filtroActivo, setFiltroActivo ] = useState<string>('Todos');

  useEffect( () =>  {
    loadTareas();
  },[ focused ]);

  // Lógica para filtrar las tareas
  const tareasFiltradas = listTarea.filter( (tarea) => {
    if ( filtroActivo === 'Todos' ) return true;
    return tarea.estado === filtroActivo;
  });

  const create: TareaResponse = {
    id_tarea:     0,
    titulo:       '',
    descripcion:  '',
    estado:       EstadoTarea.pendiente,
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.fondo }}>
      <FlatList
        data={ tareasFiltradas } // 👈 Usamos la lista filtrada
        keyExtractor={ (item) => `#${item.id_tarea}` }
        contentContainerStyle={{ paddingBottom: 40 }}
        ListHeaderComponent={(
          <View style={{ 
            alignItems: "center", 
            justifyContent: 'center',
            paddingTop: 24,
            paddingBottom: 16 
          }}>
            <Text style={{ ...appTheme.text, color: theme.texto, marginBottom: 16 }}>
              Lista de Tareas
            </Text>

            {/* Selector de colores */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20, gap: 8 }}>
              <TouchableOpacity
                onPress={ () => setTheme('oscuro') }
                style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: themeName === 'oscuro' ? theme.acento : theme.superficie }}
              >
                <Text style={{ color: themeName === 'oscuro' ? theme.botonTexto : theme.texto, fontSize: 12, fontWeight: 'bold' }}>Oscuro</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={ () => setTheme('claro') }
                style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: themeName === 'claro' ? theme.acento : theme.superficie }}
              >
                <Text style={{ color: themeName === 'claro' ? theme.botonTexto : theme.texto, fontSize: 12, fontWeight: 'bold' }}>Claro</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={ () => setTheme('calido') }
                style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: themeName === 'calido' ? theme.acento : theme.superficie }}
              >
                <Text style={{ color: themeName === 'calido' ? theme.botonTexto : theme.texto, fontSize: 12, fontWeight: 'bold' }}>Cálido</Text>
              </TouchableOpacity>
            </View>

            <BtnTouch
              title='Crear tarea'
              color={theme.acento}
              borderColor={theme.acentoClaro}
              onPress={ () => navigation.navigate('FormTarea',{...create}) }
            />

            <View style={{ width: '100%', marginTop: 24 }}>
              <Text style={{ color: theme.textoSec, fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8, paddingHorizontal: 20 }}>
                Filtrar por estado
              </Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
              >
                {
                  OPCIONES_FILTRO.map((opcion) => (
                    <TouchableOpacity
                      key={opcion}
                      onPress={() => setFiltroActivo(opcion)}
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: filtroActivo === opcion ? theme.acentoClaro : theme.borde,
                        backgroundColor: filtroActivo === opcion ? theme.acento : theme.superficie,
                      }}
                    >
                      <Text style={{ 
                        color: filtroActivo === opcion ? theme.botonTexto : theme.textoSec,
                        fontSize: 14,
                        fontWeight: '600'
                      }}>
                        {opcion}
                      </Text>
                    </TouchableOpacity>
                  ))
                }
              </ScrollView>
            </View>
            
          </View>
        )}
        ListEmptyComponent={(
          <Text style={{ ...appTheme.text, color: theme.textoSec, fontSize: 18, marginTop: 40, opacity: 0.8 }}>
            No hay tareas {filtroActivo !== 'Todos' ? `en estado "${filtroActivo}"` : 'todavía'}
          </Text>
        )}
        showsVerticalScrollIndicator={false}
        refreshControl={(
          <RefreshControl
            refreshing={ isLoading }
            onRefresh={ loadTareas }
            colors={[ theme.acento, theme.acentoClaro ]}
            progressBackgroundColor={theme.superficie}
          />
        )}
        renderItem={ ({ item }) => (
          <TareaCard tarea={ item } />
        )}
      />
    </View>
  );
}