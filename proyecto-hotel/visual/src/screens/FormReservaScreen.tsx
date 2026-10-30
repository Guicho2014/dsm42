import { useState, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, Platform, Modal } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import { ImagePickerSection } from '../components/ImagePickerSection';
import { ReservaForm } from '../interfaces/reserva';
import { formTheme as styles } from '../theme/formTheme';

const TIPOS_HABITACION = ['Sencilla', 'Doble', 'Suite', 'Presidencial'];

const FORM_INICIAL: ReservaForm = {
  nombre_huesped: '', correo: '', telefono: '', tipo_habitacion: 'Sencilla',
  fecha_entrada: '', fecha_salida: '', numero_huespedes: '',
  solicitudes_especiales: '', imagen_1: null, imagen_2: null, imagen_3: null, imagen_4: null,
};

export default function FormReservaScreen({ navigation, route }: any) {
  const id = route.params?.id;

  const [form, setForm] = useState<ReservaForm>(FORM_INICIAL);
  const [showEntrada, setShowEntrada] = useState(false);
  const [showSalida, setShowSalida] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setForm(FORM_INICIAL);
      if (id) {
        fetch(`http://192.168.7.6:3000/reservas/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setForm({
              ...data,
              numero_huespedes: data.numero_huespedes ? String(data.numero_huespedes) : '',
              telefono: data.telefono || '',
              solicitudes_especiales: data.solicitudes_especiales || '',
              fecha_entrada: data.fecha_entrada || '',
              fecha_salida: data.fecha_salida || '',
            });
          })
          .catch((err) => console.log("Error al cargar reserva:", err));
      }
      return () => { navigation.setParams({ id: undefined }); };
    }, [id, navigation])
  );

  const handleChange = (field: keyof ReservaForm, value: string | null) => {
    setForm({ ...form, [field]: value });
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date | undefined, field: 'fecha_entrada' | 'fecha_salida') => {
    if (field === 'fecha_entrada') setShowEntrada(Platform.OS === 'ios');
    else setShowSalida(Platform.OS === 'ios');
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      handleChange(field, `${year}-${month}-${day}`);
    }
  };

  const handleSubmit = async () => {
    if (!form.nombre_huesped || !form.correo || !form.fecha_entrada || !form.fecha_salida) {
      Alert.alert('Error', 'El nombre, correo y fechas son obligatorios');
      return;
    }
    setIsLoading(true);
    const method = id ? 'PATCH' : 'POST';
    const url = id 
      ? `http://192.168.7.6:3000/reservas/${id}` 
      : 'http://192.168.7.6:3000/reservas';
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        Alert.alert('Éxito', id ? 'Reserva actualizada' : 'Reserva creada');
        navigation.goBack();
      } else {
        const errorData = await response.json();
        Alert.alert('Error', JSON.stringify(errorData.message));
      }
    } catch (error) {
      Alert.alert('Error de red', 'No se pudo conectar con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert('Eliminar Reserva', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: async () => {
        try {
          const response = await fetch(`http://192.168.7.6:3000/reservas/${id}`, { method: 'DELETE' });
          if (response.ok) {
            Alert.alert('Éxito', 'Reserva eliminada');
            navigation.goBack();
          }
        } catch (error) {}
      }},
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, paddingBottom: 50 }}>
      <Text style={styles.title}>{id ? 'Editar Reserva' : 'Nueva Reserva'}</Text>

      <TextInput style={styles.input} placeholder="Nombre del Huésped" value={form.nombre_huesped} onChangeText={(t) => handleChange('nombre_huesped', t)} />
      <TextInput style={styles.input} placeholder="Correo" value={form.correo} onChangeText={(t) => handleChange('correo', t)} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Teléfono" value={form.telefono} onChangeText={(t) => handleChange('telefono', t)} />

      <Text style={styles.label}>Tipo de Habitación</Text>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setShowDropdown(true)}>
        <Text style={styles.dropdownButtonText}>{form.tipo_habitacion}</Text>
        <Text style={styles.dropdownIcon}>▼</Text>
      </TouchableOpacity>

      <Modal visible={showDropdown} transparent={true} animationType="fade" onRequestClose={() => setShowDropdown(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setShowDropdown(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona una opción</Text>
            {TIPOS_HABITACION.map((tipo) => (
              <TouchableOpacity
                key={tipo}
                style={[styles.dropdownItem, form.tipo_habitacion === tipo && styles.dropdownItemSelected]}
                onPress={() => { handleChange('tipo_habitacion', tipo); setShowDropdown(false); }}
              >
                <Text style={[styles.dropdownItemText, form.tipo_habitacion === tipo && styles.dropdownItemTextSelected]}>{tipo}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <Text style={styles.label}>Fecha de Entrada</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowEntrada(true)}>
        <Text style={{ color: form.fecha_entrada ? '#222222' : '#A0AEC0' }}>{form.fecha_entrada || 'Seleccionar fecha'}</Text>
      </TouchableOpacity>
      {showEntrada && <DateTimePicker value={form.fecha_entrada ? new Date(form.fecha_entrada + 'T12:00:00') : new Date()} mode="date" display="default" onChange={(e, d) => onChangeDate(e, d, 'fecha_entrada')} />}

      <Text style={styles.label}>Fecha de Salida</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowSalida(true)}>
        <Text style={{ color: form.fecha_salida ? '#222222' : '#A0AEC0' }}>{form.fecha_salida || 'Seleccionar fecha'}</Text>
      </TouchableOpacity>
      {showSalida && <DateTimePicker value={form.fecha_salida ? new Date(form.fecha_salida + 'T12:00:00') : new Date()} mode="date" display="default" onChange={(e, d) => onChangeDate(e, d, 'fecha_salida')} />}

      <TextInput style={styles.input} placeholder="Número de Huéspedes" value={form.numero_huespedes} onChangeText={(t) => handleChange('numero_huespedes', t)} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Solicitudes Especiales" value={form.solicitudes_especiales} onChangeText={(t) => handleChange('solicitudes_especiales', t)} />

      <Text style={styles.label}>Fotos</Text>
      <View style={styles.imagesRow}>
        <ImagePickerSection label="Foto 1" image64={form.imagen_1} onChange={(b) => handleChange('imagen_1', b)} />
        <ImagePickerSection label="Foto 2" image64={form.imagen_2} onChange={(b) => handleChange('imagen_2', b)} />
      </View>
      <View style={styles.imagesRow}>
        <ImagePickerSection label="Foto 3" image64={form.imagen_3} onChange={(b) => handleChange('imagen_3', b)} />
        <ImagePickerSection label="Foto 4" image64={form.imagen_4} onChange={(b) => handleChange('imagen_4', b)} />
      </View>

      <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? 'Guardando...' : (id ? 'Actualizar Reserva' : 'Guardar Reserva')}</Text>
      </TouchableOpacity>

      {id && (
        <TouchableOpacity style={styles.buttonDanger} onPress={handleDelete}>
          <Text style={styles.buttonText}>Eliminar Reserva</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}