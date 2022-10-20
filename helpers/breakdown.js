/**
 *
 * @param {*} policy
 * @param {Number} otherDiscounts
 * @returns
 */
function calculateBreakdown(policy) {
	/** Calculate the policy */
	let breakdownData = {
		// total maret value of items on policy
		market_value: 0.0,
		// total discount on all the vehicles
		total_discounts: 0.0,

		total_premium: 0.0,
		// premium without gct
		renewal_premium: 0.0,
		// ...
		GCT: 0.0,
		// payable premium ( what we charge their card)
		total: 0.0,
		// this will be a full payment
		name: "full",
	};

	for (let a = 0; a < /* policy?.risks?.length */ 1; a++) {
		let risk = policy.risks[a];

		/* Market Value is the sum of insured for all risks */
		breakdownData.market_value += risk.sum_insured;

		/* Total Discounts is the some of all the discounts for each risk */
		// discount for this Risk
		let riskTotalDiscounts = risk.discounts.reduce((total, discount) => total + discount.premium, 0);
		breakdownData.total_discounts += riskTotalDiscounts;

		/* Total Premium is the sum of premium for all risks */
		let riskPremium = risk.renewal_premium - riskTotalDiscounts; // premium for this Risk
		breakdownData.total_premium += riskPremium;

		/* Renewal Premium is the sum of the total Premium + total_discounts ? Fact check with Tashani */
		breakdownData.renewal_premium += riskPremium + riskTotalDiscounts;

		/* GCT is calculated  */
	}

	breakdownData.GCT = (policy.tax_percent / 100) * breakdownData.renewal_premium;

	breakdownData.total = breakdownData.renewal_premium + breakdownData.GCT;

	return breakdownData;
}

export { calculateBreakdown };
