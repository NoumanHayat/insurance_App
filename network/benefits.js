import { handleLowLevelAxiosError } from "../src/lib/utils/errors/error handling";
import axios from "./axios";

export async function getAdditionalBenefits({ token, policy }) {
	let payload = {
		policy_prefix: policy?.policy_prefix,
		// usage_code: policy?.risks[0]?.usage_code,
		is_third_party_policy: policy?.is_third_party_policy,
		// car_year: policy?.risks[0]?.year,
		// rates: policy?.risks?.[0]?.manual_rates,
		// sum_insured: policy?.sum_insured,
		group: policy?.group_name || "",
		risks: policy?.risks?.map(
			({ usage_code, year: car_year, manual_rates: rates, risk_id, plate_number, sum_insured }) => ({
				risk_id,
				usage_code,
				car_year,
				rates,
				plate_number,
				sum_insured,
			})
		),
	};
	let response = await axios
		.post("/n/v2/additionalbenefit/generate", payload, { headers: { "x-access-token": token } })
		.catch(handleLowLevelAxiosError);

	return response.data;
}
