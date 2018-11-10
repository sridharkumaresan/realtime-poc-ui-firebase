import * as faker from 'faker';
export default class Util {
    static  multiFilter = (arr: Object[], filters: Object) => {
        console.log(filters);
        console.log('data ', arr);

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
            originalDateAdded: faker.date.past().toJSON(),
            issuerName: faker.company.companyName(),
            esmi: faker.random.number(),
            equityTicker: faker.finance.currencyCode(),
            debtTicker: faker.finance.currencyCode(),
            restrictionType: faker.commerce.color(),
            restrictionCategory: faker.random.word(),
            writtenCom: faker.random.word(),
            alphaCapture: faker.random.word(),
            trading: faker.random.word()
        }
    }

}
