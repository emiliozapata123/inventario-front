const SelectProducto = ({setFomulario, formulario, productos}) => {
    const producto = productos?.find((p)=> p.id === formulario?.activo);

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header fw-semibold bg-blue">
                Seleccionar producto
            </div>
            <div className="card-body p-2 me-2 ms-2">
                <div className="row g-3">
                    <div className="dropdown">
                        <button 
                            className="btn btn-outline-primary w-100 dropdown-toggle" 
                            data-bs-toggle="dropdown" 
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

                        <ul className="dropdown-menu w-100 dropdown-scroll">
                            {productos?.map((p)=> (
                                <li key={p.id}>
                                    <button 
                                        className="dropdown-item" 
                                        onClick={()=> 
                                            setFomulario(prev => ({
                                                ...prev,
                                                activo:p.id
                                            }))
                                        }
                                    >
                                        {p.tipoProducto} {""}
                                        - {!p.descripcion?<span className="text-muted">sin descripcion</span>:p.descripcion} {""}
                                        - {!p.marca?<span className="text-muted">sin marca</span>:p.marca} {""}
                                        - {!p.modelo?<span className="text-muted">sin modelo</span>:p.modelo}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SelectProducto;