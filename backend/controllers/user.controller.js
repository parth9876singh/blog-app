import { User } from "../models/user.model.js";
import cloudinary from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../jwt/AuthToken.js";
import { generateVerificationToken, sendVerificationEmail } from "../utils/emailService.js";

//code for register
export const register = async (req, res) => {

    try{
        //to check the photo is upload or not
    if(!req.files || Object.keys(req.files).length==0){
        return res.status(400).json({message: "Please upload photo!"});
    }
    //photo send from files
    const {photo} = req.files;
    //format of photo given
    const allowformat = ["image/jpeg","image/png"];
    //check the photo format
    if(!allowformat.includes(photo.mimetype)){
        return res.status(400).json({message: "Please upload photo in jpg or png format"});
    }

    const { name, email, password, phone, education, role } = req.body;
    if (!name || !email || !password || !phone || !education || !role || !photo) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Enhanced email validation for Gmail
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Please use a valid Gmail address" });
    }

    //if user exist then
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
    }
    
    const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        return res.status(400).json({message: "Failed to upload photo!"});
    }

    // Generate verification token
    const verificationToken = generateVerificationToken();
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const newUser = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        phone,
        education,
        role,
        photo:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        },
        emailVerificationToken: verificationToken,
        emailVerificationExpires: verificationExpires,
        isEmailVerified: false
    });

    if (newUser) {
        // Send verification email
        const emailSent = await sendVerificationEmail(email, verificationToken, name);
        
        if (!emailSent) {
            // If email fails to send, delete the user and return error
            await User.findByIdAndDelete(newUser._id);
            return res.status(500).json({ message: "Failed to send verification email. Please try again." });
        }

        return res.status(201).json({ 
            message: "Registration successful! Please check your email to verify your account.",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                isEmailVerified: newUser.isEmailVerified
            }
        });
    } else {
        return res.status(500).json({ message: "Something went wrong" });
    }

    }catch(error){
        return res.status(500).json({message:error.message})
    }
};

// Verify email endpoint
export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ 
                message: "Invalid or expired verification token" 
            });
        }

        // Mark email as verified
        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();

        return res.status(200).json({ 
            message: "Email verified successfully! You can now login to your account." 
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Resend verification email
export const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({ message: "Email is already verified" });
        }

        // Generate new verification token
        const verificationToken = generateVerificationToken();
        const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        // Update user with new token
        user.emailVerificationToken = verificationToken;
        user.emailVerificationExpires = verificationExpires;
        await user.save();

        // Send new verification email
        const emailSent = await sendVerificationEmail(email, verificationToken, user.name);

        if (!emailSent) {
            return res.status(500).json({ message: "Failed to send verification email. Please try again." });
        }

        return res.status(200).json({ 
            message: "Verification email sent successfully! Please check your inbox." 
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// code for login 
export const login = async (req,res)=>{
    const {email,password,role}=req.body;

    try{
        // check for credentials
        if(!role || !email || !password){
            return res.status(400).json({message:"Please provide all fields!"});
        }
        //to check the data of user available in database or not
        const user=await User.findOne({email}).select("+password");
        if(!user.password){
            return res.status(400).json({message:"Invalid email or password!"});
        }
        //to check the password is correct or not
        const isMatch=await bcrypt.compare(password,user.password);
        if(!user || !isMatch){
            return res.status(400).json({message:"Invalid email or password!"});
        }
        //to check for the role of user
        if(user.role!=role){
            return res.status(400).json({message:`Invalid role! ${role}`});
        }
        // Check if email is verified
        if (!user.isEmailVerified) {
            return res.status(401).json({ 
                message: "Please verify your email before logging in. Check your inbox or request a new verification email.",
                emailNotVerified: true
            });
        }
        //to generate token for user
        const token=await createTokenAndSaveCookies(user._id,res);
        console.log("login token: ",token);
        return res.status(200).json({message:"User logged in successfully",user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            isEmailVerified: user.isEmailVerified
            
        },token:token});


    }catch(error){
        console.log(error);
        return res.sataus(500).json({error:"Invalid credentials"});
    }
}


//code for logout
export const logout = async (req, res) =>{
    try{
        res.clearCookie("jwt",{httpOnly:true});
        res.status(200).json({message:"Successfully Logged Out"})

    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Failed to logout"});
    }
}

//code for to view user profile
export const myProfile = async (req, res) =>{
    try{
        const user = await req.user;
        res.status(200).json({message:"User Profile",user});
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Failed to get profile"});
    }
}

export const getCurrentUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const { _id, email, name, role } = req.user;
  res.json({ _id, email, name, role });
};


//code for to view all admins on dashbord
export const allAdmin = async (req, res) =>{
    try{
        const admin = await User.find({role:"admin"});
        res.status(200).json({message:"All Admins",admin:admin});
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Failed to get all admin"});
    }
}


// Favorite/Unfavorite a blog
export const toggleFavorite = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user._id;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const isFavorited = user.favorites.includes(blogId);
    if (isFavorited) {
      // Unfavorite: remove blog from favorites array
      user.favorites = user.favorites.filter(favId => favId.toString() !== blogId);
    } else {
      // Favorite: add blog to favorites array
      user.favorites.push(blogId);
    }
    
    await user.save();
    res.json({ 
      message: isFavorited ? 'Blog removed from favorites' : 'Blog added to favorites',
      isFavorited: !isFavorited
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user's favorite blogs
export const getUserFavorites = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const user = await User.findById(userId).populate({
      path: 'favorites',
      select: 'title about category adminName adminPhoto blogImage createdAt'
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ favorites: user.favorites || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Async Await tab use karte hai jab kisi api se dusre server ka data mangate hai ya data bhej rahe hote hai database main ya comunicate kar rahe hote hai


