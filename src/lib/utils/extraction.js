import { getYear } from "./formatters";

export const getPolicyInfo = (policies) => {
    let address;
    let mobilePhones = [];
    let homePhones = [];
    let gender;
    let foundMainInsured = false;
    let foundMainLocation = false;
    let policy = policies[0];
    policy?.insured?.forEach((individual) => {
        if (!foundMainInsured) {
            if (individual?.is_main_insured) {
                foundMainInsured = true;
                individual?.global_name?.locations?.forEach((location) => {
                    if (!foundMainLocation) {
                        if (location?.is_main_location) {
                            foundMainLocation = true;
                            address =
                                location.street_number +
                                " " +
                                location.street_name +
                                " " +
                                location.street_type +
                                ", " +
                                location.town;
                        }
                    }
                });
                individual.global_name?.phone_numbers?.forEach((numberObj) => {
                    if (numberObj?.type == "Mobile") {
                        mobilePhones.push(numberObj.phone_number);
                    }

                    if (numberObj?.type == "Home") {
                        homePhones.push(numberObj.phone_number);
                    }
                })
                gender = individual.global_name?.gender;
            }
        }
    });


    return { address, mobilePhones, homePhones, gender };
};

export const getInsuredSince = (policies) => {
    let earliestDate = new Date();
    policies.forEach((policy) => {
        if (new Date(policy.inception_date) < earliestDate) {
            earliestDate = new Date(policy.inception_date);
        }
    });
    return getYear(earliestDate);
};

export const getVehicleSummary = (policy) => {
    let mostRecentCertDate = new Date("0");
    let endorsement;
    let vehicle = policy.risks[0]
    vehicle.certificates.forEach(certificate => {
        if (new Date(certificate.last_date_printed) > mostRecentCertDate) {
            mostRecentCertDate = new Date(certificate.last_date_printed);
            endorsement = certificate.endorsement_number;
        }
    })
    const colour = vehicle.colour;
    const bodyType = vehicle.body_type;
    const ccRating = vehicle.hp_cc_rating;
    const seating = vehicle.seating;
    const registration = vehicle.registration_number;
    const chassis = vehicle.chassis_number;
    const use = vehicle.usage_description;
    const engineNo = vehicle.engine_number;

    return { endorsement, colour, bodyType, ccRating, seating, registration, chassis, use, engineNo }
}

export const getRiskDetails = (risk) => {
    let mostRecentCertDate = new Date("0");
    let endorsement;

    risk.certificates.forEach(certificate => {
        if (new Date(certificate.last_date_printed) > mostRecentCertDate) {
            mostRecentCertDate = new Date(certificate.last_date_printed);
            endorsement = certificate.endorsement_number;
        }
    })

    const colour = risk.colour;
    const bodyType = risk.body_type;
    const ccRating = risk.hp_cc_rating;
    const seating = risk.seating;
    const registration = risk.registration_number;
    const chassis = risk.chassis_number;
    const use = risk.usage_description;
    const engineNo = risk.engine_number;
    const sumInsured = risk.sum_insured;
    const year = risk.year;
    const make = risk.make;
    const model = risk.model;

    return { endorsement, colour, bodyType, ccRating, seating, registration, chassis, use, engineNo, sumInsured, year, make, model }
}

export const getDescription = (descriptionString) => {
    let [title, value] = descriptionString.split("-");
    title = title?.trim();
    value = value?.trim();
    return { title, value };
}

/** For use with certificates and cover notes returned from API */
export const getDocumentTitle = (input) => {
    const filter = new RegExp("-(.*) on");
    const result = input.match(filter);
    const formatted = result[0].slice(1, -3).trim()
    return formatted;
}