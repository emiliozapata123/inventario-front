import Loading from "../layout/Loading";
import ProductoMovimientoRow from "./ProductoMovimientoRow";
import { Plus } from "react-bootstrap-icons";

const TablaInventarioMovimiento = ({productos, seleccionados, setSeleccionados, handleClick, limpiar, loading, busqueda, enviando}) => {
    const busquedaProductos = productos?.filter((p)=> p?.producto?.nombre?.toLowerCase().includes(busqueda?.toLowerCase()));

    const toggleProducto = (producto) => {
        setSeleccionados(prev => {

            const existe = prev.productos.find(p => p.id === producto.producto.id);

            if(existe){
                return {
                    ...prev,
                    productos: prev.productos.filter(p => p.id !== producto.producto.id)
                }
            }

            return {
                ...prev,
                productos: [...prev.productos, {id: producto.producto.id, cantidad:1}]
            }

        });

    }

    const aumentar = (id, stock) => {
        setSeleccionados(prev => ({
            ...prev,
            productos: prev.productos.map(p => 
                p.id === id && p.cantidad < stock
                ? {...p, cantidad:p.cantidad+1}
                : p
            )
        }))
    }

    const disminuir = (id) => {
        setSeleccionados(prev => ({
            ...prev,
            productos: prev.productos.map(p => 
                p.id === id && p.cantidad > 1
                ? {...p, cantidad:p.cantidad-1}
                : p
            )
        }))
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
    }

    return(
        <>
            <div className="card table-responsive table-scroll mt-2" style={{maxHeight:"27rem",overflow:"auto"}}>
                <table className="table table-hover">
                    <thead className="bg-blue">
                        <tr>
                            <th></th>
                            <th>Producto</th>
                            <th className="text-center">Cantidad Disponible</th>
                            <th>Descripcion</th>
                            <th className="text-center">Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-5">
                                    No hay productos, selecciona una bodega
                                </td>
                            </tr>
                        ):( 
                            loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-5">
                                        <Loading/>
                                    </td>
                                </tr>
                        ):(
                            busquedaProductos?.map(p => {
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
                            }
                        )))}

                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-end gap-3 mt-2">
                <button className="btn btn-outline-secondary"type="button" onClick={limpiar}>Cancelar</button>
                <button 
                    className="btn btn-primary d-flex align-items-center"
                    disabled={enviando}
                    onClick={handleClick}
                >
                    {enviando ? (
                        <>
                            <span 
                                className="spinner-border spinner-border-sm me-2" 
                                role="status" 
                                aria-hidden="true"
                            ></span>
                            Enviando...
                        </>
                    ) : (
                        <>
                        <Plus size={24} className="me-1" />
                        Registrar Movimiento
                        </>
                    )}
                </button>
            </div>
        </>
    )
}

export default TablaInventarioMovimiento;







