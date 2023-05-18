import { useLocation } from "react-router-dom"; //valor fique salvo, nao re-execute a função novamente
import { useMemo } from "react"; //saber quando foi alterado os valores de um objeto

// pequeno HOOK para pegar parâmetro URl mais pro separando as funcionalidades do sistema

export function useQuery() {
    const { search } = useLocation()

    return useMemo(() => new URLSearchParams(search), [search]);      //só vai ser executada quando o search for alterado [search]
}


