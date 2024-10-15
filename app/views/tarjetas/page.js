"use client";
import { useState } from 'react';
import styles from './tarjetas.module.css';
import Link from 'next/link';
const Tarjetas = () => {
  const [tarjetas, setTarjetas] = useState([
    { id: 1, numero: '**** **** **** 1234', fechaExpiracion: '12/25' },
    { id: 2, numero: '**** **** **** 5678', fechaExpiracion: '11/24' },
  ]);

  const [nuevaTarjeta, setNuevaTarjeta] = useState({
    numero: '',
    titular: '',
    fechaExpiracion: '',
    cvv: '',
  });

  const [mostrandoCampos, setMostrandoCampos] = useState(false);

  const agregarTarjeta = () => {
    if (
      nuevaTarjeta.numero.length === 12 &&
      nuevaTarjeta.fechaExpiracion &&
      nuevaTarjeta.cvv.length === 3
    ) {
      setTarjetas([
        ...tarjetas,
        { id: tarjetas.length + 1, numero: nuevaTarjeta.numero, fechaExpiracion: nuevaTarjeta.fechaExpiracion },
      ]);
      setNuevaTarjeta({ numero: '', titular: '', fechaExpiracion: '', cvv: '' });
      setMostrandoCampos(false);
    }
  };

  const eliminarTarjeta = (id) => {
    setTarjetas(tarjetas.filter(tarjeta => tarjeta.id !== id));
  };

  return (
    <>

    <div className={styles.container}>
         
   
     <div className={styles.VolverHeader}>
          <Link className={styles.AHeader} href="./perfil">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
            </svg>
          </Link>
          </div> 
          <h1 className={styles.txt}>Mis tarjetas</h1>  
          <div className={styles.separator}>
        <hr className={styles.line} />
      </div>
      <p className={styles.txtp}>Tarjetas guardadas:</p>  
 
          <div className={styles.papainpt}>
          <div className={styles.InputContainerr}>
          <div className={styles.visaCardd}>
  <svg viewBox="0 0 48 48" height="23" width="23" y="0px" x="0px" xmlns="http://www.w3.org/2000/svg" className={styles.logoo}>
            <path d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" fill="#ff9800"></path><path d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" fill="#d50000"></path><path d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z" fill="#ff3d00"></path>
            </svg>

</div>
  <input placeholder="0000 0000 0000 0000" id="input" className={styles.inputt} name="text" type="text" input/>
  <div class="form-check">
  <input type="radio"  input/>
</div>
  </div>
 
</div>
<div className={styles.papainpt}>
          <div className={styles.InputContainerr}>
          <div className={styles.visaCardd}>
  <svg viewBox="0 0 48 48" height="23" width="23" y="0px" x="0px" xmlns="http://www.w3.org/2000/svg" className={styles.logoo}>
            <path d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" fill="#ff9800"></path><path d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" fill="#d50000"></path><path d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z" fill="#ff3d00"></path>
            </svg>

</div>
  <input placeholder="0000 0000 0000 0000" id="input" className={styles.inputt} name="text" type="text" input/>
  <div class="form-check">
  <input type="radio"  input/>
</div>
  </div>
 
</div>
<div className={styles.papainpt}>
          <div className={styles.InputContainerr}>
          <div className={styles.visaCardd}>
  <svg viewBox="0 0 48 48" height="23" width="23" y="0px" x="0px" xmlns="http://www.w3.org/2000/svg" className={styles.logoo}>
            <path d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" fill="#ff9800"></path><path d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" fill="#d50000"></path><path d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z" fill="#ff3d00"></path>
            </svg>

</div>
  <input placeholder="0000 0000 0000 0000" id="input" className={styles.inputt} name="text" type="text" input/>
  <div class="form-check">
  <input type="radio"  input/>
</div>
  </div>
 
</div>
<div className={styles.visacard}>
  <div className={styles.logoContainer}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="23"
      height="23"
      viewBox="0 0 48 48"
      className={styles.svgLogo}
    >
      <path
        fill="#ff9800"
        d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
      ></path>
      <path
        fill="#d50000"
        d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
      ></path>
      <path
        fill="#ff3d00"
        d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
      ></path>
    </svg>
  </div>
  <div className={styles.numbercontainer}>
    <label className={styles.inputlabel} for="cardNumber">CARD NUMBER</label>
    <input
      className={styles.inputstyle}
      id="cardNumber"
      placeholder="XXXX XXXX XXXX XXXX"
      name="cardNumber"
      type="text"
    />
  </div>

  <div className={styles.namedatecvvcontainer}>
    <div className={styles.namewrapper}>
      <label className={styles.inputlabel} for="holderName">CARD HOLDER</label>
      <input
        className={styles.inputstyle}
        id="holderName"
        placeholder="NAME"
        type="text"
      />
    </div>

    <div className={styles.expirywrapper}>
      <label className={styles.inputlabel} for="expiry">VALID THRU</label>
      <input className={styles.inputstyle} id="expiry" placeholder="MM/YY" type="text" />
    </div>
    <div className={styles.cvvwrapper}>
      <label className={styles.inputlabel} for="cvv">CVV</label>
      <input
        className={styles.inputstyle}
        placeholder="***"
        maxlength="3"
        id="cvv"
        type="password"
      />
    </div>
  </div>
</div>

    </div></>
  );
};

export default Tarjetas;
