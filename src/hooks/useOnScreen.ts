import { useEffect, useState } from "react";
import { RefObject } from "react";

const useOnScreen = (ref: RefObject<HTMLDivElement>) => {
    const [intersecting, setIntersecting] = useState(false)
    const [alreadySeen, setAlreadySeen] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            return setIntersecting(entry.isIntersecting)
        })

        if (ref.current) {
            observer.observe(ref.current)
        }
    }, [ref])

    useEffect(() => {
        if (!alreadySeen) {
            setAlreadySeen(intersecting)
        }
    }, [intersecting, alreadySeen])

    return {
        alreadySeen
    }

}

export { useOnScreen }