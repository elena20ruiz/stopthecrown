

import boardingPass from './info/boardingPass';
import extraInfo from './info/extraInfo';
import passport from './info/passport';
import person from './info/person';


class PersonInformation {

    nextPerson() {
        const person = person.get();
        const passport = passport.get();
        const extraInfo = extraInfo.get();
        const boardingPass = extraInfo.get();
        
        return {
            'person': person,
            'passport': passport,
            'extraInfo': extraInfo,
            'boardingPass': boardingPass
        }
    }
}

export default new PersonInformation();