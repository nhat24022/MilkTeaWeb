const Produce = require('../models/produce.js')

module.exports.AddProduce = async (req, res ,next) => {
    let {name, price, category} = req.body;
    try {
        name = name.replace(/ |\'|\?|\>|\<|\+|\*/g, '');
        price = price.replace(/ |\'|\?|\>|\<|\+|\*/g, '');
        category = category.replace(/ |\'|\?|\>|\<|\+|\*/g, '');
        console.log(name, price, category);
        let newProduce = new Produce(name,price,category);
        let saving = await newProduce.Save();
        switch(saving) {
            case 0:
                res.status(201).json({"mess":"success"})
                break;
            case 1:
                res.status(500).json({"mess":"can't create new produce"})
                break;
            case 2: 
                res.status(306).json({"mess":"fail, this produce is exist in menu"})
                break;
            case 3:
                res.status(201).json({"mess":"error in server => programmer's mistake"})
                break;
        }
        return;
    } catch (error) {
        res.status(500).json({"mess":"error in server => programmer's mistake"})
        console.log(error);
        return;
    }
}

module.exports.GetProduce = async (req, res, next) => {
    try {
        let code = req.params.code;
        console.log('code get produce'+code);
        var sql= `select * from produce`
        switch(code) {
            //case 0 get all produces
            case 0:
                sql = `select * from produce`;
                break;
            case 1: // get produce by id produce
                sql = `select * from produce where idproduce = '${id}'`
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
        }
        console.log(sql);
        let data = await Produce.AllProduce("select * from produce");
        console.log(data);
        if(data) {
            res.status(200).json({"data":data,"mess":"success"})
            return;
        }
    } catch (error) {
        // console.log('error at file produceController :'+ error)
        res.status(500).json({"mess":"server error. ask for ...."});
        throw error;
    }
}