import { handleFetchError } from '../errors/error handling'

export const handleFirstFetchThen = (response) => {
    if(response.ok){
        return response.json();
    } else {
        handleFetchError(response)
    }
}