"use client";

import React, { useState } from 'react';
import Botonera from './componentes/botoneraGramajes';
import DetallesPedido from './componentes/DetallesPedido';
import Promociones from './componentes/Promociones';
import NavBar from './componentes/NavBarConfig';
import styles from './estilos/NavBar.module.css'

export default function Home() {
  const [pedidos, setPedidos] = useState([]);
  const [totalGastado, setTotalGastado] = useState(0);
  const [pedidoAModificar, setPedidoAModificar] = useState(null);
  const [indexAModificar, setIndexAModificar] = useState(null);
  const [seccionActual, setSeccionActual] = useState('pesos'); // Sección actual (pesos o gustos)

  // Función para agregar o modificar un pedido y actualizar el total
  const agregarPedido = (peso, gustos, precio) => {
    if (pedidoAModificar !== null && indexAModificar !== null) {
      // Si hay un pedido a modificar, reemplázalo
      const nuevosPedidos = [...pedidos];
      const precioAnterior = nuevosPedidos[indexAModificar].precio;
      nuevosPedidos[indexAModificar] = { peso, gustos, precio };
      setPedidos(nuevosPedidos);
      // Actualizar el total gastado
      setTotalGastado(totalGastado - precioAnterior + precio);
      // Limpiar las variables de modificación
      setPedidoAModificar(null);
      setIndexAModificar(null);
    } else {
      setPedidos([...pedidos, { peso, gustos, precio }]);
      setTotalGastado(totalGastado + precio);
    }
    setSeccionActual('pesos'); // Volver a la sección de pesos después de agregar/modificar
  };

  // Función para borrar un producto y actualizar el total gastado
  const borrarProducto = (index) => {
    const pedido = pedidos[index];
    setTotalGastado(totalGastado - pedido.precio);
    const nuevosPedidos = pedidos.filter((_, i) => i !== index);
    setPedidos(nuevosPedidos);
    // Si estaba en la sección de gustos, volver a pesos
    if (seccionActual === 'gustos') {
      setSeccionActual('pesos');
    }
    // Limpiar los datos de modificación en caso de estar editando un producto
    setPedidoAModificar(null);
    setIndexAModificar(null);
  };

  // Función para modificar un producto
  const modificarProducto = (pedido, index) => {
    setPedidoAModificar(pedido);
    setIndexAModificar(index);
    setSeccionActual('gustos'); // Cambiar a la sección de gustos al modificar un producto
  };

  return (
    <>
      <NavBar />
      <div className={styles.mainContent}> {/* Aplica el margen superior aquí */}
        <DetallesPedido
          pedidos={pedidos}
          totalGastado={totalGastado}
          borrarProducto={borrarProducto}
          modificarProducto={modificarProducto}
        />
        <div className={styles.containerBotonera} style={{ marginLeft: '40%' }}>
          <Promociones />
          <Botonera
            agregarPedido={agregarPedido}
            pedidoAModificar={pedidoAModificar}
            seccionActual={seccionActual}
            setSeccionActual={setSeccionActual} // Pasar el setter para cambiar secciones 
          />
        </div>
      </div>
    </>
  );
}
