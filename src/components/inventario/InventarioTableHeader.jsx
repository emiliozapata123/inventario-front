import { Plus } from "react-bootstrap-icons";

const InventarioTableHeader = ({ setBusqueda, busqueda, limpiarFormulario, handleClick, enviando }) => {
    return (
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
                <div className="d-flex justify-content-end gap-2">
                    <button 
                        className="btn btn-outline-secondary"
                        onClick={limpiarFormulario}
                    >
                        Cancelar
                    </button>

                    <button 
                        className="btn btn-primary d-flex align-items-center"
                        disabled={enviando}
                        onClick={handleClick}
                    >
                        {enviando ? (
                            <>
                                <span 
                                    className="spinner-border spinner-border-sm me-2" 
                                    role="status" 
                                    aria-hidden="true"
                                ></span>
                                Enviando...
                            </>
                        ) : (
                            <>
                            <Plus size={24} className="me-1" />
                            Registrar Ingreso
                            </>
                            
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default InventarioTableHeader;