export const tareasThemes = {
  oscuro: {
    fondo:       '#1A1A1A',
    superficie:  '#2A2A2A',
    texto:       '#FFFFFF',
    textoSec:    '#B0B0B0',
    borde:       '#3A3A3A',
    acento:      '#2563EB',
    acentoClaro: '#60A5FA',
    botonTexto:  '#FFFFFF',
    btnEliminar: '#B91C1C',
  },
  claro: {
    fondo:       '#F8F9FA',
    superficie:  '#FFFFFF',
    texto:       '#1A1A1A',
    textoSec:    '#6C757D',
    borde:       '#DEE2E6',
    acento:      '#FF3366',
    acentoClaro: '#FF6B93',
    botonTexto:  '#FFFFFF',
    btnEliminar: '#DC3545',
  },
  calido: {
    fondo:       '#1E1B18',
    superficie:  '#2E2724',
    texto:       '#FDF8F5',
    textoSec:    '#A8A29E',
    borde:       '#44403C',
    acento:      '#F97316',
    acentoClaro: '#FDBA74',
    botonTexto:  '#000000',
    btnEliminar: '#DC2626',
  },
};

export type TareaThemeName = keyof typeof tareasThemes;