const ModalEliminar = ({data,setMostrarModal,onDelete, message, enviando}) => {
    return (
       <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow rounded-2 p-3">

                    <div className="modal-header border-0">
                        <h5 className="modal-title fw-bold">
                            Eliminar {message}
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            disabled={enviando}
                            onClick={() => setMostrarModal(false)}
                        ></button>
                    </div>

                    <div className="modal-body text-center">
                        <i className="bi bi-exclamation-triangle-fill text-danger fs-1 mb-3"></i>

                        <p className="text-muted">
                            ¿Estás seguro de eliminar
                            <strong className="text-dark"> {!data.nombre?data.tipoProducto:data.nombre} </strong>?
                        </p>

                        <p className="text-danger small">
                            Esta acción no se puede deshacer.
                        </p>

                    </div>

                    <div className="d-flex border-0 justify-content-end gap-2">

                        <button
                            className="w-25 btn-light-hover"
                            disabled={enviando}
                            onClick={() => setMostrarModal(false)}
                        >
                            Cancelar
                        </button>

                        <button 
                            className={`btn btn-danger ${enviando ? "w-auto":"w-25"} d-flex justify-content-center align-items-center rounded-1`}
                            disabled={enviando}
                            onClick={()=> onDelete(data.id)}
                        >
                            {enviando ? (
                                <>
                                    <span 
                                        className="spinner-border spinner-border-sm me-2" 
                                        role="status" 
                                        aria-hidden="true"
                                    ></span>
                                    Eliminando...
                                </>
                            ) : (
                                <>
                                Eliminar
                                </>
                            )}
                        </button>

                    </div>

                </div>
            </div>
        </div>
    )
}
export default ModalEliminar;