
import "phaser";
import variables from '../controller/variables';
var jsonRules = require('../data/restrictions'); 


class PersonInformation {

    nextPerson(currentRules, level) {
        const person = this.getPerson();
        const passport = this.getPassport();
        const extraInfo = this.getExtraInfo()
        const boardingPass = this.getBoardingPass()
        const medicalInfo = this.getMedicalInfo();
        const rules = this.getRules(currentRules);
        console.log(passport);  
        return {
            'person': person,
            'passport': passport,
            'extraInfo': extraInfo,
            'boardingPass': boardingPass,
            'rules': rules,
            'medical': medicalInfo,
            'coronavirus': true
        }
    }


    getPerson(){
        var max = 6;
        const random = Math.floor(Math.random() * max) + 1;
        const path = 'data/people/man-' + random.valueOf() + '.png';
        return path;
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
        return "hola"
    }

    getBoardingPass(){
        const city = this.getVariable("city");
        return {
            "origin": city
        }
    }


    getMedicalInfo(){
        const temp = Math.floor(Math.random() * 45) + 34;
        return {
            "temperature": temp
        }
    }

    getRules(currentRules, level){
        if(currentRules.length == level) return currentRules;


        // New rule
        const nextLevel = currentRules.length;
        const requirements = jsonRules[nextLevel];
        console.log(requirements);
        // Get random from the next level
        const ruleKeys = Object.keys(requirements);
        const max = ruleKeys.length - 1;
        const random = Math.floor(Math.random() * Math.floor(max));

        // Get random position
        var key = ruleKeys[random];
        var rule = requirements[key];
        var description = rule["description"];

        var variable = key.match(/{(.*)}/).pop();
        if(variable.length > 0){
            var rVariable = this.getVariable(variable);
            
            key = key.replace("{" + variable + "}", rVariable);
            description = description.replace("{" + variable + "}", rVariable);
        }

        var newRule = {}
        newRule[key] = {
            "description": description,
            "variable": rule["variable"]
        }
        console.log(newRule);
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
    
    _checkCoronavirus(rules, person, passport, boardingPass){
        for(var r in rules) {

        }
    }
}

export default new PersonInformation();