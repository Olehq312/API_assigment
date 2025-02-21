// imports
import {
    type Request,
    type Response,
    type NextFunction
} from "express";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import Joi, { ValidationResult } from "joi";

// Project imports
import { userModel } from "../models/userModel";
import { User } from "../interfaces/user";
import { connect, disconnect } from '../repos/db';

/**
 * Register a new user
 * @param req 
 * @param res 
 * @returns 
 */
export async function registerUser(req: Request, res: Response) {

    try {
        // validation
        const { error } = validateUserRegInfo(req.body);

        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        await connect();

        // check registered user
        const emailExist = await userModel.findOne({ email: req.body.email });

        if (emailExist) {
            res.status(400).json({ error: "Email is already exists." });
            return;
        }


        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        // create a user object and save in the DB
        const userObject = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        });

        const savedUser = await userObject.save();
        res.status(200).json({ error: null, data: savedUser._id });

    } catch (error) {
        res.status(500).send("Error while the registrering of the user. Error: " + error);
    }
    finally {
        await disconnect();
    }
};




/**
 * Login an existing user
 * @param req 
 * @param res 
 * @returns 
 */
export async function loginUser(req: Request, res: Response) {

    try {

        // validate logInfo
        const { error } = validateUserLogInfo(req.body);

        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        // find the user data in db
        await connect();

        const user: User | null = await userModel.findOne({ email: req.body.email });

        if (!user) {
            res.status(400).json({ error: "Email or password is wrong. Try again" });
            return;
        }
        else {
            // creation of token

            const correctPass: boolean = await bcrypt.compare(req.body.password, user.password);

            if (!correctPass) {
                res.status(400).json({ error: "Email or password is wrong. Try again" });
                return;
            }

            const userId: string = user.id;
            const token: string = jwt.sign(
                {
                    name: user.name,
                    email: user.email,
                    id: userId
                },
                process.env.TOKEN_SECRET as string,
                { expiresIn: '2h' }
            );

            // attach the token and send it back to the client
            res.
            status(200)
            .header("auth-token", token).
            json({ error: null, data: { userId, token } });
        }

    } catch (error) {
        res.status(500).send("Error while logging in. Error: " + error);
    }
    finally {
        await disconnect();
    }
};


/**
 * Middleware logic to verify the client JWT token
 * @param req 
 * @param res 
 * @param next 
 */
export function securityToken(req: Request, res: Response, next: NextFunction) {

    const token = req.header("auth-token");

    if (!token) {
        res.status(400).json({ error: "Access Denied." });
        return;
    }

    try {
        if (token)
            jwt.verify(token, process.env.TOKEN_SECRET as string);

        next();
    }
    catch {
        res.status(401).send("Invalid Token");
    } 
}





/**
 * Validation of users : name, email, password
 * @param data 
 */
export function validateUserRegInfo(data: User): ValidationResult {

    const schema = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().email().min(6).max(255).required(),
        password: Joi.string().min(6).max(20).required()
    });

    return schema.validate(data);
}


/**
 * Validation of users login info: email and pass
 * @param data 
 */
export function validateUserLogInfo(data: User): ValidationResult {

    const schema = Joi.object({
        email: Joi.string().email().min(6).max(255).required(),
        password: Joi.string().min(6).max(20).required()
    });

    return schema.validate(data);
}






