//css
import styles from "./Search.module.css";

//hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

//components
import PostDetail from "../../components/PostDetail";

//Link
import { Link } from "react-router-dom";



const Search = () => {
    const query = useQuery()
    const search = query.get("q"); //método GET do próprio URLSearchParams consegue pegar atributo cadastrado lá (q)

    const { documents: posts } = useFetchDocuments("posts", search); //carregando os documentos baseado na busca

    return <div className={styles.search_container}>
        <h2>Pesquisa Relacionadas</h2>
        <div>
            {posts && posts.length === 0 && (
                <div className={styles.noPost}>
                    <p>Não foram encontrados posts a partir da sua busca :/ </p>
                    <Link to="/" className="btn btn-dark">Voltar</Link>
                </div>
            )}
            {posts && posts.map((post) => (
                <PostDetail key={post.id} post={post} />
            ))}
        </div>
    </div>

}

export default Search;