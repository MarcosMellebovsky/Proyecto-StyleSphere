import '@fortawesome/fontawesome-svg-core/styles.css'; // Importa los estilos CSS de Font Awesome
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false; // Evita la adición automática de CSS

// Importa tus propios estilos
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;
