import useFetch from "../notify/useFetch";

const InventarioHeader = ({ formulario, handleChange, mensaje }) => {
    const {data:bodegas} = useFetch("api/bodega/list/");

    return (
        <div className="card shadow-sm mb-2">
            <div className="card-body p-2 me-2 ms-2">
                <div className="row g-3">
                    <div className="col-md-6">
                        <label>Bodega donde se guardarán los productos</label>
                        <div className="dropdown">
                            <button className={`btn btn-outline-primary w-100 dropdown-toggle ${mensaje.bodega ? "btn-outline-danger":""}`}data-bs-toggle="dropdown">
                                {!formulario.bodega?"Seleccionar Bodega":bodegas.find((b)=> b.id === formulario.bodega)?.nombre}
                            </button>

                            <ul className="dropdown-menu w-100" style={{zIndex:2000}}>
                                {bodegas?.map((b)=> (
                                    <li key={b.id}>
                                        <button 
                                            className="dropdown-item" 
                                            onClick={()=> handleChange("bodega",b.id)}
                                        >
                                            {b?.nombre}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="invalid-feedback d-block">{mensaje.bodega}</div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label className="fw-semibold">Fecha de ingreso</label>
                        <input
                            type="date"
                            className={`form-control ${mensaje.fecha?"is-invalid":""}`}
                            value={formulario.fecha}
                            onChange={(e)=> handleChange("fecha",e.target.value)}
                        />
                        <div className="invalid-feedback d-block">{mensaje.fecha}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default InventarioHeader;