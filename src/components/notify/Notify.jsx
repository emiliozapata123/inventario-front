import { useEffect, useState } from "react";

let notify;

const Notify = () => {
    const [message, setMessage] = useState("");
    const [tipo, setTipo] = useState("");
    const [visible, setVisible] = useState(false);

    useEffect(()=> {
        notify = (message,tipo) => {
            setMessage(message);
            setTipo(tipo);
            setVisible(true);

            setTimeout(() => {
                setVisible(false);
            }, 3000);
        }

    }, []);

    return (
        <>
        {visible && (
            <div className={`alert alert-${tipo} position-fixed m-3 top-0 start-50 translate-middle-x shadow z-index-notify`}         
                style={{ maxWidth: "32rem", margin: "1rem" }}
>
                {message}
            </div>
        )}
        </>
    )
}
export default Notify;

export const NotifySuccess = (message) => {
    if (!notify) return null;
    notify(message,"success");
}
export const NotifyError = (message) => {
    if (!notify) return null;
    notify(message,"danger");
}