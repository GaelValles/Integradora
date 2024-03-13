import { User } from "../model/users";
import bcrypt from 'bcrypt';

export const registrar = async (res,req) => {
    const { email, password, username } = req.body;
        try{

            const passwordHash = await bcrypt.hash(password, 10)

            const newUser = new User ({
                username,
                email,
                password: passwordHash,
            });
            
            const userSaved = await newUser.save();
            res.json(userSaved)
        } catch (error) {
            console.log(error);
        }
};

export const login = (req, res) => res.send("login");