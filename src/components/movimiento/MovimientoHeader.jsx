const MovimientoHeader = ({mensaje, busqueda, setBusqueda, formulario, handleOnChange, bodegas}) => {
    return (
        <div className="row g-2 mb-2">
            <div className="col-md-4">
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

            <div className="col-md-4">
                <div className="dropdown">
                    <button className={`btn btn-outline-primary w-100 dropdown-toggle ${mensaje.bodega ? "btn-outline-danger":""}`}data-bs-toggle="dropdown">
                        {!formulario.bodega?"Buscar por Bodega":bodegas.find((b)=> b.id === formulario.bodega)?.nombre}
                    </button>

                    <ul className="dropdown-menu w-100" style={{zIndex:2000}}>
                        {bodegas.map((b)=> (
                            <li key={b.id}>
                                <button 
                                    className="dropdown-item" 
                                    onClick={()=> handleOnChange("bodega", b)}
                                >
                                    {b.nombre}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="invalid-feedback d-block m-auto">{mensaje.bodega}</div>
                </div>
            </div>
            <div className="col-md-4">
                <input
                    type="date"
                    className="form-control ps-5"
                    value={formulario.fechaMovimiento}
                    placeholder="Filtrar por fecha"
                    onChange={(e) => handleOnChange("fechaMovimiento", e.target.value)}
                />
            </div>
        </div>
    )
}
export default MovimientoHeader;