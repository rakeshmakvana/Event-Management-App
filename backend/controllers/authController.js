const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All Fields are Required' });
    }
    try {
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const userDoc = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json(userDoc);
    } catch (e) {
        console.error('Error User Registration');
        res.status(422).json({ error: 'Failed Register User' });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await UserModel.findOne({ email });
    if (!userDoc) {
        return res.status(404).json({ error: "User Not Found" });
    }
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk) {
        return res.status(401).json({ error: "Invalid Password" });
    }
    jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
            if (err) {
                return res.status(500).json({ error: "Failed to Generate Token" });
            }
            res.cookie("token", token).json(userDoc);
        }
    );
};

exports.logout = (req, res) => {
    res.cookie("token", "").json(true);
};