const SelectProductoButton = ({formulario, setMostrarModal, productos }) => {
    const producto = productos?.find(p => p.id === formulario?.activo);

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
                            {!formulario?.activo ? (
                                "Seleccionar Producto"
                            ):(
                                <>
                                {producto?.tipoProducto} {""} 
                                - {!producto?.descripcion?<span className="text-muted">sin descripcion</span>:producto.descripcion} {""} 
                                - {!producto?.marca?<span className="text-muted">sin marca</span>:producto.marca} {""} 
                                - {!producto.modelo?<span className="text-muted">sin modelo</span>:producto.modelo}
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