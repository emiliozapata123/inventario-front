import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import SelectProductoRow from "./SelectProductoRow";
import api from "../../services/Api";

const SeleccionarProducto = ({ seleccionados, setSeleccionados, busqueda, setMovimiento }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        setLoading(true);

        try {
            const resProductos = await api("api/producto/list/");
            setProductos(await resProductos.json());
            
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const busquedaProductos = productos?.filter((p)=> p?.nombre?.toLowerCase().includes(busqueda?.toLowerCase()));

    const handleOnSelected = (producto) => {
        const id = producto.id;

        setSeleccionados((prev) => ({
            ...prev,
            productos:prev.productos.some(p => p.id === id) 
                ? prev.productos.filter(p => p.id !== id)
                : [...prev.productos, {id,cantidad:1,stockMinimo:0}]
        }));

        setMovimiento((prev) => ({
            ...prev,
            productos:prev.productos.some(p => p.id === id) 
                ? prev.productos.filter(p => p.id !== id) 
                : [...prev.productos, {id, producto, cantidad:1, stockMinimo:0}]
        }));
    };

    const aumentar = (id) => {
        setSeleccionados((prev) => ({
            ...prev,
            productos: 
            prev.productos.map(p => p.id === id 
                ? {...p, cantidad:p.cantidad+1}
                : p
            )
        }));

        setMovimiento((prev) => ({
            ...prev,
            productos:
            prev.productos.map(p => p.id === id 
                ? {...p, cantidad:p.cantidad+1}
                : p
            )
        }));
    }

    const disminuir = (id) => {
        setSeleccionados((prev) => ({
            ...prev,
            productos:
            prev.productos.map(p => p.id === id && p.cantidad > 1 
                ? {...p, cantidad:p.cantidad-1}
                : p
            )
        }));
        setMovimiento((prev) => ({
            ...prev,
            productos:
            prev.productos.map(p => p.id === id 
                ? {...p, cantidad:p.cantidad-1}
                : p
            )
        }));

    };

    const aumentarStockMinimo = (id) => {
        setSeleccionados((prev) => ({
            ...prev,
            productos: 
            prev.productos.map(p => p.id === id 
                ? {...p, stockMinimo:p.stockMinimo+1}
                : p
            )
        }));
        setMovimiento((prev) => ({
            ...prev,
            productos: 
            prev.productos.map(p => p.id === id 
                ? {...p, stockMinimo:p.stockMinimo+1}
                : p
            )
        }));
    }

    const disminuirStockMinimo = (id) => {
        setSeleccionados((prev) => ({
            ...prev,
            productos:
            prev.productos.map(p => p.id === id && p.stockMinimo > 0 
                ? {...p, stockMinimo:p.stockMinimo-1}
                : p
            )
        }));

        setMovimiento((prev) => ({
            ...prev,
            productos:
            prev.productos.map(p => p.id === id && p.stockMinimo > 0 
                ? {...p, stockMinimo:p.stockMinimo-1}
                : p
            )
        }));
    };

    const ingresarStockMinimo = (id, stockMinimo) => {
        setSeleccionados((prev) => ({
            ...prev,
            productos:
            prev.productos.map((p)=> p.id === id 
                ? {...p, stockMinimo:Number(stockMinimo)}
                : p
            )
        }));
        setMovimiento((prev) => ({
            ...prev,
            productos:
            prev.productos.map((p)=> p.id === id 
                ? {...p, stockMinimo:Number(stockMinimo)}
                : p
            )
        }));
    }

    const ingresarCantidad = (id, cantidad) => {
        setSeleccionados((prev) => ({
            ...prev,
            productos:
            prev.productos.map(p => p.id === id 
                ? {...p, cantidad: Number(cantidad)}
                : p
            )
        }));

        setMovimiento((prev) => ({
            ...prev,
            productos:
            prev.productos.map(p => p.id === id 
                ? {...p, cantidad: Number(cantidad)}
                : p
            )
        }));
    }

    const handleOnCantidad = (action, id, value) => {
        if (action === "aumentar") {
            aumentar(id);
        } else if (action === "disminuir") {
            disminuir(id);
        } else if (action === "aumentarStockMinimo") {
            aumentarStockMinimo(id);
        } else if (action === "disminuirStockMinimo") {
            disminuirStockMinimo(id);
        } else if (action === "ingresarStockMinimo") {
            ingresarStockMinimo(id,value);
        } else if (action === "ingresar") {
            ingresarCantidad(id,value);
        }
    }

    return (
        <>
            <div className="card table-responsive table-scroll" style={{maxHeight:"27rem",overflow:"auto"}}>
                <table className="table table-hover mb-0">
                    <thead className="bg-blue">
                        <tr>
                            <th>Producto</th>
                            <th>Descripcion</th>
                            <th className="text-center th-nowrap">Ingresar Cantidad</th>
                            <th className="text-center th-nowrap">Stock Minimo</th>
                            <th className="text-center">Seleccionar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-5">
                                    <Loading/>
                                </td>
                            </tr>
                        ):(productos.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-5">
                                    No hay productos registrados
                                </td>
                            </tr>
                        ):(
                            busquedaProductos.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-5">
                                        No se encontraron productos
                                    </td>
                                </tr>
                            ):(
                                busquedaProductos?.map(p => {
                                const seleccionado = seleccionados.find(s => s.id === p.id);
                                return (
                                    <SelectProductoRow
                                        key={p.id}
                                        producto={p}
                                        seleccionado={seleccionado}
                                        handleOnSelected={handleOnSelected}
                                        handleOnCantidad={handleOnCantidad}
                                        
                                    />
                                )})
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
        
    );
};

export default SeleccionarProducto;