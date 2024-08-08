import { React, useState, useEffect } from 'react';
import Image from 'next/image';
import Styles from "./navegador.module.css";
import Link from 'next/link';

const SearchBar = ({ value, onChange = () => {}, onSearch, onFocus }) => {

  const [result, setResult] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(history);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      console.log("Backspace presionado");
      handleChange(e);
    }
  };

  const handleChange = async (e) => {
    const searchQuery = e.target.value.toLowerCase();
    onChange(e); 

    if (searchQuery === '') {
      setFilteredResult([]);
      setShowNoResults(false); // No mostrar el mensaje si el input está vacío
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/buscador/${encodeURIComponent(searchQuery)}`);
      
      if (!res.ok) throw new Error('Error en la solicitud');
    
      const data = await res.json();
    
      // Si quieres filtrar en el frontend, este bloque es necesario
      const filtered = data.filter(item =>
        item.nombre.toLowerCase().includes(searchQuery.toLowerCase()) // Asegúrate de comparar en minúsculas para evitar problemas de case-sensitive
      );
    
      setResult(data); // Guarda los datos completos si los necesitas
      setFilteredResult(filtered); // Guarda los datos filtrados
    
      // Mostrar el mensaje "No Results" si no se encuentra nada y la búsqueda no está vacía
      setShowNoResults(filtered.length === 0);
    
    } catch (error) {
      console.error('Error fetching search results:', error);
      setFilteredResult([]); // Limpia los resultados
      setShowNoResults(true); // Mostrar mensaje si hay un error
    }
    
  };

  const handleSearchClick = (query) => {
    onChange({ target: { value: query } });
    handleChange({ target: { value: query } });
  };

  const handleSelect = (query) => {
    const updatedHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  const handleFocus = () => {
    setIsInputFocused(true);
    onFocus && onFocus();
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsInputFocused(false);
    }, 200); 
  };

  return (
    <>
      <div style={styles.container}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        <input
          className={Styles.inputClass}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Buscar..."
          style={styles.input}
        />

        <Link href={"./filtro"}>
          <Image width={25} height={25} src={"/filtrar.png"} alt="Filtrar" />
        </Link>
      </div>

      {/* Mostrar mensaje si no hay resultados y el input no está vacío */}
      {showNoResults && value !== '' && (
        <div style={styles.noResults}>
          No se encontraron resultados
        </div>
      )}

      <ul style={styles.resultList}>
        {filteredResult.map((r, index) => (
          <li key={`${r.idTipoProducto}-${index}`} style={styles.resultItem}>
            <Link 
              href={`/views/categorias?idTipoProducto=${r.idTipoProducto}`} 
              style={styles.resultLink}
              onClick={() => handleSelect(r.nombre)}
            >
              <div style={styles.imageContainer}>
                <img src={r.imagen} alt={r.nombre} style={styles.resultImage} />
              </div>
              <div style={styles.resultText}>
                {r.nombre}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {isInputFocused && value === '' && searchHistory.length > 0 && (
        <div style={styles.historyContainer}>
          <h4 style={styles.historyTitle}>Historial de búsqueda</h4>
          <ul style={styles.historyList}>
            {searchHistory.map((query, index) => (
              <li key={index} style={styles.historyItem} onClick={() => handleSearchClick(query)}>
                {query}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '5px 10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '10px',
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
  },
  resultList: {
    listStyleType: 'none',
    padding: 0,
    marginTop: '10px',
    width: '100%',
  },
  resultItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    marginBottom: '5px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s',
  },
  resultLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit',
    width: '100%',
  },
  imageContainer: {
    width: '50px',
    height: '50px',
    overflow: 'hidden',
    borderRadius: '50%',
    marginRight: '10px',
  },
  resultImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  resultText: {
    fontSize: '16px',
    fontWeight: '500',
  },
  noResults: {
    marginTop: '10px',
    color: '#999',
    fontSize: '16px',
    textAlign: 'center',
  },
  historyContainer: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  historyTitle: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  historyList: {
    listStyleType: 'none',
    padding: 0,
  },
  historyItem: {
    padding: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    borderBottom: '1px solid #ddd',
  },
  historyItemHover: {
    backgroundColor: '#f0f0f0',
  },
  '@media (max-width: 300px)': {
    container: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    input: {
      fontSize: '14px',
      padding: '8px',
    },
    resultItem: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    imageContainer: {
      width: '40px',
      height: '40px',
      marginBottom: '5px',
    },
    resultText: {
      fontSize: '14px',
      textAlign: 'center',
      marginTop: '5px',
    },
  },
};

export default SearchBar;
