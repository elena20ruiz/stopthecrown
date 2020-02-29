
import "phaser";
import variables from '../controller/variables';
var jsonRules = require('../data/restrictions'); 


class PersonInformation {

    nextPerson(currentRules) {
        const person = this.getPerson();
        const passport = this.getPassport();
        const extraInfo = this.getExtraInfo()
        const boardingPass = this.getBoardingPass()
        const rules = this.getRules(currentRules);

        return {
            'person': person,
            'passport': passport,
            'extraInfo': extraInfo,
            'boardingPass': boardingPass,
            'rules': rules
        }
    }


    getPerson(){
        return "hola";
    }

    getPassport(){
        return "hola";
    }

    getExtraInfo(){
        return "hola";
    }

    getBoardingPass(){
        return "hola";
    }

    getRules(currentRules){
        const nextLevel = currentRules.length;

        // Get random
        const requirements = jsonRules[nextLevel];
        
        const max = requirements.length - 1;
        const random = Math.floor(Math.random() * Math.floor(max));
        console.log('Random', random);

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
        console.log(content)
        var max = content.length - 1;
        const random = Math.floor(Math.random() * Math.floor(max));
        return content[random];
    }
}

export default new PersonInformation();