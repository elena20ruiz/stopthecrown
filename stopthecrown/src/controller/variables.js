

const cityJson = require('../data/variables/city.json');
const countryJson = require('../data/variables/country.json');
const diseasesJson = require('../data/variables/diseases.json');
const nameJson = require('../data/variables/name.json');
const lastNameJson = require('../data/variables/lastname.json');


const variables = {
    'city': cityJson["cities"],
    'country':  countryJson["countries"],
    'disease': diseasesJson["disease"],
    'name': nameJson["names"],
    'lastName': lastNameJson["last-name"]
}

export default variables;