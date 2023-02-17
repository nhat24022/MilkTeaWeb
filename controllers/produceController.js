const Produce = require('../models/produce.js')

module.exports.AddProduce = async (req, res ,next) => {
    let {name, price, category} = req.body;
    try {
        name = name.replace(/|\'|\?|\>|\<|\+|\*/g, '');
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
        if(req.body.id) {
            var id = req.body.id;
        }
    
        console.log('code get produce '+code);
        console.log('id get produce '+id);

        // var sql= `select * from produce`
        switch(code) {
            //case 0 get all produces
            case "0":
                var sql = `select * from produce`;
                break;
            case "1": // get produce by id produce
                var sql = `select * from produce where idproduce = '${id}'`
                console.log('case 1')
                break;
            case "2":
                break;
            case "3":
                break;
            case "4":
                break;
            case "5":
                break;
        }
        console.log(sql);
        let data = await Produce.AllProduce(sql);
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

module.exports.UpdateTotal = async (req, res, next) => {
    if (!req.body.idProduce || !req.body.value) {
        res.status(304).json({"mess":"Not Modified"});
        return;
    }
    let {idProduce, value} = req.body;
    idProduce = idProduce.replace(/ |\'|\?|\>|\<|\+|\*/g, '');
    if(isNaN(value)) {
        res.status(304).json({"mess":"Not Modified"});
        return;
    }
    let result = await Produce.updateTotal(idProduce,value);
    switch(result) {
        case 0:
            res.status(201).json({"mess":"success"})
            break;
        case 1:
            res.status(500).json({"mess":"can't Update produce"})
            break;
        case 2: 
            res.status(306).json({"mess":"fail, this produce isn`t exist in menu"})
            break;
        case 3:
            res.status(201).json({"mess":"error in server => programmer's mistake"})
            break;
    }
    return;
}

module.exports.UpdateInfo = async (req,res) => {
    if(!res.body.column || !res.body.value || res.body.idProduce) {
        res.status(300).json({"mess":"fail, data is not allowed to leave it blank "})
        return;
    }
    let {column, value, idProduce} = req.body;
    column = column.replace(/|\'|\?|\>|\<|\+|\*/g, '');
    value = value.replace(/|\'|\?|\>|\<|\+|\*/g, '');
    idProduce = idProduce.replace(/|\'|\?|\>|\<|\+|\*/g, '');

    let result = await Produce.updateProduce(column,value,idProduce);
    switch(result) {
        case 0:
            res.status(201).json({"mess":"success"})
            break;
        case 1:
            res.status(500).json({"mess":"can't Update produce"})
            break;
        case 2: 
            res.status(306).json({"mess":"fail, this produce isn`t exist in menu"})
            break;
        case 3:
            res.status(201).json({"mess":"error in server => programmer's mistake"})
            break;
    }
    return;
}