/**
 * Checks to see if document's POCA information is valid
 * @param startDate - Date of policy
 * @param poca - Policy's POCA object
 * @returns {boolean|boolean}
 */
export const isPocaCompliant = (startDate, poca) => {
	return poca.is_poca_compliant && Date.parse(poca.poca_documents_expire) >= Date.parse(startDate);
};
