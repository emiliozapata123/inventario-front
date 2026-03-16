const ProductoList = ({producto, setMostrarModal}) => {
    return (
        <tr>
            <td>{producto.nombre}</td>
            <td>{!producto.descripcion ? "Sin descripcion":producto.descripcion}</td>
            <td>
                <div className="d-flex gap-1 justify-content-center">
                    <button className="btn btn-warning d-flex gap-2" onClick={()=> setMostrarModal("update")}>
                        <i className="bi bi-pencil"></i>
                        Editar
                    </button>
                    <button className="btn btn-danger d-flex gap-2" onClick={()=> setMostrarModal("delete")}>
                        <i className="bi bi-trash"></i>
                        Eliminar
                    </button>
                </div>
            </td>
        </tr>
    )
}
export default ProductoList;