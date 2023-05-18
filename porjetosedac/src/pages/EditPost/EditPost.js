//css
import styles from './EditPost.module.css';

//importações
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';



const EditPost = () => {

    const { id } = useParams();
    const { document: post } = useFetchDocument("posts", id);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (post) {
            setTitle(post.title)
            setBody(post.body)
            setImage(post.image)

            const textTags = post.tagsArray.join(", ");
            setTags(textTags)
        }
    }, [post]);


    const { user } = useAuthValue()
    // método de publicação do form
    const { updateDocument, response } = useUpdateDocument("posts");

    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault(); //não submeter o formulário sem querer
        setFormError("");  //zerar os erros do form

        // validar imagem URL
        try {
            new URL(image)
        } catch (error) {
            setFormError("A imagem precisar ser uma URL.")
        }

        //Criar o array de tags
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        //Check todos os valores vieram
        if (!title || !image || !tags || !body) {
            setFormError('Por favor, preencha todos os campos!')
        }


        if (formError) return;

        const data = {
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        }
        // método
        updateDocument(id, data);

        //redirect p/ dashboard page depois de atualizar o post
        navigate("/dashboard");

    };

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editando Post: {post.title}</h2>
                    <p>Altere os dados do post como desejar</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Título:</span>
                            <input type="text"
                                name="title"
                                required
                                placeholder="O que a Sedac precisa saber!?"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </label>
                        <label>
                            <span>URL da imagem:</span>
                            <input type="text"
                                name="image"
                                required
                                placeholder="Insira uma imagem se você quiser!"
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                            />
                        </label>
                        <p className={styles.preview_title}>Imagem  atual do post:</p>
                        <img className={styles.image_preview} src={post.image} alt={post.title} />
                        <label>
                            <span>Conteúdo:</span>
                            <textarea
                                name="body"
                                required
                                placeholder='Insira o conteúdo do post!'
                                onChange={(e) => setBody(e.target.value)}
                                value={body}
                            >
                            </textarea>
                        </label>
                        <label>
                            <span>Tags:</span>
                            <input type="text"
                                name="tags"
                                required
                                placeholder="Insira as tags separadas por vírgula!"
                                onChange={(e) => setTags(e.target.value)}
                                value={tags}
                            />
                        </label>
                        {!response.loading && <button className="btn">Postar</button>}
                        {response.loading && (
                            <button className="btn" disabled>
                                Aguarde.. .
                            </button>
                        )}
                        {response.error && <p className="error">{response.error}</p>}
                        {formError && <p className="error">{formError}</p>}
                    </form>
                </>
            )}
        </div>
    )
}

export default EditPost;