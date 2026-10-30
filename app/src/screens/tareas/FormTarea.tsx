import { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { StackScreenProps } from '@react-navigation/stack';
import { TareaStackParams } from '../../navigator/TareaStackNavigator';
import { useFormTarea } from '../../hooks/useFormTarea';
import { EstadoTarea } from '../../interfaces/pandoraApiRest';
import { useTareasTheme } from '../../context/TareasThemeContext';

interface Props extends StackScreenProps<TareaStackParams, 'FormTarea'>{};

const estados: EstadoTarea[] = [
  EstadoTarea.pendiente,
  EstadoTarea.en_proceso,
  EstadoTarea.completado,
];

export const FormTarea = ( { navigation, route }:Props ) => {

  const { state, handleInputChange, handleSubmit, handleDelete } = useFormTarea();
  const { theme } = useTareasTheme();

  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect( () => {
    if ( route.params ) {
      const tarea = route.params;
      handleInputChange("id_tarea", tarea.id_tarea);
      handleInputChange("titulo", tarea.titulo);
      handleInputChange("descripcion", tarea.descripcion);
      handleInputChange("estado", tarea.estado);
      if (tarea.fecha_vencimiento) {
        handleInputChange("fecha_vencimiento", tarea.fecha_vencimiento);
      }
    }
  }, []);

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      handleInputChange('fecha_vencimiento', `${year}-${month}-${day}`);
    }
  };

  return(
    <View style={{ flex: 1, backgroundColor: theme.fondo }}>
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ color: theme.texto, fontSize: 28, fontWeight: 'bold', textAlign: 'left', marginBottom: 24 }}>
          { state.id_tarea === 0 ? 'Nueva Tarea' : 'Editar Tarea' }
        </Text>

        {/* INPUT TÍTULO */}
        <View style={ style.inputGroup }>
          <Text style={{ ...style.label, color: theme.textoSec }}>
            Título
          </Text>
          <TextInput
            style={{
              ...style.input,
              backgroundColor: theme.superficie,
              color: theme.texto,
              borderColor: theme.borde,
            }}
            placeholder='Ej. Trabajo de investigación'
            placeholderTextColor={theme.textoSec}
            value={ state.titulo }
            onChangeText={ (text) => handleInputChange('titulo', text) }
          />
        </View>

        {/* INPUT DESCRIPCIÓN */}
        <View style={ style.inputGroup }>
          <Text style={{ ...style.label, color: theme.textoSec }}>
            Descripción
          </Text>
          <TextInput
            style={{
              ...style.input,
              backgroundColor: theme.superficie,
              color: theme.texto,
              borderColor: theme.borde,
              height: 120,
              textAlignVertical: 'top',
              paddingTop: 12,
            }}
            placeholder='Escribe los detalles de la tarea...'
            placeholderTextColor={theme.textoSec}
            value={ state.descripcion }
            onChangeText={ (text) => handleInputChange('descripcion', text) }
            multiline={true}
            numberOfLines={4}
          />
        </View>

        <View style={ style.inputGroup }>
          <Text style={{ ...style.label, color: theme.textoSec }}>
            Fecha de vencimiento
          </Text>
          <TouchableOpacity
            style={{
              ...style.input,
              backgroundColor: theme.superficie,
              borderColor: theme.borde,
              justifyContent: 'center'
            }}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ color: state.fecha_vencimiento ? theme.texto : theme.textoSec, fontSize: 16 }}>
              { state.fecha_vencimiento ? state.fecha_vencimiento : 'Seleccionar fecha' }
            </Text>
          </TouchableOpacity>

          { showDatePicker && (
            <DateTimePicker
              value={
                state.fecha_vencimiento 
                  ? new Date(state.fecha_vencimiento + 'T12:00:00')
                  : new Date() 
              }
              mode="date"
              display="default"
              onChange={onChangeDate}
              themeVariant={theme.fondo === '#F8F9FA' ? 'light' : 'dark'} 
            />
          )}
        </View>

        {/* SELECTOR DE ESTADO */}
        <View style={ style.inputGroup }>
          <Text style={{ ...style.label, color: theme.textoSec }}>
            Estado
          </Text>
          <View style={ style.estadoContainer }>
            {
              estados.map( (estado) => (
                <TouchableOpacity
                  key={ estado }
                  onPress={ () => handleInputChange('estado', estado) }
                  style={{
                    ...style.estadoBtn,
                    backgroundColor: state.estado === estado ? theme.acento : theme.superficie,
                    borderColor: state.estado === estado ? theme.acentoClaro : theme.borde,
                  }}
                >
                  <Text
                    style={{
                      ...style.estadoBtnText,
                      color: state.estado === estado ? theme.botonTexto : theme.textoSec,
                    }}
                  >
                    { estado }
                  </Text>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>

        <View style={{ marginTop: 32 }}>
          <TouchableOpacity
            onPress={ () => {
              handleSubmit();
              navigation.popToTop();
            }}
            style={{
              backgroundColor: theme.acento,
              borderColor: theme.acentoClaro,
              borderWidth: 2,
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: theme.botonTexto, fontSize: 18, fontWeight: 'bold' }}>
              { state.id_tarea === 0 ? 'Crear tarea' : 'Guardar cambios' }
            </Text>
          </TouchableOpacity>
        </View>

        {/* BOTÓN ELIMINAR (Secundario) */}
        {
          ( state.id_tarea !== 0 ) && (
            <View style={{ marginTop: 16 }}>
              <TouchableOpacity
                onPress={ () => {
                  handleDelete();
                  navigation.popToTop();
                }}
                style={{ padding: 12, alignItems: 'center' }}
              >
                <Text style={{ color: theme.btnEliminar, fontSize: 16, fontWeight: '600' }}>
                  Eliminar esta tarea
                </Text>
              </TouchableOpacity>
            </View>
          )
        }

      </ScrollView>
    </View>
  );

}

const style = StyleSheet.create({
  inputGroup: {
    marginBottom: 20, 
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 50, 
  },
  estadoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8, 
  },
  estadoBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  estadoBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});