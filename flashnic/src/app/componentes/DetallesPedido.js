"use client";

import React, { useState } from "react";
import styles from '../estilos/DetallePedido.module.css';

const DetallesPedido = ({ pedidos, totalGastado, borrarProducto, modificarProducto }) => {
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [repartidor, setRepartidor] = useState('');

    return (
        <div className={styles.detallesContainer}>
            {/* Sección superior: Detalles del Cliente */}
            <div className={styles.detallesCliente}>
                <h2>Detalles del Cliente</h2>
                <form>
                    <div>
                        <label className={styles.etiqueta}>Teléfono:</label>
                        <input
                            type="text"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                            className={styles.etiquetaInput}
                        />
                    </div>
                    <div>
                        <label className={styles.etiqueta}>Dirección:</label>
                        <input
                            type="text"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            required
                            className={styles.etiquetaInput}
                        />
                    </div>
                    <div>
                        <label className={styles.etiqueta}>Repartidor:</label>
                        <input
                            type="text"
                            value={repartidor}
                            onChange={(e) => setRepartidor(e.target.value)}
                            required
                            className={styles.etiquetaInput}
                        />
                    </div>
                </form>
            </div>

            {/* Separador */}
            <div className={styles.divider}></div>

            {/* Sección inferior: Detalles del Pedido */}
            <div className={styles.detallesPedido}>
                <h2>Detalles del Pedido</h2>

                <div className={styles.tablaPedidosContainer}>
                    <table border="1" className={styles.pedidosTable}>
                        <thead>
                            <tr>
                                <th>PRODUCTOS</th>
                                <th>PRECIO</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos.map((pedido, index) => (
                                <tr key={index}>
                                    <td>
                                        {pedido.peso}
                                        <ul className={styles.gustosList}>
                                            {pedido.gustos.map((gusto, i) => (
                                                <li key={i} className={styles.gustoItem}>{gusto}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>${pedido.precio}</td>
                                    <td>
                                        <div className={styles['table-cell-buttons']}>
                                            <button
                                                onClick={() => modificarProducto(pedido, index)}
                                                className={styles.botonAccion}
                                                aria-label="Modificar"
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                onClick={() => borrarProducto(index)}
                                                className={styles.botonAccion}
                                                aria-label="Borrar"
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Barra de Total Gastado */}
                <div className={styles.totalBar}>
                    <span className={styles.totalText}>Total Gastado:</span>
                    <span className={styles.totalAmount}>${totalGastado}</span>
                </div>
            </div>
        </div>
    );
};

export default DetallesPedido;
