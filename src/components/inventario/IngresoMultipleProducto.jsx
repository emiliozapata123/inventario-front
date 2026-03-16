import Loading from "../layout/Loading";
import ProductoInventarioRow from "./ProductoInventarioRow";

const IngresoMultipleProductos = ({ productos, seleccionados, setSeleccionados, loading, busqueda}) => {
    const busquedaProductos = productos?.filter((p)=> p?.nombre?.toLowerCase().includes(busqueda?.toLowerCase()));

    const handleSelected = (id) => {
        setSeleccionados((prev) => ({
            ...prev,
            productos:
                prev.productos.some(p => p.id === id) ? prev.productos.filter(p => p.id !== id):
                [...prev.productos,
                    {id,cantidad:1,stockMinimo:0}
                ]
        }));
    };

    const aumentar = (id) => {
        setSeleccionados((prev) => ({
            ...prev,
            productos: 
            prev.productos.map(p => p.id === id ? {
            ...p,
            cantidad:p.cantidad+1
            }:p)}
        ));
    }

    const disminuir = (id) => {
        setSeleccionados((prev) => ({
            ...prev,
            productos:
            prev.productos.map(p => p.id === id && p.cantidad > 1 ? {
                ...p,
                cantidad:p.cantidad-1
            }:p)}
        ));
    };

    const aumentarStockMinimo = (id) => {
        setSeleccionados((prev) => ({
            ...prev,
            productos: 
            prev.productos.map(p => p.id === id ? {
            ...p,
            stockMinimo:p.stockMinimo+1
            }:p)}
        ));
    }

    const disminuirStockMinimo = (id) => {
        setSeleccionados((prev) => ({
            ...prev,
            productos:
            prev.productos.map(p => p.id === id && p.stockMinimo > 0 ? {
                ...p,
                stockMinimo:p.stockMinimo-1
            }:p)}
        ));
    };

    const ingresarStockMinimo = (id, stockMinimo) => {
        setSeleccionados((prev) => ({
            ...prev,
            productos:
            prev.productos.map((p)=> p.id === id ? {
                ...p,
                stockMinimo:Number(stockMinimo)
            }:p)
        }));
    }

    const ingresarCantidad = (id, cantidad) => {
        setSeleccionados((prev) => ({
            ...prev,
            productos:
            prev.productos.map(p => p.id === id ? {
                ...p,
                cantidad: Number(cantidad)
            }:p)
        }));
    }

    return (
        <>
            <div className="card table-responsive table-scroll" style={{maxHeight:"27rem",overflow:"auto"}}>
                <table className="table table-hover">
                    <thead className="bg-blue">
                        <tr>
                            <th></th>
                            <th>Producto</th>
                            <th>Descripcion</th>
                            <th className="text-center th-nowrap">Ingresar Cantidad</th>
                            <th className="text-center th-nowrap">Stock Minimo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-5">
                                    No hay productos registrados
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
                            const seleccionado = seleccionados.find(s => s.id === p.id);
                            return (
                                <ProductoInventarioRow
                                    key={p.id}
                                    producto={p}
                                    seleccionado={seleccionado}
                                    handleSelected={handleSelected}
                                    aumentar={aumentar}
                                    ingresarCantidad={ingresarCantidad}
                                    disminuir={disminuir}
                                    aumentarStockMinimo={aumentarStockMinimo}
                                    ingresarStockMinimo={ingresarStockMinimo}
                                    disminuirStockMinimo={disminuirStockMinimo}
                                />
                            )})
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </>
        
    );
};

export default IngresoMultipleProductos;