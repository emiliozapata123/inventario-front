const UsuarioList = ({user, currentUser, setMostrarModal}) => {
    return (
        <tr>
            <td>{user.nombre}</td>
            <td>{user.correo}</td>
            
            <td>
                <button onClick={setMostrarModal} className={`btn btn-danger d-flex gap-1 
                    ${user.id === currentUser.id ? "disabled" :""}`
                }>
                    <i className="bi bi-trash"></i>
                    Eliminar
                </button>
            </td>
        </tr>
    )
}
export default UsuarioList;