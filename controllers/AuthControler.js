const UserModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signup = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(user) {
            return res.status(400)
            .json({message : "user is already exist", success: false})
        }
        const userModel = new UserModel({name, email, password});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201)
           .json({
    
               message: "signup successfully",
               success: true

           })

    }catch(err){
        console.log(err);
        res.status(500)
           .json({
    
               message: "Internal server error",
               success: false

           })

    }
}


// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find the user by email
//         const user = await UserModel.findOne({ email });
//         if (!user) {
//             return res.status(400).json({
//                 message: "User does not exist",
//                 success: false,
//             });
//         }

//         // Compare password
//         const isPassEqual = await bcrypt.compare(password, user.password);
//         if (!isPassEqual) {
//             return res.status(400).json({
//                 message: "Incorrect password",
//                 success: false,
//             });
//         }

//         // Generate JWT token
//         const jwtToken = jwt.sign(
//             { email: user.email, _id: user._id },
//             process.env.JWT_SECRET, // Ensure you have set JWT_SECRET in your .env file
//             { expiresIn: '24h' } // Token expiry time
//         );

//         // Respond with success an
       
//         return res.status(200)
//         .header('Authorization', `Bearer ${jwtToken}`)
        
//         .json({
//             message: "Login successful",
//             success: true,
//             jwtToken,
//             email: user.email,
//             name: user.name, // Including name if needed
//         });

//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             message: "Internal server error",
//             success: false,
//         });
//     }
// };

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Email", email)
        // Find the user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                success: false,
            });
        }

        // Compare password
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(400).json({
                message: "Incorrect password",
                success: false,
            });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET, // Ensure you have set JWT_SECRET in your .env file
            { expiresIn: '24h' } // Token expiry time
        );

        // Send JWT in the response header and body
        res.status(200)
            .header('Authorization', `Bearer ${jwtToken}`) // Setting the JWT token in the header
            .json({
                message: "Login successful",
                success: true,
                jwtToken, // You can still send it in the body if needed
                email: user.email,
                name: user.name, // Including name if needed
            });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

module.exports ={
    signup,
    login
}

