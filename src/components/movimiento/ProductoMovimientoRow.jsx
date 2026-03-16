import { Dash, Plus } from "react-bootstrap-icons";

const ProductoMovimientoRow = ({seleccionado, toggleProducto, ingresarCantidad, p, aumentar, disminuir}) => {
    return (
        <tr key={p.id} className={seleccionado ? "table-success" : ""}>
            <td>
                <input
                    type="checkbox"
                    className="form-check-input fs-5"
                    checked={!!seleccionado}
                    onChange={()=> toggleProducto(p)}
                />
            </td>
            <td>{p.producto.nombre}</td>
            <td className="text-center">{p.stock}</td>
            <td>{!p.producto.descripcion ? "Sin descripcion" : p.producto.descripcion}</td>
            <td>
                {seleccionado && (
                    <div className="d-flex justify-content-center gap-2">
                        <button 
                            className="btn btn-danger"
                            onClick={()=> disminuir(p.producto.id, p.stock)}
                        >
                            <Dash/>
                        </button>
                        <input
                            type="number"
                            min="1"
                            className="form-control"
                            style={{width:"7rem"}}
                            value={seleccionado?.cantidad}
                            onChange={(e)=> ingresarCantidad(p.producto.id,e.target.value,p.stock)}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={()=> aumentar(p.producto.id, p.stock)}
                        >
                            <Plus/>
                        </button>
                    </div>
                    
                )}
            </td>
        </tr>
    )
}
export default ProductoMovimientoRow;