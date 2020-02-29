
import "phaser";
import variables from '../controller/variables';
var jsonRules = require('../data/restrictions'); 


class PersonInformation {

    nextPerson(currentRules, level) {
        const person = this.getPerson();
        const passport = this.getPassport();
        const extraInfo = this.getExtraInfo()
        const boardingPass = this.getBoardingPass()
        const rules = this.getRules(currentRules);
        console.log(passport);  
        return {
            'person': person,
            'passport': passport,
            'extraInfo': extraInfo,
            'boardingPass': boardingPass,
            'rules': rules,
            'coronavirus': true
        }
    }


    getPerson(){
        return "hola";
    }

    getPassport(){
        const name = this.getVariable("name");
        console.log(name);
        const lastName = this.getVariable("lastName");
        console.log(lastName);
        const id = Math.floor(Math.random() * 999999) + 60000;
        const citizenship = this.getVariable("country");
        var birthPlace = citizenship;
        const random = Math.floor(Math.random() * 500);
        if (random % 5 === 0){
            birthPlace = this.getVariable("country");
        }
        const birthday = this._randomDate(new Date(1920, 1, 1), new Date(2000, 12, 31));

        return {
            "name": name,
            "lastName": lastName,
            "id": id.toString(),
            "citizenship": citizenship,
            "birthPlace": birthPlace,
            "birthday": birthday.toLocaleDateString("es-US")
        }
    }

    getExtraInfo(){
        return "hola";
    }

    getBoardingPass(){
        return "hola";
    }

    getRules(currentRules, level){
        if(currentRules.length == level) return currentRules;
        const nextLevel = currentRules.length;

        // Get random
        const requirements = jsonRules[nextLevel];
        
        const max = requirements.length - 1;
        const random = Math.floor(Math.random() * Math.floor(max));

        var rule = requirements[random];
        var key = Object.keys(rule)[0];
        var value = Object.values(rule)[0];

        var variable = key.match(/{(.*)}/).pop();
        if(variable.length > 0){
            var rVariable = this.getVariable(variable);
            
            key = key.replace("{" + variable + "}", rVariable);
            value = value.replace("{" + variable + "}", rVariable);
        }

        var newRule = {}
        newRule[key] = value
        currentRules.push(
            newRule
        );
        return currentRules; 
    }

    getVariable(variable){
        var content = variables[variable];
        var max = content.length - 1;
        const random = Math.floor(Math.random() * Math.floor(max));
        return content[random];
    }

    _randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    
}

export default new PersonInformation();