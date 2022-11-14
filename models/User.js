const Db = require('../config/Db.js');

class User {
    constructor(UserName, PhoneNumber, Password) {
        this.UserName = UserName,
        this.PhoneNumber = PhoneNumber,
        this.Password = Password
    }
    async save () {
        var check = await this.CheckPhone(this.PhoneNumber)
        console.log('check :'+check);
        try {
            if(!check) {
                var randomString = require("randomstring");
                let sql = `INSERT INTO users(idUser,Username,PhoneNumber,Password) VALUES ('${randomString.generate()}','${this.UserName}','${this.PhoneNumber}','${this.Password}');`;
                const [newUser, _] = await Db.execute(sql);
                console.log('success to add new user')
                return 0;
            } else {
                console.log('fail')

                return 1;
            }
        } catch (error) {
            throw 'error at server:' +error;
        }
        
        
    }

    static async GetAllUsers () {
        let sql = `select * from users`;
        const [getall,_] =await Db.execute(sql);
        console.log(getall);
        return getall;
    };

    static async GetUserById (idUser) {
        let sql = `select * from users where idUser = '${idUser}'`;
        let [user,_] = await Db.execute(sql);
        console.log(user);
        return user;
    }

    static async Login(Phone, pass) {
        try {
            let sql = `select idUser from users where Phonenumber = '${Phone}' and Password = '${pass}'`;
            let [user,_] = await Db.execute(sql);
            
            if (user[0]) {
                console.log(user)
                console.log('user singIn idUser:'+user);
            return user;
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

    async  CheckPhone(phone){
        let sql = `select idUser from users where  exists (select * from users where PhoneNumber = '${phone}')`;
        let [isExists,_] = await Db.execute(sql);
        if(!(isExists[0]==null)) {
            return true;
        }
        else {
            return false;
        }
    }

    
}

module.exports = User;