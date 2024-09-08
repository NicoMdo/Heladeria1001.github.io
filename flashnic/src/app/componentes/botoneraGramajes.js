"use client";

import React, { useState, useEffect } from "react";
import styles from '../estilos/Botonera.module.css';

const Botonera = ({ agregarPedido, pedidoAModificar, seccionActual, setSeccionActual }) => {
  const [pesoSeleccionado, setPesoSeleccionado] = useState('');
  const [gustosSeleccionados, setGustosSeleccionados] = useState([]);

  const botones = ['1kg', '1/2kg', '1/4kg', 'Cucurucho'];
  const gustos = [
    'Vainilla', 'Flan Con Dulce', 'Flan', 'Frutilla a la crema', 'Frutilla al Agua', 
    'Dulce de leche', 'Dulce de leche granizado', 'Chocolate', 'Chocolate amargo', 
    'Chocolate con almendras', 'Menta granizada', 'Crema americana', 'Crema del cielo', 
    'Limón', 'Naranja', 'Mango', 'Cereza', 'Café', 'Tiramisú', 'Banana split', 'Pistacho', 
    'Avellana', 'Maracuyá', 'Frutos del bosque', 'Frambuesa', 'Coco', 'Ananá', 'Durazno', 
    'Melón', 'Zanahoria y Naranja', 'Ricota con pasas', 'Chocolate blanco', 'Mascarpone', 
    'Limonada de menta', 'Castañas de cajú', 'Chocolate con naranja', 'Brownie', 
    'Crocante de maní', 'Torta de manzana', 'Helado de queso', 'Frutas tropicales'
  ];

  const precios = {
    '1kg': 1000,
    '1/2kg': 500,
    '1/4kg': 300,
    'Cucurucho': 150
  };

  const limitesGustos = {
    '1kg': 4,
    '1/2kg': 3,
    '1/4kg': 2,
    'Cucurucho': 0 // Puedes ajustar el límite aquí si lo deseas
  };

  useEffect(() => {
    // Si se va a modificar un pedido existente, llenamos los campos correspondientes
    if (pedidoAModificar) {
      setPesoSeleccionado(pedidoAModificar.peso);
      setGustosSeleccionados(pedidoAModificar.gustos);
      setSeccionActual('gustos'); // Mostrar directamente la selección de gustos
    }
  }, [pedidoAModificar, setSeccionActual]);

  const handleClick = (boton) => {
    setPesoSeleccionado(boton);
    setGustosSeleccionados([]); // Limpiar los gustos seleccionados al cambiar de peso
    setSeccionActual('gustos'); // Cambia la sección a 'gustos'
  };

  const handleGustoChange = (gusto) => {
    const maxGustos = limitesGustos[pesoSeleccionado];

    if (gustosSeleccionados.includes(gusto)) {
      setGustosSeleccionados(prevGustos => prevGustos.filter(g => g !== gusto));
    } else if (gustosSeleccionados.length < maxGustos || maxGustos === 0) {
      setGustosSeleccionados(prevGustos => [...prevGustos, gusto]);
    } else {
      alert(`Solo puedes seleccionar hasta ${maxGustos} gustos para ${pesoSeleccionado}.`);
    }
  };

  const handleVolver = () => {
    setSeccionActual('pesos'); // Volver a la sección de pesos
    setPesoSeleccionado('');
    setGustosSeleccionados([]); // Limpiar también los gustos seleccionados
  };

  const handleAplicar = () => {
    const precio = precios[pesoSeleccionado];
    agregarPedido(pesoSeleccionado, gustosSeleccionados, precio);
    handleVolver(); // Para reiniciar los datos y volver a la pantalla de pesos
  };

  return (
    <div className={styles.botoneraContainer}>
      {seccionActual === 'pesos' ? (
        botones.map((boton, index) => (
          <button
            className={styles.boton}
            key={index}
            onClick={() => handleClick(boton)}
          >
            {boton}
          </button>
        ))
      ) : (
        <div className={`${styles.gustosContainer} ${seccionActual === 'gustos' ? styles.active : ''}`}>
          <h2>Gustos para {pesoSeleccionado}</h2>
          <div className={styles.gustosGrid}>
            {gustos.map((gusto, index) => (
              <label className={styles.gustoLabel} key={index}>
                <input
                  type="checkbox"
                  className={styles.gustoCheckbox}
                  checked={gustosSeleccionados.includes(gusto)}
                  onChange={() => handleGustoChange(gusto)}
                />
                <div className={styles.cardGusto} />
                <div className={styles.gustoText}>{gusto}</div>
              </label>
            ))}
          </div>

          <div className={styles.botonesAccion}>
            <button className={styles.botonVolver} onClick={handleVolver}>
              Volver
            </button>
            <button className={styles.botonAplicar} onClick={handleAplicar}>
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Botonera;
