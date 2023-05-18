import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {  // métodos para trazer os dados do projeto
    doc,  // para ter a estancia de um documento métodos q envolvem
    getDoc, //pegar um documento do banco
} from "firebase/firestore";

//hook de resgate de dados 

export const useFetchDocument = (docCollection, id) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // memory leak, vazamento de memória
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        async function loadDocument() {
            if (cancelled) {
                return;
            }

            setLoading(true);

            // tratando os erros com try catch
            try {
                const docRef = await doc(db, docCollection, id)
                const docSnap = await getDoc(docRef)   // snap do doc.

                setDocument(docSnap.data()) // consegue obter os dados que vieram do método getDoc
                setLoading(false);

            } catch (error) {
                console.log(error)
                setError(error.message)

                setLoading(true);  // acho que é false

            }
        }

        loadDocument();
    }, [docCollection, id , cancelled]);

    useEffect(() => {
        return () => setCancelled(true);  // remonta quando precisar utilizar novamente
    }, []);

    return { document, loading, error };  //retorna como objeto para acessar os itens individualmente onde eu quero
}; 