import { UsaStates } from 'usa-states';
import provinces from "provinces-ca"
import ukCounties from 'uk-counties';

export const demoListOfCountries = [
    "Jamaica", "United States of America", "Canada", 
    "United Kingdom"].sort();

export const listOfUSAStates = (new UsaStates()).states.map(state => ({ label: state.name, value: state.name })); 

export const listOfJamaicanParishes = [
    "Kingston", "St. Andrew", "St. Catherine",
    "Clarendon", "Manchester", "St. Elizabeth",
    "Westmoreland", "Hanover", "St. James",
    "Trelawny", "St. Ann", "St. Mary", "Portland",
    "St. Thomas"
].map(parish => ({ label: parish, value: parish }))

export const listOfCanadianProvincesAndTerritories = provinces.map(territory => ({ label: territory.name, value: territory.name }));

export const listOfUkCounties = ukCounties.map(county => ({ label: county, value: county }))