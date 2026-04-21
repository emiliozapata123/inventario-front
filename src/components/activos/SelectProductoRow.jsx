const SelectProductoRow = ({ producto, setSeleccionado, seleccionado }) => {
    return(
        <tr className={`${seleccionado.invId === producto.id ? "table-success":""}`}>
            <td className="text-break">{producto?.producto}</td>
            <td className="text-break">{!producto?.descripcion?<span className="badge text-dark">—</span>:producto.descripcion}</td>
            <td className="text-break">{!producto?.marca?<span className="badge text-dark">—</span>:producto.marca}</td>
            <td className="text-break">{!producto?.modelo?<span className="badge text-dark">—</span>:producto.modelo}</td>
            <td className="text-break text-center">{producto?.cantidad}</td>
            <td className="text-center">
                <input
                    type="radio"
                    name="seleccionado" 
                    className="form-check-input fs-5"
                    checked={seleccionado.invId === producto.id}
                    onChange={() => setSeleccionado(producto.id,producto.productoId,producto.bodegaId)}
                />
            </td>
        </tr>
    )
}
export default SelectProductoRow;