const ProductoList = ({producto, setMostrarModal}) => {
    return (
        <tr>
            <td>{producto.nombre}</td>
            <td>{!producto.descripcion ? <span className="badge bg-light text-dark border">—</span>:producto.descripcion}</td>
            <td>
                <div className="d-flex gap-1 justify-content-center">
                    <button className="btn btn-warning" onClick={()=> setMostrarModal("update")}>
                        <i className="bi bi-pencil me-2"></i>
                        Editar
                    </button>
                    <button className="btn btn-danger" onClick={()=> setMostrarModal("delete")}>
                        <i className="bi bi-trash me-2"></i>
                        Eliminar
                    </button>
                </div>
            </td>
        </tr>
    )
}
export default ProductoList;