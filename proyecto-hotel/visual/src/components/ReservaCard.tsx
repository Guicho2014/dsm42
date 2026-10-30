import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Colors } from '../theme/appTheme';

interface Props {
  reserva: any;
  onPress: () => void;
}

export const ReservaCard = ({ reserva, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{reserva.nombre_huesped || 'Sin nombre'}</Text>
        <Text style={styles.badge}>{reserva.tipo_habitacion || 'Sencilla'}</Text>
      </View>
      <Text style={styles.text}> {reserva.correo || 'Sin correo'}</Text>
      <Text style={styles.text}> {reserva.telefono || 'Sin teléfono'}</Text>
      <Text style={styles.dates}> {reserva.fecha_entrada || '?'} a {reserva.fecha_salida || '?'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { 
    backgroundColor: Colors.white, 
    padding: 18, 
    marginHorizontal: 20, 
    marginBottom: 15, 
    borderRadius: 16, 
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
      android: { elevation: 3 },
    }),
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '700', color: Colors.dark, flex: 1, marginRight: 10 },
  badge: { backgroundColor: Colors.primary, color: Colors.white, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, fontSize: 12, fontWeight: 'bold', overflow: 'hidden' },
  text: { fontSize: 14, color: Colors.grayText, marginBottom: 4 },
  dates: { fontSize: 13, color: Colors.dark, marginTop: 10, fontWeight: '600' },
});