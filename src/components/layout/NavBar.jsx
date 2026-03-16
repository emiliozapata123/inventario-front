import { List, X} from "react-bootstrap-icons";
import "./NavBar.css";

const NavBarMobile = ({setSidebarOpen, setMobile, mobile, sidebarOpen}) => {
    return (
        <div className="mobile-navbar">
            <>
            {mobile && sidebarOpen ? (
                <button className="close-btn" onClick={()=> {setSidebarOpen(false); setMobile(false)}}>
                    <X size={36}/>
                </button>
            ):(
                <button 
                    className="menu-btn"
                    onClick={() => {setSidebarOpen(true); setMobile(true)}}
                    >
                        
                    <List size={24} />
                </button>
            )}
            </>
            <h4 className="mobile-logo">
                Inventario
            </h4>
        </div>
    )
}
export default NavBarMobile;