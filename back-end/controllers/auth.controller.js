import User from '../models/Users.js';
import admin from 'firebase-admin';


//midlleware per la verifica del token 
export const verifyToken = async (request, response, next) =>{
    try{
        const token = request.headers.authorization.split(" ")[1];
        if(!token){
            return response.status(401).json({message: "Unauthorized"});

            const decodedToken = await admin.auth().verifyIdToken(token);
            const user = await User.findById({firebaseUid: decodedToken.uid});
            if(!user){
                return response.status(404).json({message: "User not found"});
            } 
             request.user = user;
                next();
            }
        } catch (error) {
                return response.status(401).json({message: "Token non valido"});
    }
}

//registrtion user 
export async function freshRegister(request, response){
   try{
    const {email, firstName, lastName, firebaseUid} = request.body;

    if (!email || !firstName || !lastName || !firebaseUid){
        return response.status(400).json({message: "All fields are required"});
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return response.status(400).json({message: "User already exists"});
    }

    const newUser = new User({
        email,
        firstName,
        lastName,
        firebaseUid,
    });
    
    await newUser.save();

    return response.status(201).json(newUser);
    } catch (error) {
        return response.status(500).json({message: "Internal server error"});
    }
}

// login Google
export async function loginGoogle(request, response){
    try{
        const decodedToken = await admin.auth().verifyIdToken(token);
        const {uid , email} = decodedToken;
        const displayName = decodedToken.name || '';
        
        const nameParts = displayName.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

       let user = await User.findOne({firebaseUid: uid});

       if(!user){

        const userByEmail= await user.findOne({email});

        if(userByEmail){
            user = await User.findByIdAndUpdate(
                userByEmail._id, 
                {firebaseUid: uid}, 
                {new: true});
       } else {
            user = new User.create({
                email,
                firstName,
                lastName,
                firebaseUid: uid,
            });
           
        }
    }
    response.status(200).json(user)
} catch (error) {
        return response.status(500).json({message: "Internal server error"});
    }
}

//login standard

export async function loginStandard(request, response){
   const {token} = request.body;
   if(!token){
    return response.status(400).json({message: "Unauthorized"});
   }
   try{
    const decodedToken = await admin.auth().verifyIdToken(token);
    const {uid , email} = decodedToken;
    const user =await User.findOne({firebaseUid: uid});
    if(!user){
        return response.status(404).json({message: "User not found"});
    }
    response.status(200).json(user)
   }catch (error) {
    return response.status(500).json({message: "Internal server error"});
   }
}

//user data
export async function getUserData(request, response){
    try{
        const user = request.user

        response.status(200).json({
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
        });

    }catch (error) {
        return response.status(500).json({message: "Internal server error"});
    }
}

//eliminate user 
export async function eliminateUser(request, response){
    try{
        const firebaseUid = request.user.firebaseUid;
        const user = await User.findOneAndDelete({firebaseUid});
        if(!user){
            return response.status(404).json({message: "User not found"});
        }
        await admin.auth().deleteUser(firebaseUid);
        response.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        return response.status(500).json({message: "Internal server error"});
    }
}

// update user 
export async function updateUser(request, response){
    try{
        const updateData = {...request.body};
        const userId = request.user._id;


        const updatedUser = await User.findByIdAndUpdate(userId, {$set:updateData}, {new: true});
        if(!updatedUser){
            return response.status(404).json({message: "User not found"});
        }

        response.status(200).json(updatedUser);

    }catch (error) {
        return response.status(500).json({message: "Internal server error"});
    }
}

//verify admin
export async function isAdmin(request, response){
    try{
        const user = request.user;
        if(user.role !== 'admin'){
            return response.status(403).json({message: "Forbidden"});
        }
        response.status(200).json({message: "User is admin"});
    } catch (error) {
        return response.status(500).json({message: "Internal server error"});
    }
}



