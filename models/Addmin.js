const Db = require('../config/Db.js')

class Addmin {
    constructor (name, pass, mail) {
        this.name = name;
        this.pass = pass;
        this.mail = mail;
    }
    async save () {
        let check = await this.checkmail(this.mail)
        try {
            if(!check) {
                var randomString = require("randomstring");
                let sql = `INSERT INTO Addmin(idAddmin,name,pass,mail) VALUES ('${randomString.generate()}','${this.name}','${this.pass}','${this.mail}');`;
                const [newAddmin, _] = await Db.execute(sql);
                console.log(newAddmin)
                if (newAddmin) {
                    return 0;
                }
                return  2;
            }
            else return 1;
            
        } catch (error) {
            throw console.error();
        }
        
    }

    static async GetAllAddMin() {
        try {
            let sql = `select * from addmin`;
            const [getall,_] =await Db.execute(sql);
            console.log(getall);
            return getall;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async checkmail (mail){
        let sql = `select idAddmin from addmin where  exists (select * from addmin where mail = '${mail}')`;
        let [isExists,_] = await Db.execute(sql);
        if(!(isExists[0]==null)) {
            return true;
        }
        else {
            return false;
        }
    }
   
}
module.exports = Addmin;