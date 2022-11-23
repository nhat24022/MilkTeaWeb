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