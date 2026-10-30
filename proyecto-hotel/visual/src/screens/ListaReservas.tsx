import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useReservaApi } from '../hooks/useReservaApi';
import { ReservaCard } from '../components/ReservaCard';
import { Colors } from '../theme/appTheme';

export default function ListaReservas({ navigation }: any) {
  const { isLoading, listaReservas, cargarReservas } = useReservaApi();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <FlatList
        data={listaReservas}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={cargarReservas} tintColor={Colors.primary} />
        }
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50, color: Colors.grayText, fontSize: 16 }}>
            No hay reservas registradas
          </Text>
        }
        renderItem={({ item }) => (
          <ReservaCard 
            reserva={item} 
            onPress={() => navigation.navigate('FormReservaScreen', { id: item.id })}
          />
        )}
        contentContainerStyle={{ paddingTop: 15, paddingBottom: 20 }}
      />
    </View>
  );
};