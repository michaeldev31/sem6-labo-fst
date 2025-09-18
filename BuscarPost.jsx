import { useState } from "react";
import axios from "axios";

export default function BuscarPost() {
    const [tab, setTab] = useState("post");
    const [id, setId] = useState("");
    const [userId, setUserId] = useState("");
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [error, setError] = useState(null);

    // id y sus comentarioss
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setPost(null);
        setComments([]);
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
            setPost(res.data);
            // comentarios
            const commentsRes = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
            setComments(commentsRes.data);
        } catch (err) {
            if (err.response) {
                if (err.response.status === 404) setError("Post no encontrado (404)");
                else if (err.response.status >= 500) setError("Error de servidor (500)");
                else setError("Error desconocido");
            } else {
                setError("Error de conexión");
            }
        }
    };

    //  posts por userId
    const handleUserSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setUserPosts([]);
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
            if (res.data.length === 0) setError("No hay posts para ese usuario");
            else setUserPosts(res.data);
        } catch (err) {
            setError("Error al buscar posts por usuario");
        }
    };

    return (
        <div className="p-4">
            {}
            <div className="mb-4 flex gap-2">
                <button className={`px-3 py-1 rounded ${tab === "post" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setTab("post")}>Buscar Post</button>
                <button className={`px-3 py-1 rounded ${tab === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setTab("user")}>Posts por Usuario</button>
            </div>

            {/* post ID */}
            {tab === "post" && (
                <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
                    <input
                        type="number"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="ID del Post"
                        className="border px-2 py-1 rounded"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Buscar</button>
                </form>
            )}

            {/* por user ID */}
            {tab === "user" && (
                <form onSubmit={handleUserSubmit} className="mb-4 flex gap-2">
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="User ID"
                        className="border px-2 py-1 rounded"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Buscar</button>
                </form>
            )}

            {/* errores para verr*/}
            {error && <p className="text-red-500">{error}</p>}

            {}
            {tab === "post" && post && (
                <div className="bg-white shadow rounded p-4 mb-4">
                    <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                    <p className="mb-2">{post.body}</p>
                    <h4 className="font-semibold mt-4 mb-2">Comentarios:</h4>
                    <ul>
                        {comments.map((c) => (
                            <li key={c.id} className="border-b py-2">
                                <span className="font-bold">{c.name}</span>: {c.body}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* resultados posts por usuario */}
            {tab === "user" && userPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userPosts.map((p) => (
                        <div key={p.id} className="bg-white shadow rounded p-4">
                            <h3 className="font-bold">{p.title}</h3>
                            <p>{p.body}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}