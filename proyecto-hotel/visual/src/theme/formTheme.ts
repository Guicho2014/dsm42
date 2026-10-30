import { StyleSheet, Platform } from 'react-native';
import { appTheme, Colors } from './appTheme';

export const formTheme = StyleSheet.create({
  ...appTheme,
  
  dropdownButton: {
    ...appTheme.input,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownIcon: {
    fontSize: 12,
    color: Colors.grayText,
  },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10 },
      android: { elevation: 8 },
    }),
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.dark,
    textAlign: 'center',
    marginBottom: 16,
  },
  dropdownItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  dropdownItemSelected: {
    backgroundColor: '#FFF0F3',
    borderRadius: 8,
  },
  dropdownItemText: {
    fontSize: 16,
    color: Colors.dark,
    textAlign: 'center',
  },
  dropdownItemTextSelected: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  
  imagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
});