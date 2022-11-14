const Admin = require('../models/Admin.js')

module.exports.CreateAdmin  = async (req, res, next)=>{
   console.log('create new adMin')
   let {name, pass, mail} = req.body;
   console.log(name, pass, mail);

   name = name.replace(/ |\'|\?|\>|\<|\+|\*/g, '');
   pass = pass.replace(/ |\'|\?|\>|\<|\+|\*/g, '');
   mail = mail.replace(/ |\'|\?|\>|\<|\+|\*/g, '');

   console.log(name, pass, mail);
   let newAd = new Admin(name,pass,mail);

   try {
    let result = await newAd.save();
    console.log("create new adMin: "+ result);
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
module.exports.GetAllAdMin = async (req, res, next) => {
    let all = await Admin.GetAllAdMin();
    try {
        if(all) {
            console.log(all);
            res.status(200).json({"mess":"success", "adMin":all});
        } else {
            res.status(300).json({"mess":"fail", "adMin":[]});
        }
    } catch (error) {
        res.status(500).json({"mess":"Lỗi server => tai coder", "adMin":[]});

        throw error;
    }
    console.log('Get all AdMin')
}

module.exports.Login = async (req, res, next) => {
    
}

module.exports.UpdateAd = async (req, res, next) => {
    let {name, pass, mail} = req.body;
    console.log(name, pass, mail);

    name = name.replace(/ |\'|\?|\>|\<|\+|\*/g, '');
    pass = pass.replace(/ |\'|\?|\>|\<|\+|\*/g, '');
    mail = mail.replace(/ |\'|\?|\>|\<|\+|\*/g, '');
    

}
module.exports.DeleteAd = async (req, res, next) => {
    console.log('delete')
}