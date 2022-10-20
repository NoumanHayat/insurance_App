// eslint-disable-next-line
import { applicableNarratives } from "../constants";
import { isPocaCompliant } from "../helpers/document_validation";
// import axios from "./axios";
import axios from 'axios';

// /**
//  * get the risks on a policy
//  *
//  * @param {*} token
//  * @param {*} customer_id
//  * @param {*} policy_id
//  * @param {boolean} return_renewal_rates
//  */
// export async function getPolicyRisks(token, customer_id, policy_id, return_renewal_rates = true) {
// 	const endpoint = "/api/getPolicyRisks";

// 	const headers = {
// 		"x-access-token": token,
// 	};

// 	const payload = {
// 		policyID: policy_id,
// 		isRenewal: return_renewal_rates,
// 	};

// 	let response = await axios.get(endpoint, {
// 		headers: headers,
// 		params: payload,
// 	});

// 	return { ...response.data };
// }

// /**
//  * get payment plan on a policy
//  *
//  * @param {*} token
//  * @param {*} policy_id
//  * @returns
//  */
// export const getPolicyPaymentPlan = async (token, policy_id) => {
// 	let pPaymentPlan = {};

// 	const endpoint = `/api/getPolicyPaymentPlan`;

// 	pPaymentPlan = (
// 		await axios.get(endpoint, {
// 			headers: { "x-access-token": token },
// 			params: {
// 				policy_id,
// 			},
// 		})
// 	).data;

// 	return pPaymentPlan;
// };

// /**
//  * get the payment options available for this policy
//  *
//  * @param {{ policy}} param
//  * @returns
//  */
// export const getPaymentPlanOptions = async ({ token, policy }) => {
// 	if (!policy || !policy.risks) throw new Error("Invalid policy");

// 	const premium_endpoint = `/api/getPaymentOptions`;
// 	let headers = {
// 		"x-access-token": token,
// 	};
// 	let payload = {
// 		policy_id: policy.policy_id,
// 		limits: policy.limits,
// 		policy_prefix: policy.policy_prefix,
// 		tax_percent: policy.tax_percent,
// 		currency: policy.currency,
// 		risks: policy.risks,
// 	};

// 	const response = (await axios.post(premium_endpoint, payload, { headers })).data;

// 	return response;
// };

// /**
//  * get the additional benefits a person is eligible for - must write own logic to handle benefits they already possess
//  *
//  * @param {{ policy_prefix, is_third_party_policy, manual_rates, sum_insured, group_name, year}} policy
//  * @returns
//  */
// export const getAddOnBenefits = async ({
// 	token,
// 	policy_prefix,
// 	is_third_party_policy,
// 	risks,
// 	sum_insured,
// 	group_name,
// }) => {
// 	const risk = risks[0];
// 	const headers = {
// 		"x-access-token": token,
// 	};
// 	let payload = {
// 		policy_prefix: policy_prefix,
// 		usage_code: risk?.usage_code,
// 		is_third_party_policy: is_third_party_policy,
// 		car_year: risk?.year,
// 		rates: risk?.manual_rates,
// 		sum_insured: sum_insured,
// 		group: group_name || "",
// 	};

// 	let response = (await axios.post("/n/v2/additionalbenefit/generate", payload, { headers })).data;

// 	return response;
// };

// export const renewalPremiumCalculator = async (payload) => {
// 	let response = {};
// 	let token = payload.token;
// 	const endpoint = `/api/renewalPremiumCalculator`;
// 	payload = payload.requestBody;
// 	response = await axios.post(endpoint, payload, {
// 		headers: {
// 			"x-access-token": token,
// 		},
// 	});

// 	return response;
// };

// // @ts-ignore
// function assignReceipt(policy, total) {
// 	let middlewareReceiptCurrency = "jmd";
// 	const formatCurrency = (currency) =>
// 		currency.toLowerCase() === "jmd" ? "JA" : currency.toLowerCase === "usd" ? "US" : currency;

// 	return [
// 		{
// 			auto_authorize: true,
// 			// TODO BRANCH Is Mandatory try "HEAD OFFICE"
// 			branch: config.receipt_branch_name,
// 			receipt_date: format(new Date(), "MM/dd/yyyy"),
// 			policy_id: policy.policy_id,
// 			amount: total,
// 			payment_type: "Advantage General On-line",
// 			currency: formatCurrency(middlewareReceiptCurrency),
// 			is_tax_exempt: false,
// 		},
// 	];
// }

// export const getPolicyProfExt = async (token, policyPrefix) => {
// 	let extensions = {};

// 	const endpoint = `/api/getPolicyProfExt`;
// 	const payload = {
// 		params: {
// 			token: token,
// 			policyPrefix: policyPrefix,
// 		},
// 		headers: {
// 			"x-access-token": token,
// 		},
// 	};

// 	extensions = await (await axios.get(endpoint, payload)).data;

// 	return extensions;
// };

// function getRenewalStartDate(policyRenewalDateString) {
// 	const policyRenewalDate = format(new Date(policyRenewalDateString), "MM/dd/yyyy H:mm:ss");
// 	let tempDate = new Date();
// 	let startDate = format(tempDate, "MM/dd/yyyy H:mm:ss");

// 	if (isBefore(tempDate, new Date(policyRenewalDateString)) || isEqual(tempDate, new Date(policyRenewalDateString))) {
// 		const tempDate = format(add(new Date(policyRenewalDate), { days: 1 }), "MM/dd/yyyy");
// 		startDate = format(add(new Date(tempDate), { minutes: 1 }), "MM/dd/yyyy H:mm:ss");
// 	}
// 	return startDate;
// }

// /**
//  * Retrieves risk codes from policy's risks array
//  *
//  * @param risks Policy's risks
//  * @returns {*}
//  */
// const getRenewalRisk = (risks) => {
// 	return risks.map((risk) => {
// 		let temp = { ...risk };
// 		temp.ncd_percent = temp.renewal_ncd_percent;
// 		temp.manual_rates = temp.manual_rates.filter((rate) => rate.code);
// 		return temp;
// 	});
// };

// /**
//  * Gets renewal date for a policy based on the start date of the policy
//  * @param startDate Start date of the policy
//  * @returns {string}
//  */
// const getRenewalEndDate = (startDate) => {
// 	let tempDate = format(subDays(add(new Date(startDate), { months: 12 }), 1), "MM/dd/yyyy");
// 	return format(add(new Date(tempDate), { hours: 23, minutes: 59 }), "MM/dd/yyyy H:mm:ss");
// };

// /** Missing Documents */
// function listMissingDocuments(naratives) {
// 	return naratives.filter((narative) => applicableNarratives.includes(narative.code));
// }

// /**
//  * Runs functions required to renew and update a specified policy
//  * @param {String} token
//  * @param {Object} _policy Specified policy
//  * @param {Object} user
//  * @param {[]} _codes
//  * @param {Object} paymentInfo
//  * @param {React.MutableRefObject<{receipt: Boolean, billing: Boolean, renewal: Boolean}>} completedSteps
//  * @returns {Promise}
//  */
// export const renewAndUpdatePolicy = async (token, _policy, user, _codes = [], paymentInfo, completedSteps) => {
// 	let policy = { ..._policy };
// 	const IS_PART_PAYMENT = paymentInfo.paymentPlan.name.toLowerCase().includes("full") === false;
// 	const codes = [..._codes]; //populateTempRates()
// 	const extensionDetails = await getPolicyProfileExt(token, policy.policy_prefix);

// 	if (!extensionDetails.success) {
// 		return;
// 	}

// 	const startDate = getRenewalStartDate(policy.end_date) || "";
// 	const endDate = getRenewalEndDate(startDate) || "";
// 	const risk = getRenewalRisk(policy.risks) || [];

// 	// If type of cover is a PPV then only offer cover for 7 days, otherwise give the 30
// 	const effectiveCover =
// 		policy.type_of_cover && policy.type_of_cover.toLowerCase().includes("passenger vehicle") ? 30 : 7;

// 	const _isPocaCompliant = isPocaCompliant(format(new Date(startDate), "MM/dd/yyyy"), user.poca);
// 	const noPendingDocuments = listMissingDocuments(policy.renewal_narratives).length === 0;
// 	// [LOADER]

// 	let paymentPlanId = "";
// 	if (IS_PART_PAYMENT) {
// 		/* const paymentPlanResult = await PolicyNetworkLayer.getPaymentPlans(
// 			token,
// 			user.national_id,
// 			"JA",
// 			policy.policy_prefix
// 		); */
// 		paymentPlanId = paymentInfo.paymentPlan.id; //paymentPlanResult.payment_plans[0].id;
// 	}

// 	let receipt = assignReceipt(policy, paymentInfo.total, paymentInfo.premiumPA_UM);

// 	const receiptResponse = await drawReceipt(token, receipt);

// 	if (!receiptResponse.success) return { ...receiptResponse.success };

// 	const renewalResult = await renewPolicy(
// 		token,
// 		policy,
// 		paymentPlanId,
// 		codes,
// 		_isPocaCompliant && noPendingDocuments,
// 		effectiveCover,
// 		identifyPolicyType(policy, "home"),
// 		startDate,
// 		endDate,
// 		risk,
// 		user
// 	);

// 	if (!renewalResult.success) return { ...renewalResult };

// 	return {
// 		...renewalResult,
// 		isPocaCompliant: _isPocaCompliant,
// 		noPendingDocuments: noPendingDocuments,
// 		paymentInfo: paymentInfo,
// 		startDate: startDate,
// 		extensionDetails: extensionDetails,
// 	};
// };

// /**
//  *
//  * @param {*} token
//  * @param {*} policy
//  * @param {*} paymentPlanId
//  * @param {*} codes
//  * @param {boolean} createCertificate
//  * @param {*} effectiveCover
//  * @param {*} homePolicy
//  * @param {*} startDate
//  * @param {*} endDate
//  * @param {*} risks
//  * @param {*} user
//  * @returns
//  */
// export const renewPolicy = async (
// 	token,
// 	policy,
// 	paymentPlanId,
// 	codes,
// 	createCertificate,
// 	effectiveCover,
// 	homePolicy,
// 	startDate = "",
// 	endDate = "",
// 	risks = [],
// 	user
// ) => {
// 	let response = {};
// 	const endpoint = `/api/policyUpdateRenew`;

// 	let global_namess = [...policy.global_namess];

// 	let _policy = cleanPolicyForRenewal(policy);
// 	let _risks = cleanRisksForRenewal(risks);

// 	const homePolicyPayload = () => {
// 		for (let i = 0; i < codes.length; i++) {
// 			for (let j = 0; j < _risks[i].manual_rates.length; j++) {
// 				if (codes[i].code === _risks[j].manual_rates[j].code) {
// 					_risks[j].manual_rates.splice(j, 1);
// 				}
// 			}
// 		}

// 		for (let i = 0; i < global_namess.length; i += 1) {
// 			global_namess[i] = { ...global_namess[i] };
// 			if (global_namess[i]) {
// 				delete global_namess[i].poca;
// 				delete global_namess[i].locations;
// 				delete global_namess[i].email_address;
// 				delete global_namess[i].phone_numbers;
// 			}
// 		}

// 		return {
// 			authorize_transaction: true,
// 			policy: {
// 				..._policy,
// 				source_name: "Direct", // hardcoded based on legacy
// 				end_date: endDate,
// 				start_date: format(new Date(startDate), "MM/dd/yyyy H:mm:ss"),
// 				insureds: _policy.insureds,
// 				payment_plan_id: paymentPlanId,
// 			},
// 			global_namess: global_namess,
// 			risks: _risks,
// 		};
// 	};

// 	const motorPolicyPayload = () => {
// 		for (let i = 0; i < global_namess.length; i += 1) {
// 			global_namess[i] = { ...global_namess[i] };
// 			if (global_namess[i]) {
// 				delete global_namess[i].poca;
// 				delete global_namess[i].locations;
// 				delete global_namess[i].email_address;
// 				delete global_namess[i].phone_numbers;
// 			}
// 		}

// 		for (let i = 0; i < _risks.length; i += 1) {
// 			_risks[i] = { ..._risks[i] };
// 			if (risks[i].authorized_driver_wording) {
// 				delete _risks[i].authorized_driver_wording;
// 				_risks[i].sum_insured = _risks[i].renewal_sum_insured;
// 				_risks[i].year_for_rating = _risks[i].year;
// 			}
// 		}

// 		delete _policy.extensions;
// 		return {
// 			authorize_transaction: true,
// 			create_certificate: createCertificate,
// 			create_cover_note: !createCertificate,
// 			cover_note_details: {
// 				effective_date: startDate,
// 				days_effective: effectiveCover,
// 				manual_numbers: risks.map((risk) => ({
// 					risk_id: risk.risk_id,
// 					risk_external_id: "",
// 					manual_number: 11111121559,
// 				})),
// 				/* {
// 							risk_id: risks[0].risk_id,
// 							risk_external_id: "",
// 							manual_number: 11111121559,
// 						}, */
// 			},
// 			// trans_wording: "",
// 			policy: {
// 				..._policy,
// 				// branch: config.receipt_branch_name,
// 				source_name: "Direct", // hardcoded based on legacy
// 				end_date: endDate,
// 				start_date: format(new Date(startDate), "MM/dd/yyyy H:mm:ss"),
// 				insureds: _policy.insureds,
// 				payment_plan_id: paymentPlanId,
// 			},
// 			global_namess: global_namess,
// 			risks: _risks,
// 		};
// 	};

// 	let payload;
// 	// for future use
// 	if (homePolicy) {
// 		payload = homePolicyPayload();
// 	} else {
// 		payload = motorPolicyPayload();
// 	}

// 	response = (await axios.post(endpoint, payload)).data;
// 	return response;
// };

// const cleanPolicyForRenewal = (policy) => {
// 	let _policy = JSON.parse(JSON.stringify(policy));
// 	/* let removeProp = (obj, field) =>  */

// 	delete _policy.account_code;
// 	delete _policy.account_name;
// 	delete _policy.billing_account_code;
// 	delete _policy.cancel_date;
// 	delete _policy.cancel_reason_details;
// 	delete _policy.date_for_renewal_to_start;
// 	delete _policy.effective_cancel_date;
// 	delete _policy.endorsements_that_apply;
// 	delete _policy.estimated_maximum_loss;
// 	delete _policy.fa_excess_percent;
// 	delete _policy.fa_excess_description;
// 	delete _policy.global_namess;
// 	delete _policy.inception_date;
// 	delete _policy.insured;
// 	delete _policy.insured_text;
// 	delete _policy.is_cancelled;
// 	delete _policy.is_cancelled;
// 	delete _policy.is_in_renewal;
// 	delete _policy.is_loss_of_profit_policy;
// 	delete _policy["is_pre-existing_policy"];
// 	delete _policy.is_premium_financed;
// 	delete _policy.missing_documents;
// 	delete _policy.other_risk_details;
// 	delete _policy.peril_type;
// 	delete _policy.risks;
// 	delete _policy.sections_that_dont_apply;
// 	delete _policy.source_account_code;
// 	delete _policy.source_comm_rate;
// 	delete _policy.tax_percent;
// 	delete _policy.territorial_limits;
// 	delete _policy.type_of_cover;
// 	delete _policy.warranties_do_not_apply;

// 	return _policy;
// };

// const cleanRisksForRenewal = (risks) => {
// 	let _risks = [...risks];

// 	for (let a = 0; a < _risks.length; a++) {
// 		let _risk = { ..._risks[a] };

// 		//TODO: look into drivers property

// 		delete _risk.certificates;
// 		delete _risk.cover_notes;
// 		delete _risk.loadings;
// 		delete _risk.mortgagee_text;
// 		delete _risk.risk_description;
// 		delete _risk.risk_section_number;
// 		delete _risk.veh_cert_expiry_date;
// 		delete _risk.veh_cnote_expiry_date;
// 		delete _risk.vehicle_location;

// 		_risks[a] = _risk;
// 	}

// 	return _risks;
// };

const UAT = 'https://uat.advantagegeneral.com:8090';
const MOCK = 'https://abb285ca-c07a-47a2-8e67-26cf2f1163a3.mock.pstmn.io';

export const getVehicleDocs = async ( pocal, policy ) => {
	let docs = [];
	const { start_date, missing_documents, policy_id, risks, global_names, poca } = policy
	const auth = await axios.get(`${UAT}/api/auth`);
	const token = auth.data[0]?.Response[0]?.key
	for (let i = 0; i < risks.length; i++) {
		let { make, model, registration_number, year, risk_id } = risks[i];
		let doc = {
			risk_id,
			make,
			model,
			year,
			registration_number,
		};
		let new_poca = global_names[0]?.poca
		console.log({ policy_id, risk_id })
		console.log("is_poca_compliant", new_poca)

		if (isPocaCompliant(start_date, new_poca) && missing_documents.length === 0) {
			// if (true) {
			console.log("Getting certificate")
			const response = await getCertificate( policy_id, risk_id );
			console.log("response ", response)
			doc.data = response.data;
		} else {
			console.log("Getting cover note")
			const response = await getCoverNote( policy_id, risk_id );
			doc.data = response.data;
			console.log("response ", response)
		}
		docs.push(doc);
	}
	console.log("Docs: ", docs)
	return docs;
};

export const getCoverNote = async ( policy_id, risk_id ) => {
	const token = auth.data[0]?.Response[0]?.key
	let endpoint = `${UAT}/api/getCoverNote?token=${token}`
	const payload = {
		policy_id,
		risk_id,
	};

	return (await axios.post(endpoint, payload, { headers: { "x-access-token": token } })).data;
};

export const getCertificate = async ( policy_id, risk_id ) => {
	const token = auth.data[0]?.Response[0]?.key
	let endpoint = `${UAT}/api/getCertificate?token=${token}`
	const payload = {
		policy_id,
		risk_id,
	};

	return (await axios.post(endpoint, payload, { headers: { "x-access-token": token } })).data;
};

export const getTransactionSchedule = async ( transactionId ) => {
	let schedule = {};
	const auth = await axios.get(`${UAT}/api/auth`);
	const token = auth.data[0]?.Response[0]?.key
	let endpoint = `${UAT}/api/getTransactionSchedule?token=${token}`;
	let payload = {
		transaction_id: transactionId,
	};

	schedule = await axios.post(endpoint, payload, { headers: { "x-access-token": token } });

	return schedule;
};

//add Payment plan

export const addPaymentPlan = async (policy_id, transaction_premium) => {
	let schedule = {};
	const auth = await axios.get(`${UAT}/api/auth`);
	const token = auth.data[0]?.Response[0]?.key
	let endpoint = `${UAT}/api/PolicyModification?token=${token}`;
	let payload = {
		action: "create_next_payment_term_transaction",
		authorize_transaction: true,
		create_certificate: false,
		create_cover_note: true,
		// effective_time: "14:51",
		is_do_not_prorate: false,
		is_tax_exempt: false,
		transaction_premium,
		policy_id
	};

	schedule = await axios.post(endpoint, payload, { headers: { "x-access-token": token } });

	return schedule;
};

export const getPolicy = async (policy_id) => {
	let poly = {};
	const auth = await axios.get(`${UAT}/api/auth`);
	const token = auth.data[0]?.Response[0]?.key
	let encoded_policy_id = encodeURIComponent(policy_id)
	let endpoint = `${UAT}/api/getPolicy?token=${token}&policyID=${encoded_policy_id}`;

	poly = await axios.get(endpoint);

	return poly.data;
};

export const policyUpdate = async (policy_id, risks, extensions) => {
	let schedule = {};
	const auth = await axios.get(`${UAT}/api/auth`);
	const token = auth.data[0]?.Response[0]?.key
	const poly = await getPolicy(policy_id);
	// delete policy.insured;
	// delete policy.global_names;
	// delete policy.risks;
	// console.log("Generated Policy: ", poly)
	const global_names = poly.global_names
	// const risk = poly?.risks?.map(function(item) { 
	// 	delete item.authorized_driver_wording; 
	// 	return item
	// });
	let endpoint = `${UAT}/api/policyUpdateRenew?token=${token}`;
	let payload = {
		"authorize_transaction": true,
		"create_certificate": false,
		"is_do_not_prorate": false,
		"create_cover_note": true,
		"cover_note_details": {
			days_effective: 7,
			effective_date: "09/26/2022 14:40:51",
			"manual_numbers": [
				{
					manual_number: 11111121559,
					risk_external_id: "",
					risk_id: risks[0].risk_id
				}
			]
		},
		// global_names: [
		// 	{
		// 		company_name:global_names[0].company_name,
		// 		dob:global_names[0].dob,
		// 		drivers_licence_country:global_names[0].drivers_licence_country,
		// 		drivers_licence_date_issued:global_names[0].drivers_licence_date_issued,
		// 		drivers_licence_expiry_date:global_names[0].drivers_licence_expiry_date,
		// 		drivers_licence_first_issued:global_names[0].drivers_licence_first_issued,
		// 		drivers_licence_number:global_names[0].drivers_licence_number,
		// 		drivers_licence_type:global_names[0].drivers_licence_type,
		// 		employment_type:global_names[0].employment_type,
		// 		first_name:global_names[0].first_name,
		// 		gender:global_names[0].gender,
		// 		global_names_id:global_names[0].global_names_id,
		// 		global_names_number:global_names[0].global_names_number,
		// 		industry:global_names[0].industry,
		// 		is_a_company:global_names[0].is_a_company,
		// 		is_a_service_provider:global_names[0].is_a_service_provider,
		// 		is_filled_externally:global_names[0].is_filled_externally,
		// 		is_of_special_interest:global_names[0].is_of_special_interest,
		// 		is_subject_to_gdpr:global_names[0].is_subject_to_gdpr,
		// 		last_name:global_names[0].last_name,
		// 		maiden_name:global_names[0].maiden_name,
		// 		mailing_name:global_names[0].mailing_name,
		// 		marital_status:global_names[0].marital_status,
		// 		middle_name:global_names[0].middle_name,
		// 		national_id:global_names[0].national_id,
		// 		national_id_type:global_names[0].national_id_type,
		// 		nationality:global_names[0].nationality,
		// 		notes:global_names[0].notes,
		// 		occupation:global_names[0].occupation,
		// 		place_of_birth:global_names[0].place_of_birth,
		// 		salutation_name:global_names[0].salutation_name,
		// 		service_type:global_names[0].service_type,
		// 		tax_id_number:global_names[0].tax_id_number,
		// 		taxi_badge_date_expires:global_names[0].taxi_badge_date_expires,
		// 		taxi_badge_date_first_issued:global_names[0].taxi_badge_date_first_issued,
		// 		taxi_badge_number:global_names[0].taxi_badge_number,
		// 		title:global_names[0].title
		// 	}
		// ],
		policy: {...poly.policy, start_date: "09/26/2022 00:01:00", end_date: "09/26/2023 00:01:00", extensions},
		risks: risks
	};

	schedule = await axios.post(endpoint, payload);
	console.log("Schedule: ", payload.policy)
	return schedule;
};



/**
 * @param {any} token
 * @param {{ auto_authorize: boolean; branch: string; receipt_date: string; policy_id: any; amount: number; payment_type: string; currency: string; is_tax_exempt: boolean; }[]} receiptArray
 */
export const drawReceipt = async (receiptArray) => {
	let payload = {
		receiptArray,
	};
	const auth = await axios.get(`${UAT}/api/auth`);
	const token = auth.data[0]?.Response[0]?.key
	let endpoint = `${UAT}/api/drawReceiptBatch?token=${token}`;
	let response = await axios.post(endpoint, payload)
	// console.log(response.data);
	return response.data;
};
