"use client";

import React from "react";
import styles from '../estilos/Promociones.module.css';

const Promociones = () => {
  const handleClick = () => {
    alert('Haz clicado en Promoción 1');
  };

  return (
    <div className={styles.promocionContainer}>
      <div className={styles.botonPromocion} onClick={handleClick}>
        <h2>Promoción 1</h2>
      </div>
    </div>
  );
};

export default Promociones;
