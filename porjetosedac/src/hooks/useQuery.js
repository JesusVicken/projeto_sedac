import { useLocation } from "react-router-dom";
import { useMemo } from "react"; //saber quando foi alterado os valores de um objeto


export function useQuery() {
    const { search } = useLocation()

    return useMemo(() => new URLSearchParams(search), [search]);
}


