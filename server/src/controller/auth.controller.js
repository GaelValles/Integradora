import { User } from "../model/users";
import bcrypt from 'bcrypt';
import {createAccessToken} from '../libs/jwt';

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
            const token = await createAccessToken({id: userSaved._id})
            res.cookie('token', token)
            res.json({
                id: userSaved.id,
                username: userSaved.username,
                email:userSaved.email,
                createdAt: userSaved.createdAt,
                updatedAt: userSaved.updatedAt,
        });
        } catch (error) {
          res.status(500).json({ message: error.message});
        }
};

export const login = (req, res) => res.send("login");