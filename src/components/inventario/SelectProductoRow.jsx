import { Plus, Dash } from "react-bootstrap-icons";

const SelectProductoRow = ({ handleOnSelected, producto, seleccionado, handleOnCantidad }) => {

    return (
        <tr key={producto.id} className={seleccionado ? "table-success" : ""}>
            <td className="text-break">{producto.nombre}</td>
            <td className="text-break">{!producto.descripcion ? "Sin descripcion" : producto.descripcion}</td>
            <td>
                {seleccionado && (
                    <div className="d-flex justify-content-center align-items-center gap-2">
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={()=> handleOnCantidad("disminuir",producto.id)}
                        >
                        <Dash size={16}/>
                        </button>

                        <input
                            type="number"
                            className="form-control text-center p-2"
                            style={{width:"6rem"}}
                            value={seleccionado.cantidad}
                            onChange={(e)=> handleOnCantidad("ingresar",producto.id,e.target.value)}
                        />

                        <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={()=> handleOnCantidad("aumentar",producto.id)}
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
                            onClick={()=> handleOnCantidad("disminuirStockMinimo",producto.id)}
                        >
                        <Dash size={16}/>
                        </button>

                        <input
                            type="number"
                            className="form-control text-center producto-2"
                            style={{width:"6rem"}}
                            value={seleccionado.stockMinimo}
                            onChange={(e)=> handleOnCantidad("ingresarStockMinimo",producto.id,e.target.value)}
                        />

                        <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={()=> handleOnCantidad("aumentarStockMinimo",producto.id)}
                        >
                        <Plus size={16}/>
                        </button>
                    </div>
                )}
            </td>
            <td className="text-center">
                <input
                    type="checkbox"
                    className="form-check-input fs-5"
                    checked={!!seleccionado}
                    onChange={()=> handleOnSelected(producto)}
                />
            </td>
        </tr>
    )
}
export default SelectProductoRow;