import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react"
import { useUiContext } from '../context/ui/UIContext';

export const useSearch = () => {
    const { toggleMenu, setSearch, search } = useUiContext()
    const { push } = useRouter()
    const [searchTerm, setSearchTerm] = useState<string>('')

    const [isInputVisible, setIsInputVisible] = useState<boolean>(false)

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    useEffect(() => {

        if (search.length === 0) return


        setSearchTerm(search)
    }, [search])


    const onSearch = (
        toogle: boolean = true
    ) => {
        if (searchTerm.length === 0) return
        push(`/search/${searchTerm}`)
        setSearch(searchTerm)
        if (toogle) toggleMenu()
    }
    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch()
        }
    }

    const showInput = (value: boolean) => {
        setIsInputVisible(value)
    }


    return {
        searchTerm,
        onInputChange,
        onSearch,
        onKeyPress,

        showInput,
        isInputVisible

    }


}