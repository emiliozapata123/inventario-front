import Loading from "../layout/Loading";
import ProductoMovimientoRow from "./ProductoMovimientoRow";

const SelectProductoMovimiento = ({productos, seleccionados, setSeleccionados, loading, busqueda, setMovimiento }) => {
    const busquedaLower = busqueda?.toLowerCase();
    const busquedaProductos = productos?.filter((p)=> p?.producto?.nombre?.toLowerCase().includes(busquedaLower));

    const toggleProducto = (producto) => {
        const id = producto.producto.id;
        setSeleccionados((prev) => ({
            ...prev,
            productos:prev.productos.some(p => p.id === id) ? prev.productos.filter(p => p.id !== id):
            [...prev.productos,{id,cantidad:1}]     
        }));

        setMovimiento((prev) => ({
            ...prev,
            productos:prev.productos.some(p => p.id === id) ? prev.productos.filter(p => p.id !== id):
            [...prev.productos,{id,producto:producto.producto,cantidad:1}]
        }));
    }

    const aumentar = (id, stock) => {
        setSeleccionados(prev => ({
            ...prev,
            productos: prev.productos.map(p => 
                p.id === id && p.cantidad < stock
                ? {...p, cantidad:p.cantidad+1}
                : p
            )
        }));

        setMovimiento((prev) => ({
            ...prev,
            productos:prev.productos.map(p => 
                p.id === id && p.cantidad < stock
                ? {...p, cantidad:p.cantidad+1}
                : p
            )
        }));
    }

    const disminuir = (id) => {
        setSeleccionados(prev => ({
            ...prev,
            productos: prev.productos.map(p => 
                p.id === id && p.cantidad > 1
                ? {...p, cantidad:p.cantidad-1}
                : p
            )
        }));

        setMovimiento((prev) => ({
            ...prev,
            productos:prev.productos.map(p => 
                p.id === id && p.cantidad < 1
                ? {...p, cantidad:p.cantidad-1}
                : p
            )
        }));
    }

    const ingresarCantidad = (id, cantidad, stock) => {
        if (Number(cantidad) > stock){
            return;
        }

        setSeleccionados(prev => ({
            ...prev,
            productos: prev.productos.map(p =>
                p.id === id
                ? {...p, cantidad:Number(cantidad)}
                : p
            )
        }));

        setMovimiento((prev) => ({
            ...prev,
            productos:prev.productos.map(p => 
                p.id === id
                ? {...p, cantidad:Number(cantidad)}
                : p
            )
        }));
    }

    return(
        <>
            <div className="card table-responsive table-scroll" style={{maxHeight:"27rem",overflow:"auto"}}>
                <table className="table table-hover mb-0">
                    <thead className="bg-blue">
                        <tr>
                            <th>Producto</th>
                            <th className="text-center text-nowrap">Cantidad Disponible</th>
                            <th>Descripcion</th>
                            <th className="text-center">Cantidad</th>
                            <th className="text-center">Seleccionar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    <Loading/>
                                </td>
                            </tr>
                            
                        ) : productos.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Selecciona una bodega para mostrar productos
                                </td>
                            </tr>
                        ) : busquedaProductos.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No se encontraron productos
                                    </td>
                                </tr>
                        ) : busquedaProductos?.map(p => {
                            const seleccionado = seleccionados.find(s => s.id === p.producto.id);

                            return (
                                <ProductoMovimientoRow
                                    key={p.id}
                                    p={p}
                                    seleccionado={seleccionado}
                                    toggleProducto={toggleProducto}
                                    ingresarCantidad={ingresarCantidad}
                                    aumentar={aumentar}
                                    disminuir={disminuir}
                                />
                            )
                        })}

                    </tbody>
                </table>
            </div>
            
        </>
    )
}

export default SelectProductoMovimiento;







