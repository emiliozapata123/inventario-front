import useFetch from "../notify/useFetch";

const MovimientoHeader = ({mensaje, busqueda, setBusqueda, formulario, cargarInventario}) => {
    const { data:bodegas } = useFetch("api/bodega/list/");

    return (
        <>
            <div className="d-flex justify-content-around">
                <h6 className="fw-bold mb-3">Seleccionar Producto</h6>
                <h6 className="fw-bold mb-3">Buscar por Bodega</h6>
            </div>
            <div className="row align-items-center mb-2 g-2">
                <div className="col-md-6">
                    <div className="position-relative">
                        <span className="position-absolute top-50 translate-middle-y ms-3 text-muted">
                            <i className="bi bi-search"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control ps-5"
                            placeholder="Buscar Productos..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="dropdown">
                        <button className={`btn btn-outline-primary w-100 dropdown-toggle ${mensaje.bodega ? "btn-outline-danger":""}`}data-bs-toggle="dropdown">
                            {!formulario.bodega?"Seleccionar Bodega":bodegas.find((b)=> b.id === formulario.bodega)?.nombre}
                        </button>

                        <ul className="dropdown-menu w-100" style={{zIndex:2000}}>
                            {bodegas.map((b)=> (
                                <li key={b.id}>
                                    <button 
                                        className="dropdown-item" 
                                        onClick={()=> cargarInventario(b.id)}
                                    >
                                        {b.nombre}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="invalid-feedback d-block">{mensaje.bodega}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MovimientoHeader;