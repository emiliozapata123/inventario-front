import api from "../services/Api";
import { NotifyError, NotifySuccess } from "../components/notify/Notify";
import { useState, useEffect } from "react";
import ModalEliminar from "../components/layout/ModalEliminar";
import UsuarioList from "../components/usuario/UsuarioList";
import UsuarioForm from "../components/usuario/UsuarioForm";
import Loading from "../components/layout/Loading";

const UsuarioPage = () => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [usuario, setUsuario] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [enviando, setEnviando] = useState(false);

    useEffect(()=> {
        getUsuarios();
        getCurrentUser();
    },[]);

    const busquedaUsuarios = usuarios.filter((u)=> u.nombre.toLowerCase().includes(busqueda.toLowerCase()));

    const getCurrentUser = async () => {
        try {
            const response = await api("accounts/current-user/");
            setCurrentUser(await response.json());

        } catch (error) {
            console.error(error);
        }
    }

    const getUsuarios = async () => {
        setLoading(true);

        try {
            const response = await api("accounts/profile/list/");
            const data = await response.json()
            setUsuarios(data);

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    const addUsuario = async (data) => {
        if (enviando) return;

        setEnviando(true);
        try {
            await api("accounts/profile/form/","POST",data);
            getUsuarios();
            setMostrarModal(false);
            NotifySuccess("Usuario agregado.");

        } catch (error) {
            console.error(error)
        } finally {
            setEnviando(false);
        }
    }

    const usuarioDelete =  async (id) => {
        if (enviando) return;

        setEnviando(true);
        try {
            await api(`accounts/profile/${id}/delete/`,"DELETE");
            getUsuarios();
            setMostrarModal(false);
            NotifySuccess("Usuario eliminado");

        } catch (error) {
            console.error(error)
            NotifyError("Error al eliminar usuario");
        } finally {
            setEnviando(false);
        }

    }

    return(
        <div>
        <div className="d-flex justify-content-between align-items-center mb-4 pt-4 flex-wrap gap-3 ms-3 me-3">
            
            <div>
            <h4 className="fw-bold mb-1 blue-title">Gestión de Usuarios</h4>
            <p className="text-muted mb-0">
                Administra todos los usuarios de la plataforma
            </p>
            </div>

            <button
            className="btn btn-primary d-flex align-items-center gap-2 px-3"
            onClick={() => setMostrarModal("crear")}
            >
            <i className="bi bi-plus-lg"></i>
            Nuevo Usuario
            </button>
        </div>
        <section className="card border-0 shadow-sm p-2 ms-3 me-3">

            <div className="mb-2 position-relative">
            <span className="position-absolute top-50 translate-middle-y ms-3 text-muted">
                <i className="bi bi-search"></i>
            </span>

            <input
                type="text"
                className="form-control ps-5"
                placeholder="Buscar usuarios..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />
            </div>

            <div className="card table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="bg-blue">
                    <tr>
                        <th>Nombre Completo</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="3" className="text-center py-5">
                                    <Loading/>
                                </td>
                            </tr>
                        ):(
                            busquedaUsuarios.map(u => (
                                <UsuarioList
                                    key={u.id} 
                                    user={u} 
                                    setMostrarModal={()=> {setMostrarModal("delete"); setUsuario(u)}}
                                    currentUser={currentUser}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
        {mostrarModal === "crear" ? (
            <UsuarioForm setMostrarModal={setMostrarModal} enviando={enviando} addUsuario={addUsuario}/>
        ):mostrarModal === "delete" && (
            <ModalEliminar 
                message={"Usuario"} 
                enviando={enviando} 
                data={usuario} 
                setMostrarModal={setMostrarModal} 
                onDelete={usuarioDelete}
            />
        )}
        </div>
    )   
}
export default UsuarioPage;