
import "phaser";
import variables from '../controller/variables';
import VirusScanner from '../controller/virusScanner';
var jsonRules = require('../data/restrictions'); 


class PersonInformation {

    nextPerson(currentRules, level) {
        const person = this.getPerson();
        const passport = this.getPassport();
        const extraInfo = this.getExtraInfo()
        const boardingPass = this.getBoardingPass()
        const medicalInfo = this.getMedicalInfo();
        const rules = this.getRules(currentRules, level);
        var data = {
            'person': person,
            'passport': passport,
            'extraInfo': extraInfo,
            'boardingPass': boardingPass,
            'rules': rules,
            'medical': medicalInfo,
        }
        let corona = VirusScanner.check(rules, data);
        data["coronavirus"] = corona;
        return data;
    }


    getPerson(){
        var max = 6;
        const random = Math.floor(Math.random() * max) + 1;
        return random.valueOf();
    }

    getPassport(){
        const name = this.getVariable("name");
        const lastName = this.getVariable("lastName");
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
            "birthday": birthday.toLocaleDateString("es-US"),
            "age": 2020 - birthday.getFullYear()
        }
    }

    getExtraInfo(){
        

        const r = Math.floor(Math.random() * 6);
        if (r == 5){
            const dis = this.getVariable("disease");
            return {
                "disease": dis
            }
        }

        return {
            "disease": "none"
        }
    }

    getBoardingPass(){
        const city = this.getVariable("city");
        return {
            "origin": city
        }
    }


    getMedicalInfo(){
        const temp = Math.floor(Math.random() * (45-34)) + 34;
        console.log(temp);
        return {
            "temperature": temp
        }
    }

    getRules(currentRules, level){
        const nRules = Object.keys(currentRules).length;
        if( nRules == level) return currentRules;


        // New rule
        const requirements = jsonRules["restrictions"];
        const ruleKeys = Object.keys(requirements);
        const max = ruleKeys.length - 1; 

        var isNew = false;
        while(!isNew){
            // Get random from the next level
            const random = Math.floor(Math.random() * Math.floor(max));
            
            var key = ruleKeys[random];

            var area = requirements[key]["area"];
            var field = requirements[key]["field"];
            isNew = true;
            for(var i in currentRules){
                if(currentRules[i]["area"] == area && currentRules[i]["field"] == field) {
                    isNew = false;
                }
            }
        }

        var rule = requirements[key];
        var description = rule["description"];

        var variable = key.match(/{(.*)}/);
        if(variable.length > 0){
            variable = variable.pop();
            var rVariable = this.getVariable(variable);
            
            key = key.replace("{" + variable + "}", rVariable);
            description = description.replace("{" + variable + "}", rVariable);
        }
        console.log("joliwis")
        var newRule = {
            "description": description,
            "variable": rule["variable"],
            "area": rule["area"],
            "field": rule["field"]
        }
        if (variable.length > 0 ){
            newRule["value"] = rVariable;
        }
        console.log("Abans")
        console.log(currentRules);
        currentRules[key] = newRule;
        console.log("Despres")
        console.log(currentRules)
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