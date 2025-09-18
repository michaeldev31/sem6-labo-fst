import { useState, useEffect  } from "react";

export default function UsuariosFetch() {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargado] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => {
                setUsuarios(data);
                setCargado(false);
            })
            .catch(() => setCargado(false));
    }, []);

    if (cargando) return <p>Cargando...</p>;

    return (
        <div>
            <h2>Usuarios (fetch)</h2>
            <ul>
                {usuarios.map((u) => (
                    <li key={u.id}> {u.name} - {u.email} </li>
                ))}
            </ul>
        </div>
    );
}