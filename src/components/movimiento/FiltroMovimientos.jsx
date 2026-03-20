import useFetch from "../notify/useFetch";

const FiltroMovimientos = ({ actualizarFiltro, filtros }) => {
    const { data:bodegas } = useFetch("api/bodega/list/");
    
    return (
        <div className="row g-2 mb-2">
            <div className="col-md-4">
                <input
                    type="date"
                    className="form-control ps-5"
                    value={filtros.fecha}
                    placeholder="Filtrar por fecha"
                    onChange={(e) => actualizarFiltro("fecha",e.target.value)}
                />
            </div>
            <div className="col-md-4">
                <div className="dropdown">
                    <button className="btn btn-outline-primary w-100 dropdown-toggle" data-bs-toggle="dropdown">
                        {!filtros.tipo?"Filtrar por tipo movimiento":filtros.tipo}
                    </button>

                    <ul className="dropdown-menu w-100" style={{zIndex:2000}}>
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={()=> actualizarFiltro("tipo","")}
                            >
                                Todos
                            </button>
                        </li>
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={()=> actualizarFiltro("tipo","Entrada")}
                            >
                                Entrada
                            </button>
                        </li>
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={()=> actualizarFiltro("tipo","Salida")}
                            >
                                Salida
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="col-md-4">
                <div className="dropdown">
                    <button className="btn btn-outline-primary w-100 dropdown-toggle" data-bs-toggle="dropdown">
                        {!filtros.bodega?"Filtrar Por Bodega":filtros.bodega}
                    </button>

                    <ul className="dropdown-menu w-100" style={{zIndex:2000}}>
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={()=> actualizarFiltro("bodega","")}
                            >
                                Todos
                            </button>
                        </li>
                        {bodegas.map((b)=> (
                            <li key={b.id}>
                                <button 
                                    className="dropdown-item" 
                                    onClick={()=> actualizarFiltro("bodega",b.nombre)}
                                >
                                    {b.nombre}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default FiltroMovimientos;