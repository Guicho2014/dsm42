import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TareaResponse, EstadoTarea } from '../interfaces/pandoraApiRest';
import { useNavigation } from '@react-navigation/native';
import { useTareasTheme } from '../context/TareasThemeContext';

interface Props {
  tarea: TareaResponse;
}

export const TareaCard = ( { tarea }: Props ) => {

  const navigation = useNavigation<any>();
  const { theme } = useTareasTheme();

  const colorEstado = ( estado: EstadoTarea ): string => {
    switch ( estado ) {
      case EstadoTarea.completado:
        return theme.acento;
      case EstadoTarea.en_proceso:
        return theme.acento + 'A6';
      case EstadoTarea.pendiente:
      default:
        return theme.acento + '59';
    }
  }

  return (
    <TouchableOpacity
      onPress={ () => navigation.navigate('FormTarea', { ...tarea }) }
      activeOpacity={ 0.8 }
    >
      <View style={{ ...style.card, backgroundColor: theme.superficie, borderColor: theme.borde }}>
        <View style={ style.header }>
          <Text style={{ ...style.titulo, color: theme.texto }} numberOfLines={ 1 }>
            { tarea.titulo }
          </Text>
          <View style={{ ...style.estadoBadge, backgroundColor: colorEstado( tarea.estado ) }}>
            <Text style={{ ...style.estadoText, color: theme.botonTexto }}>
              { tarea.estado }
            </Text>
          </View>
        </View>

        <Text style={{ ...style.descripcion, color: theme.textoSec }} numberOfLines={ 3 }>
          { tarea.descripcion }
        </Text>

        { tarea.fecha_vencimiento ? (
          <View style={ style.fechaContainer }>
            <Text style={{ ...style.fechaText, color: theme.textoSec }}>
               Vence: { tarea.fecha_vencimiento }
            </Text>
          </View>
        ) : null}

        <Text style={{ ...style.idText, color: theme.textoSec }}>
          #{ tarea.id_tarea }
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  estadoBadge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  estadoText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descripcion: {
    fontSize: 15,
    marginTop: 8,
    marginBottom: 12,
  },
  fechaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  fechaText: {
    fontSize: 14,
    fontWeight: '600',
  },
  idText: {
    fontSize: 12,
    position: 'absolute',
    right: 16,
    bottom: 8,
  },
});
