import { useState } from "react"

export default (apiFunc : any) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const request = (...args : any) => {
        setIsLoading(true)
        try {
            const result = apiFunc(...args)
            setData(result.data)
        }
        catch (error:any) {
            setError(error.message || "Unexpected Error")
        }
        finally {
            setIsLoading(false)
        }
    }

    return { data, error, isLoading, request}
}