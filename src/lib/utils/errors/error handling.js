

/** This function is to be used when the `ok` property of a fetch's response is false. */
export const handleFetchError = (response) => {
    const error = {
        status: response?.status,
        statusText: response?.statusText,
        type: response?.type
    }

    throw error;
}

/** If there is an error with the response then this method throws an object with the keys `status`, `data` and `type: "Response"`.
 *  If there is an error with the request, then this method throws an object with the keys `data` and `type: "Request"`.
 *  Otherwise, it will log the `error.message` to the console.
 */
export const handleLowLevelAxiosError = (error) => {
    if (error?.response) {
        // from https://axios-http.com/docs/handling_errors 
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const status = error.response.status;
        const data = error.response.data;
        const customError = { status, data, type: "Response" }
        console.error(customError);
        throw customError;
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error(error.request);
        throw { type: "Request", data: error.request }
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
    }
}






