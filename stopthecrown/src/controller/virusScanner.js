


class VirusScanner {


    constructor(props){
        this.checkFun = {
            "passport": this._checkPassport,
            "boardingPass": this._checkBoardingPass,
            "medical": this._checkMedicalInfo,
            "extra": this._checkExtraInfo
        }
    }

    check(rules, info){

        for(var r in rules) {
            // Route by area
            const area = rules[r]["area"];
            const field = rules[r]["field"];
            const value = rules[r]["value"];

            const f = this.checkFun[area];
            const res = f(info, field, value)
            if (res) return true;
        }

        return false;
    }


    _checkPassport(info, field, value) {
        const passport = info["passport"];
        const oValue = passport[field];

        // Specials:
        // 1. Age  
        if(field === "age" && value >= oValue) return true; 
        // 2. Id
        if(field === "id" && value % 2) return true;


        // Others
        if(value === oValue){
            return true;
        }
        return false;
    }

    _checkBoardingPass(info, field, value) {
        const passport = info["boardingPass"];
        const oValue = passport[field];

        // Specials:
        if(value === oValue){
            return true;
        }
        return false;
    }

    _checkExtraInfo(info, field, value){
        const passport = info["extraInfo"];
        const oValue = passport[field];

        // Specials:
        if(value === oValue){
            return true;
        }
        return false;
    }

    _checkMedicalInfo(info, field , value){
        const passport = info["medical"];
        const oValue = passport[field];

        // Specials:
        // Temperature:
        if(field === "temperature" && value <= oValue) return true; 

        if(value === oValue){
            return true;
        }
        return false;
    }
}


export default new VirusScanner();