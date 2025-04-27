const User = require("../models/userModels.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            throw new Error("Invalid credentials");
        }
        const passwordMatch = await bcrypt.compare(password, foundUser.password);
        if (!passwordMatch) {
            throw new Error("Invalid credentials");
        }
        const token = jwt.sign(
            {
                userId: foundUser._id,
            },
            process.env.SECRET_TOKEN_KEY,
            { expiresIn: "24h" }
        );

        
        res.status(200).json({ 
            token,
            imageUrl: foundUser.imageUrl || null, // Send imageUrl or null if not set
            firstName: foundUser.firstName,       // Optionally send name, etc.
            role: foundUser.role
        });
        
    } catch (err) {
        res.status(401).json({
            message: err.message,
        });
    }
};

exports.userSignUp = async (req, res) => {
    const { firstName, email, lastName, role } = req.body;
    const hashedPassword = req.hashedPassword;

    // Only save the RELATIVE PATH (no protocol/domain)
    const imageUrl = req.file ? req.file.path.replace(/\\/g, "/") : null;
  
    try {
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            imageUrl,
            role,
            inventory: [],
        });

        const savedUser = await newUser.save();
        res.status(201).json({
            firstName: savedUser.firstName,
            email: savedUser.email,
            role: savedUser.role,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};
