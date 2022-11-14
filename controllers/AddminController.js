const Addmin = require('../models/Addmin.js')

module.exports.CreateAddmin  = async (req, res, next)=>{
   console.log('create new addMin')
   let {name, pass, mail} = req.body;
   console.log(name, pass, mail);

   name = name.replace(/ |\'|\?|\>|\<|\+|\*/g, '');
   pass = pass.replace(/ |\'|\?|\>|\<|\+|\*/g, '');
   mail = mail.replace(/ |\'|\?|\>|\<|\+|\*/g, '');

   console.log(name, pass, mail);
   let newAdd = new Addmin(name,pass,mail);

   try {
    let result = await newAdd.save();
    console.log("create new addMin: "+ result);
    switch(result) {
        case 0: // tao thanh cong
            res.status(201).json({"mess":"success"})
            break;
        case 1: // tk da ton tai
            res.status(301).json({"mess":"tài khoản đã tồn tại"})
            break;
        case 2:
            res.status(501).json({"mess":"server lỗi => tại thằng code"})
            break;
    }
   } catch (error) {
        console.log(error);
        res.status(501).json({"mess":"server lỗi => tại thằng code"})
        next();
   }
}
module.exports.GetAllAddMin = async (req, res, next) => {
    let all = await Addmin.GetAllAddMin();
    try {
        if(all) {
            console.log(all);
            res.status(200).json({"mess":"success", "addMin":all});
        } else {
            res.status(300).json({"mess":"fail", "addMin":[]});
        }
    } catch (error) {
        res.status(500).json({"mess":"Lỗi server => tai coder", "addMin":[]});

        throw error;
    }
    console.log('Get all AddMin')
}
module.exports.UpdateAdd = async (req, res, next) => {
    let {name, pass, mail} = req.body;
    console.log(name, pass, mail);

    name = name.replace(/ |\'|\?|\>|\<|\+|\*/g, '');
    pass = pass.replace(/ |\'|\?|\>|\<|\+|\*/g, '');
    mail = mail.replace(/ |\'|\?|\>|\<|\+|\*/g, '');
    

}
module.exports.DeleteAdd = async (req, res, next) => {
    console.log('delete')
}