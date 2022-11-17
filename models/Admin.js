const Db = require('../config/Db.js')

class Admin {
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
                const [newAdmin, _] = await Db.execute(sql);
                console.log(newAdmin)
                if (newAdmin) {
                    return 0;
                }
                return  2;
            }
            else return 1;
            
        } catch (error) {
            throw console.error();
        }
        
    }

    // ham login AdMin
    static async LoginAd(mail, pass) {
        try {
            let sql = `select idAddmin from addmin where mail = '${mail}' and pass = '${pass}'`;
            let [admin,_] = await Db.execute(sql);
            
            if (admin[0]) {
                console.log(admin)
                console.log('AdMin singIn idUser:'+admin);
            return admin;
            }
            else {
                console.log('ko tim thay');

                return 1;
            }
        } catch (error) {
            console.log('loi', error);
            return 2;
        }
    }

    // ham lay toan bo AdMin
    static async GetAllAdMin() {
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

    // ham Update thong tin adMin
    static async UpDate (name, pass, mail, id) {
        try {
            let sql = `UPDATE addmin
                        SET name = '${name}', pass = '${pass}', mail = '${mail}'
                        WHERE idAddmin = '${id}'`
            let [result,_] = await Db.execute(sql);
            console.log(result);
            if(result) {
                return true;
            }
            return false;
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

    static async deleteAdMin(id) {
        let sql = `DELETE FROM addmin WHERE idAddmin = '${id}';`
        try {
            let [result,_] = await Db.execute(sql);
            console.log("response from delete adMin : "+result[0])
            if (result) {
                return 0;
            }
            return 1;
        } catch (error) {
            console.log(error);
            return 2;       
        }
    }
   
}
module.exports = Admin;