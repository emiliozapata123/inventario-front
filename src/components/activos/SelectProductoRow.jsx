const SelectProductoRow = ({ producto, setSeleccionado, seleccionado }) => {
    return(
        <tr className={`${seleccionado === producto.id ? "table-success":""}`}>
            <td>
                <input 
                    type="radio"
                    name="seleccionado" 
                    className="form-check-input fs-5"
                    checked={seleccionado === producto.id}
                    onChange={() => setSeleccionado(producto.id)}
                />
            </td>
            <td>{producto?.tipoProducto}</td>
            <td>{!producto?.descripcion?<span className="badge bg-light text-dark">—</span>:producto.descripcion}</td>
            <td>{!producto?.marca?<span className="badge bg-light text-dark">—</span>:producto.marca}</td>
            <td>{!producto?.modelo?<span className="badge bg-light text-dark">—</span>:producto.modelo}</td>
        </tr>
    )
}
export default SelectProductoRow;