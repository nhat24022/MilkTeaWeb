const Db = require('../config/Db.js')

class Produce {
    constructor (name, price, category ) {
        this.name = name;
        this.price = price;
        this.category = category;
    }
// thêm sản phẩm
    async Save() {
        var randomString = require("randomstring");
        let sql = `insert into produce (idProduce, name, price, category) values ('${randomString.generate()}','${this.name}','${this.price}','${this.category}')`
        try {
            var check = await this.CheckProduce(this.name)
            if(!check) {
                let [result,_] = await Db.execute(sql);
                console.log("result from saving produce :"+result)
                if(result) {
                    return 0;
                }
                return 1;
            }
            return 2;
        } catch (error) {
            console.log(error);
            return 3;
        }
    }

    // xuất toàn bộ sản phẩm
    static async AllProduce(sql) {    
        const [getall,_] =await Db.execute(sql);
        console.log(getall);
        return getall;
    }

// kiểm tra sản phẩm đã tồn tại chưa
    async CheckProduce (name) {
        let sql = `select * from produce where  exists (select * from produce where name = '${name}')`;
        let [isExists,_] = await Db.execute(sql);
        if(!(isExists[0]==null)) {
            return true;
        }
        else {
            return false;
        }
    }
}
module.exports = Produce;