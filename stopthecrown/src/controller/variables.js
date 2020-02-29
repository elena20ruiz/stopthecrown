

const cityJson = require('../data/variables/city.json');
const countryJson = require('../data/variables/country.json');
const diseasesJson = require('../data/variables/diseases.json');
const nameJson = require('../data/variables/name.json');
const lastNameJson = require('../data/variables/lastname.json');


const variables = {
    'city': cityJson["cities"],
    'country':  countryJson,
    'disease': diseasesJson,
    'name': nameJson,
    'lastname': lastNameJson
}

export default variables;