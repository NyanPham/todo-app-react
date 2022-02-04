import { useState, useEffect } from 'react';


export default function useLocalStorage(key, initialValue) {
    const [state, setState] = useState(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)
        if (typeof initialValue === 'function') return initialValue()
        return initialValue
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [state, key, initialValue])

    return (
        { state, setState }
    )
}
