import { Plus, Dash } from "react-bootstrap-icons";

const ProductoInventarioRow = ({ 
    handleSelected,
    producto, 
    seleccionado, 
    aumentar, 
    disminuir, 
    ingresarCantidad, 
    aumentarStockMinimo, 
    ingresarStockMinimo, 
    disminuirStockMinimo}) => {

    return (
        <tr key={producto.id} className={seleccionado ? "table-success" : ""}>
            <td>
                <input
                    type="checkbox"
                    className="form-check-input fs-5"
                    checked={!!seleccionado}
                    onChange={()=> handleSelected(producto)}
                />
            </td>
            <td>{producto.nombre}</td>
            <td>{!producto.descripcion ? "Sin descripcion" : producto.descripcion}</td>
            <td>
                {seleccionado && (
                    <div className="d-flex justify-content-center align-items-center gap-2">
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={()=> disminuir(producto.id)}
                        >
                        <Dash size={16}/>
                        </button>

                        <input
                            type="number"
                            className="form-control text-center p-2"
                            style={{width:"6rem"}}
                            value={seleccionado.cantidad}
                            onChange={(e)=> ingresarCantidad(producto.id,e.target.value)}
                        />

                        <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={()=> aumentar(producto.id)}
                        >
                        <Plus size={16}/>
                        </button>
                    </div>
                )}
            </td>
            <td>
                {seleccionado && (
                    <div className="d-flex justify-content-center align-items-center gap-2">
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={()=> disminuirStockMinimo(producto.id)}
                        >
                        <Dash size={16}/>
                        </button>

                        <input
                            type="number"
                            className="form-control text-center producto-2"
                            style={{width:"6rem"}}
                            value={seleccionado.stockMinimo}
                            onChange={(e)=> ingresarStockMinimo(producto.id,e.target.value)}
                        />

                        <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={()=> aumentarStockMinimo(producto.id)}
                        >
                        <Plus size={16}/>
                        </button>
                    </div>
                )}
            </td>
        </tr>
    )
}
export default ProductoInventarioRow;