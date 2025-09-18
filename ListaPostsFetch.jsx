import { useState, useEffect  } from "react";

export default function ListaPostsFetch() {
    const [post, setPost] = useState(null);
    const [cargando, setCargado] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.json())
            .then((data) => {
                setPost(data.slice(0 , 10));
                setCargado(false);
            })
            .catch(() => setCargado(false));
    }, []);

    if (cargando) return <p>Cargando...</p>;

    return (
        <div>
            <h2>Posts (fetch)</h2>
            <ul>
                {post.map((post) => (
                    <li key={post.id}>
                        <strong>{post.id}</strong>
                        <p>{post.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}