const SelectProductoButton = ({ formulario, setMostrarModal, productos }) => {
    console.log("productos: ", productos);
    const producto = productos?.find(p => Number(p.productoId) === formulario?.producto);
    console.log("producto: ",producto)

    return(
        <div className="card shadow-sm mb-4">
            <div className="card-header fw-semibold bg-blue">
                Seleccionar producto
            </div>
            <div className="card-body p-2 me-2 ms-2">
                <div className="row g-3">
                    <div className="dropdown">
                        <button 
                            className="btn btn-outline-primary w-100 dropdown-toggle" 
                            onClick={() => setMostrarModal(true)}
                        >
                            {!formulario?.producto ? (
                                "Seleccionar Producto"
                            ):(
                                <>
                                {producto?.producto} {""}
                                - {!producto?.descripcion?<span className="text-muted">sin descripcion</span>:producto.descripcion} {""} 
                                - {!producto?.marca?<span className="text-muted">sin marca</span>:producto.marca} {""} 
                                - {!producto?.modelo?<span className="text-muted">sin modelo</span>:producto.modelo} {""}
                                - {producto.cantidad}

                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SelectProductoButton;