import { StyleSheet } from 'react-native';

export const loginTheme = StyleSheet.create({
  
  mainContainer: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 26, 0.85)',
    justifyContent: 'center',
    alignItems:"center",
  },
  darkSection: {
    paddingHorizontal: 30,
    width:'100%',
  },
  formContainer: {
    minHeight: 380,
    justifyContent: 'flex-start',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(58, 58, 58, 0.9)',
    borderRadius: 25,
    marginBottom: 40,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 25,
  },
  activeTab: {
    backgroundColor: '#EAEAEA',
  },
  tabText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#1A1A1A',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    color: '#FFFFFF',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#888888',
    paddingBottom: 8,
  },
  button: {
    backgroundColor: '#FFF0F5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  imagePickerBtn: {
    alignSelf: 'center',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A2A2A',
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFF0F5',
  },
  imagePickerText: {
    color: '#FFC0CB',
    fontSize: 10,
    textAlign: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
  },
});