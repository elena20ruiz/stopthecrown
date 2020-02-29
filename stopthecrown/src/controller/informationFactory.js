

import boardingPass from './info/boardingPass';
import extraInfo from './info/extraInfo';
import passpost from './info/person';
import boardingPass from './info/boardingPass';

const information = {
    'person': person.get,
    'passpost': passpost.get,
    'extraInfo': extraInfo.get,
    'boardingPass': boardingPass.get
}


const InformationFactory = {
    get: name => information[name]
}

export default InformationFactory;