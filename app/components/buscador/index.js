import React from 'react';
import Image from 'next/image';
import Styles from "./navegador.module.css"
import Link from 'next/link';

const SearchBar = ({ value, onChange, onSearch, onFocus }) => {
  return (
    <div style={styles.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#000000"
      >
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
      <input
        className={Styles.inputClass}
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder="Buscar..."
        style={styles.input}
      />
      <Link href={""}>
      <Image width={25} height={25} src={"/filtrar.png"}></Image>
      </Link>
    </div>
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
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default SearchBar;
