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
    // Get the data from the request body (don't get imageUrl here!)
    const { firstName, email, lastName, role } = req.body;
    const hashedPassword = req.hashedPassword;

    // Get the image URL from multer upload
    const imageUrl = req.file
    ? req.protocol + "://" + req.get("host") + "/" + req.file.path.replace(/\\/g, "/")
    : null;
  
    try {
        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            imageUrl,   // path to uploaded image
            role,
            inventory: [],
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        res.status(201).json({
            firstName: savedUser.firstName,
            email: savedUser.email,
            role: savedUser.role,
        });
    } catch (err) {
        // catch any errors
        res.status(400).json({
            message: err.message,
        });
    }
};
