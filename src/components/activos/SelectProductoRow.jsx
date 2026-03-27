const SelectProductoRow = ({ producto, setSeleccionado, seleccionado }) => {
    return(
        <tr className={`${seleccionado === producto.id ? "table-success":""}`}>
            <td className="text-break">{producto?.tipoProducto}</td>
            <td className="text-break">{!producto?.descripcion?<span className="badge bg-light text-dark">—</span>:producto.descripcion}</td>
            <td className="text-break">{!producto?.marca?<span className="badge bg-light text-dark">—</span>:producto.marca}</td>
            <td className="text-break">{!producto?.modelo?<span className="badge bg-light text-dark">—</span>:producto.modelo}</td>
            <td className="text-center">
                <input 
                    type="radio"
                    name="seleccionado" 
                    className="form-check-input fs-5"
                    checked={seleccionado === producto.id}
                    onChange={() => setSeleccionado(producto.id)}
                />
            </td>
        </tr>
    )
}
export default SelectProductoRow;