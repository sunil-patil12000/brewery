const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
   
    console.log(req.body)
  
        let user = await User.findOne({ email:req.body.email });
      
        // console.log(user)

        if (!user) {
            const data=new User({ name:req.body.name, email:req.body.email, password:req.body.password });
            await data.save();
    
            const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(201).json({ token });
            res.json(data)
            
        } else {
            res.status(400).json({ message: 'User already exists' });
            
        }

};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
