import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config"
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null,
};


//método deletar documentos no Firebase

const deleteReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };
        case "DELETED_DOC":
            return { loading: false, error: null };
        case "ERROR":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const useDeleteDocument = (docCollection) => {
    const [response, dispatch] = useReducer(deleteReducer, initialState);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    };

    const deleteDocument = async (id) => {
        checkCancelBeforeDispatch({
            type: "LOADING",
        });

        try {
            const deleteDocument = await deleteDoc(doc(db, docCollection, id))  //doc.referência do documento e como encontro DocCollection e tb id quando invocar a função

            checkCancelBeforeDispatch({
                type: "DELETED_DOC",
                payload: deleteDocument,
            });
        } catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            });
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { deleteDocument, response };
};