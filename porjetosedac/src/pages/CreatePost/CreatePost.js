//css
import styles from './CreatePost.module.css';

//importações
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';

//hook
import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreatePost = () => {

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    const { user } = useAuthValue()
    //metodo de publicação do form
    const { insertDocument, response } = useInsertDocument("posts");

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

        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        });

        //redirect p/ home page depois de submeter o formulário
        navigate("/");

    };

    return (
        <div className={styles.create_post}>
            <h2>Criar Post</h2>
            <p>Escreve algo para compartilhar com a Sedac!</p>
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
        </div>
    )
}

export default CreatePost;