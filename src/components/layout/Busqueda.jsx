const Busqueda = ({setBusqueda,Busqueda,filtroCategoria,setFiltroCategoria,categorias}) => {
    return(
        <div className="row mb-4">
            <div className="col-md-8 mb-2">
                <input 
                    type="text" 
                    className="form-control rounded-3" 
                    value={Busqueda}
                    placeholder="Buscar cursos..." 
                    onChange={(e)=> setBusqueda(e.target.value)}
                />
            </div>
            <div className="col-md-4 mb-2">
                <select className="form-select rounded-3" value={filtroCategoria} onChange={(e)=> setFiltroCategoria(e.target.value)}>
                    <option value="">Todas las Categorías</option>
                    {categorias.map(c => (
                        <option key={c.id }value={c.nombre}>{c.nombre}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
export default Busqueda;

{/* <div className="mb-4 position-relative">
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
            </div> */}