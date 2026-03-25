import { Search } from "react-bootstrap-icons";

const FiltrosActivosAsignados = ({ filtros, actualizarFiltro }) => {

    return (
        <div className="row g-2 mb-2">
            <div className="col-md-2">
                <div className="position-relative">
                    <span className="position-absolute top-50 translate-middle-y ms-3 text-muted">
                        <Search/>
                    </span>
                    <input
                        className="form-control ps-5 rounded-1"
                        value={filtros.busqueda}
                        placeholder="Busqueda rapida..."
                        onChange={(e) => actualizarFiltro("busqueda",e.target.value)}
                    />
                </div>
            </div>
            <div className="col-md-2">
                <input
                    type="date"
                    className="form-control ps-5 rounded-1"
                    value={filtros.fecha}
                    placeholder="Filtrar por fecha"
                    onChange={(e) => actualizarFiltro("fecha",e.target.value)}
                />
            </div>
            <div className="col-md-2">
                <div className="dropdown">
                    <button className="btn btn-outline-primary rounded-1 w-100 dropdown-toggle" data-bs-toggle="dropdown">
                        {!filtros.numero?"Estado de inventario":filtros.numero}
                    </button>

                    <ul className="dropdown-menu w-100" style={{zIndex:4000}}>
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={()=> actualizarFiltro("numero","todos")}
                            >
                                Todos
                            </button>
                        </li>
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={()=> actualizarFiltro("numero","con numero")}
                            >
                                Con numero
                            </button>
                        </li>
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={()=> actualizarFiltro("numero","sin numero")}
                            >
                                Sin numero
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-md-2">
                <div className="dropdown">
                    <button className="btn btn-outline-primary rounded-1 w-100 dropdown-toggle" data-bs-toggle="dropdown">
                        {!filtros.usuario?"Asignacion de usuario":filtros.usuario}
                    </button>

                    <ul className="dropdown-menu w-100" style={{zIndex:4000}}>
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={()=> actualizarFiltro("usuario","todos")}
                            >
                                Todos
                            </button>
                        </li>
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={()=> actualizarFiltro("usuario","con usuario")}
                            >
                                Con usuario
                            </button>
                        </li>
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={()=> actualizarFiltro("usuario","sin usuario")}
                            >
                                Sin usuario
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-md-2">
                <div className="dropdown">
                    <button className="btn btn-outline-primary rounded-1 w-100 dropdown-toggle" data-bs-toggle="dropdown">
                        {!filtros.cargo?"Asignacion de cargo":filtros.cargo}
                    </button>

                    <ul className="dropdown-menu w-100" style={{zIndex:4000}}>
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={()=> actualizarFiltro("cargo","todos")}
                            >
                                Todos
                            </button>
                        </li>
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={()=> actualizarFiltro("cargo","con cargo")}
                            >
                                Con cargo
                            </button>
                        </li>
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={()=> actualizarFiltro("cargo","sin cargo")}
                            >
                                Sin cargo
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-md-2">
                <div className="dropdown">
                    <button className="btn btn-outline-primary rounded-1 w-100 dropdown-toggle" data-bs-toggle="dropdown">
                        {!filtros.ubicacion?"Por ubicacion":filtros.ubicacion}
                    </button>

                    <ul className="dropdown-menu w-100" style={{zIndex:4000}}>
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={()=> actualizarFiltro("ubicacion","todos")}
                            >
                                Todos
                            </button>
                        </li>
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={()=> actualizarFiltro("ubicacion","con ubicacion")}
                            >
                                Con ubicacion
                            </button>
                        </li>
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={()=> actualizarFiltro("ubicacion","sin ubicacion")}
                            >
                                Sin ubicacion
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default FiltrosActivosAsignados;