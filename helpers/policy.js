import { includedPolicies } from "./renewable_policy_prefixes";

/**\
 *
 * return whether a policy passes the condition for renewal
 *
 * @param {*} policy
 * @returns
 */
export function canRenew(policy) {
	return (
		policy.status === "In Renewal" &&
		includedPolicies.includes(policy.policy_prefix) &&
		policy.renewal_status !== "Scrutiny"
	);
}
