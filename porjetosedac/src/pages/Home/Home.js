//CSS
import styles from "./Home.module.css"

//hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

//components
import PostDetail from "../../components/PostDetail";

const Home = () => {
    const [query, setQuery] = useState("")
    const { documents: posts, loading } = useFetchDocuments("posts")  // coleção, método que vamos trabalhar

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); //não recarregar a pag

        if (query) {
            return navigate(`/search?q=${query}`); //enviando um parâmetro chamado com Q com o texto da minha query do input para uma nova pagina 'Search' extraindo os dados do hook
        }
    };
    console.log(loading)

    return (
        <div className={styles.home}>
            <h2>Veja os posts importantes da Sedac para você se informar!</h2>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                <input type="text" placeholder="Busque por tags..." onChange={(e) => setQuery(e.target.value)} />
                <button className="btn btn-dark">Pesquisar</button>
            </form>
            <div>
                {loading && <p>Carregando...</p>}  {/*verificar se essa linha é necessário*/}
                {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}   {/* mostrando o post na home */}
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>Não foram encontrados posts!</p>
                        <Link to="/posts/create"
                            className="btn">
                            Criar primeiro post
                        </Link>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Home;