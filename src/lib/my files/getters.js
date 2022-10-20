import { UAT_DOMAIN } from "@env";
import { handleFirstFetchThen } from "../utils/network/general";
import { doesStringContainPattern } from "./validation";

export const getCertificateBase64File = async (tertiaryToken, policyId, riskId) => {

    return await fetch(`${UAT_DOMAIN}/api/getCertificate?token=${tertiaryToken}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "policy_id": policyId,
            "risk_id": riskId
        })
    })
        .then(handleFirstFetchThen)
        .then(res => {
            if (res.success) {
                console.log("Successfully retrieved certificate")
                const base64File = "data:application/pdf;base64," + res.data.data
                return {
                    file: base64File,
                    description: res.data.description,
                    fileName: res.data.file_name
                }
            } else {
                console.warn("Res.success is false. Here is res: ", res)
                if (doesStringContainPattern(res.error_message, "Bad Key")) {
                    console.warn("Bad Key detected")
                    throw { message: res.error_message }
                } else {
                    console.error("There was an error retrieving the certificate:: ", res.error_message)
                }
            }
        })
        .catch(err => {
            console.error(err);
            throw err;
        })



}

export const getCoverNoteBase64File = async (tertiaryToken, policyId, riskId) => {
    return await fetch(`${UAT_DOMAIN}/api/getCovernote?token=${tertiaryToken}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "policy_id": policyId,
            "risk_id": riskId
        })
    })
        .then(handleFirstFetchThen)
        .then(res => {
            if (res.success) {
                const base64File = "data:application/pdf;base64," + res.data.data
                return {
                    file: base64File,
                    description: res.data.description,
                    fileName: res.data.file_name
                }
            } else {
                console.warn("Res.success is false. Here is res: ", res)
                if (doesStringContainPattern(res.error_message, "Bad Key")) {
                    console.warn("Bad Key detected")
                    throw { message: res.error_message }
                } else {
                    console.error("There was an error retrieving the covernote:: ", res.error_message)
                }
            }
        })
        .catch(err => {
            console.error(err);
            throw err;
        })



}

export const fetchTertiaryToken = async (doc) => {
    return await fetch(`${UAT_DOMAIN}/api/auth`)
        .then(handleFirstFetchThen)
        .then(res => {
            const { success, key: token } = res[0].Response[0];
            if (success) {
                console.log(`token for ${doc}:: `, token)
                return token
            } else {
                throw { message: res.error_message }
            }
        })
        .catch(err => {
            console.error(err);
            throw err;
        })
}