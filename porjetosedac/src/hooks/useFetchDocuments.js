import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {  // métodos para trazer os dados do projeto
  collection, // definir a coleção
  query,  // pegar o dado
  orderBy, // ordenar os dados
  onSnapshot, // trazer os dados novos
  where, // filtro nos resultados trazidos
} from "firebase/firestore";

//hook de resgate de dados 

export const useFetchDocuments = (docCollection, search = null, uid = null) => {   // parâmetros opcionais (= nul) ñ precisamos mandar necessariamente
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // memory leak, vazamento de memória
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) {
        return;
      }

      setLoading(true);

      const collectionRef = await collection(db, docCollection);
      //tratando erros com try,catch
      try {
        let q;

        //busca, filtro
        if (search) {
          q = await query(
            collectionRef,
            where("tagsArray", "array-contains", search), //verifica se o item está dentro do array
            orderBy("createdAt", "desc") //ordenar 
          );
        } else if (uid) {
          q = await query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createdAt", "desc")
          );
        } else if (uid) {
          q = await query(
            collectionRef,
            where("uid", "==", uid ), //verifica se o item está dentro do array
            orderBy("createdAt", "desc") //ordenar 
          );

        } else {
          q = await query(collectionRef, orderBy("createdAt", "desc"));
        }

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({ //resgatando apenas os dados q eu quero do banco
              id: doc.id,  //resgatando o id do banco
              ...doc.data(),
            }))
          );
        });
      } catch (error) {
        console.log(error);
        setError(error.message); //colocando msg no state de erro pra saber o que aconteceu, mostrar pro usuário

        setLoading(false);
      }

      //aqui tinha um setLoading verificar se loading é aqui mesmo
    }

    loadData();
  }, [docCollection, search, uid, cancelled]);

  console.log(documents);

  useEffect(() => {
    return () => setCancelled(true);  // remonta quando precisar utilizar novamente
  }, []);

  return { documents, loading, error };  //retorna como objeto para acessar os itens individualmente onde eu quero
}; 