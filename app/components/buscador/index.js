import { React, useState, useEffect } from 'react';
import Image from 'next/image';
import Styles from "./navegador.module.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SearchBar = ({ value, onChange = () => {}, onFocus, searchScope = "todos" }) => {
  const router = useRouter();
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
    if (e.key == "Backspace") {
      handleChange(e);
    }
  };

  const handleChange = async (e) => {
    const searchQuery = e.target.value.toLowerCase();
    onChange(e);

    if (searchQuery == '') {
      setFilteredResult([]);
      setShowNoResults(false);
      return;
    }

    try {
      const endpoint = searchScope == "locales"
        ? `http://localhost:3001/api/buscador/local/${encodeURIComponent(searchQuery)}`
        : `http://localhost:3001/api/buscador/${encodeURIComponent(searchQuery)}`;

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('Error en la solicitud');
      const data = await res.json();
      const filtered = data.filter(item =>
        item.nombre.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResult(data);
      setFilteredResult(filtered);
      setShowNoResults(filtered.length == 0);
    } catch (error) {
      setFilteredResult([]);
      setShowNoResults(true);
    }
  };

  const handleSearchClick = (query) => {
    onChange({ target: { value: query } });
    handleChange({ target: { value: query } });
  };

  const handleSelect = (item) => {
    const updatedHistory = [item.nombre, ...searchHistory.filter(q => q != item.nombre)].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

    if (item.idTienda) {
      router.push(`/views/categorias_locales?idTienda=${item.idTienda}`);
    } else if (item.idProducto) {
      router.push(`/views/detalle_producto?idProducto=${item.idProducto}`);
    } else if (item.idTipoProducto) {
      router.push(`/views/categorias?idTipoProducto=${item.idTipoProducto}`);
    }
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
    <div className={Styles.searchContainer}>
      <div className={Styles.container}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#555"
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
        />

        <Link href={"./filtro"}>
          <Image width={25} height={25} src={"/filtrar.png"} alt="Filtrar" />
        </Link>
      </div>

      {showNoResults && value != '' && (
        <div className={Styles.noResults}>
          No existe ese producto
        </div>
      )}

      {isInputFocused && (filteredResult.length > 0 || showNoResults) && (
        <ul className={Styles.resultList}>
          {filteredResult.map((item, index) => (
            <li key={`${item.id}-${index}`} className={Styles.resultItem} onClick={() => handleSelect(item)}>
              <div className={Styles.imageContainer}>
                <img src={item.imagen} alt={item.nombre} className={Styles.resultImage} />
              </div>
              <div className={Styles.resultText}>
                {item.nombre}
              </div>
            </li>
          ))}
        </ul>
      )}

      {isInputFocused && value == '' && searchHistory.length > 0 && (
        <div className={Styles.historyContainer}>
          <h4 className={Styles.historyTitle}>Historial de búsqueda</h4>
          <ul className={Styles.historyList}>
            {searchHistory.map((query, index) => (
              <li key={index} className={Styles.historyItem} onClick={() => handleSearchClick(query)}>
                {query}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
