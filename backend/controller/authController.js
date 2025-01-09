import User from '../models/userSchema.js'
import bcrypt from "bcryptjs"

const userSignup = async (req, res) => {
    const { email, password, name, role, contactInfo } = req.body;
  
    // Check if all required fields are provided
    if (!email || !password || !name || !role || !contactInfo) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = new User({
        email,
        password: hashedPassword,
        name,
        role,
        contactInfo,
      });
  
      // Save the user to the database
      await newUser.save();
  
      // Send success response
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      // Handle server errors
      console.error(error);
      res.status(500).json({ message: 'Server error, please try again later' });
    }
  };

export default userSignup ; 