import * as faker from 'faker';
import { Filters } from './filter/filters';

export default class Util {
    /* 
        Filters the array of objects based on the supplied filters object
        Sample filter Object structure:
        let filters = {
              equityTicker: ["CAD", "GHS"],
            } 
    */
    static  multiFilter = (arr: Object[], filters: Object) => {
        console.log(filters);
        console.log('data ', arr)
        const filterKeys = Object.keys(filters);
        return arr.filter(eachObj => {
            return filterKeys.every(eachKey => {
            if (!filters[eachKey].length) {
                return true; // passing an empty filter means that filter is ignored.
            }
            return filters[eachKey].includes(eachObj[eachKey]);
            });
        });
    }

    //Generate Random Faker data using the faker library
    static getRandomGridData = () => {
        return {
            itemType: ['issuer','security'].sort(function() {return 0.5 - Math.random()})[0],
            originalDateAdded: faker.date.past().toJSON(),
            issuerName: faker.company.companyName(),
            esmi: faker.random.number(),
            equityTicker: faker.finance.currencyCode(),
            debtTicker: faker.finance.currencyCode(),
            restrictionType: faker.commerce.color(),
            restrictionCategory: Filters.restrictionCategory.map(x => x.value).sort(function() {return 0.5 - Math.random()})[0],
            tier: Filters.tier.map(x => x.value).sort(function() {return 0.5 - Math.random()})[0],
            writtenCom: faker.random.word(),
            alphaCapture: faker.random.word(),
            trading: faker.random.word()
        }  
    }

    getRandom = (list) => list[Math.floor((Math.random()*list.length))];
}