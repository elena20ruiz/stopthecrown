

const cityJson = require('../data/variables/city.json');
const countryJson = require('../data/variables/country.json');
const diseasesJson = require('../data/variables/diseases.json');
const nameJson = require('../data/variables/name.json');
const lastNameJson = require('../data/variables/lastname.json');


function intArray(min, max) {
    var output = []
    var i = min;
    while(i <= max) {
        output.push(i);
        i += 1;
    }
    return output;
}

const variables = {
    'city': cityJson["cities"],
    'country':  countryJson["countries"],
    'disease': diseasesJson["disease"],
    'name': nameJson["names"],
    'lastName': lastNameJson["last-name"],
    'temperature': intArray(39, 46),
    'year': intArray(10, 30),
}

export default variables;