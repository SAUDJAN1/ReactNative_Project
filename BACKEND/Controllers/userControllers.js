import User from "../Models/userModel.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'; 

// register api ------->   http://localhost:5000/mern/api/register
export const Register = async (req, res) => {
    try {
        // Extracting user data from request body  
        // This is where you would typically validate the input and create a new user 
        const { name, email, password, } = req.body;


        // Check if all required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //password validation
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Hash the password before saving it to the database
        // This is important for security reasons
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create a new user instance and save it to the database      
        const addedUser = new User({ name, email, password: hashedPassword })
        addedUser.save();
      
        // Respond with a success message
        // You can also return the created user object if needed "addedUser"
        return res.status(201).json({ message: "User registered successfully" });
       

    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Internal server error" });  
    }
}


export const Login = async (req, res) => {
    try {
        // Extracting email and password from request body
        const{email,password}= req.body;

        // Check if email and password are provided
        if(!email || !password) {
            return res.status(400).json({ message: "All Fields are required" });
        }   

        // Check if the user exists in the database
        const existingUser=await User.findOne({email});
        if(!existingUser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }   
        
        // Compare the provided password with the hashed password in the database
        const comparePassword=await bcryptjs.compare(password,existingUser.password);
        if(!comparePassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }  
   
        // If the credentials are valid, generate a JWT token
        // This token can be used for authentication in subsequent requests
        const token=jwt.sign({
            id:existingUser._id,
            email:existingUser.email
        },process.env.JWT_SECRET_KEY,{expiresIn:"1d"});
        
        // Respond with a success message and the token
        // You can also return the user object if needed
        return res.status(200).json({message:"Login Successful", token});
        
    } catch (error) {
        console.log("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }   
}