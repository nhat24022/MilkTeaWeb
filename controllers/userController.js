const User = require('../models/user.js')
module.exports.GetAllUser =async (req, res , next) =>{
    //let AllUser = new User()
    let listUsers= await User.GetAllUsers();
    res.status(200).json({"number":listUsers.length,
                           "AllUsers":listUsers});
}
exports.PostNewUser =async (req, res , next) =>{
    try {
        let {UserName, PhoneNumber, PassWord} = req.body;
        UserName = UserName.replace(/|\'|\?|\>|\<|\+|\*/g, '', '');
        PhoneNumber = PhoneNumber.replace(/ |\'|\?|\>|\<|\+|\*/g, '');
        PassWord = PassWord.replace(/ |\'|\?|\>|\<|\+|\*/g, '');
        console.log(UserName, PhoneNumber, PassWord)
        let user =new User(UserName, PhoneNumber, PassWord);

        user = await user.save();
        switch(user) {
            case 0:{
                res.json({"mess":"success"})
                return;
            } 
            case 1:{
                res.json({"mess":"Tài Khoản đã tồn tại"})
                return;
            }
        }
    } catch (error) {
        console.log(error);
        next();
    }
        

      }

module.exports.GetUserById =async (req, res , next) =>{
    try {
        let idUser = req.params.id;
        let user = await User.GetUserById(idUser);
        if(user) {
            res.status(201).json({"mess":"success", "user":user});
            return;
        }
        res.status(200).json({"mess":"Không tìm thấy người này", "user":[]})
    } catch (error) {
        
    }
    
}

module.exports.Login =async (req, res , next) =>{
    let phone = req.body.phone;
    let pass = req.body.pass;
    pass = pass.replace(/ |\'|\?|\>|\<|\+|\*/g, '');
    phone = phone.replace(/ |\'|\?|\>|\<|\+|\*/g, '');
    console.log(phone,pass);


    let user = await User.Login(phone, pass);

    if(user === 1) { // 1 is incorrect password or phone number
        res.status(404).json({"user":[],"mess":"số điện thoại hoặc mật khẩu không đúng"});
        return;
    } else {
        if (user === 2){
            res.status(500).json({"user":[],"mess":"lỗi không mong muốn"});
            return;
        }
        res.status(200).json({"user":user[0], "mess":"success"})
    }
    
}

module.exports.UpdateUser =async (req, res , next) =>{
    res.send('UpdateUser API is not done yet');
}