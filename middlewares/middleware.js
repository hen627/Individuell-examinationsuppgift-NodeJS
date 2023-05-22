import { verify } from "../model/model.js";
import { findSpecificNoteInBody, userSearch } from "../model/model.js";

export async function auth(req, response, next) {
    const authHeadcheck = req.headers.authorization;
    if (!authHeadcheck){
        return response.status(400).json({ success: false, error: 'No token exists' });

    }

    const token = req.headers.authorization.replace('Bearer ', '');
    try {
        const data = verify(token, 'h3ll0');
        req.token = token;
        req.id = data.id;
        //req.id is userid
        next();
    } catch (error) {
        response.status(400).json({ success: false, error: 'Invalid token' });
    }
}

export async function lengthControl(req, response, next){

    const {title, text} = req.body;
    if (title.length === 0 || text.length === 0){
        return response.status(400).json("Title or text length cannot be 0.")
    }
    else {
    if (title.length > 50 || text.length > 300 ) {
        return response.status(400).json("Title or text exceeds the allowed value.")
    }
    else {
        next();
    }
    }
}

export async function antiDuplicates(req, response, next){
    const noteControl = await findSpecificNoteInBody(req)

    if (noteControl.success === true){
        return response.status(400).json("Title already exists, no duplicates allowed")
    }
    next();
}

export async function noteCheck(req, response, next){
    const noteControl = await findSpecificNoteInBody(req)

    if (noteControl.success === false){
        return response.status(400).json("Note not found")
    }
    next();
}

export async function antiUserDuplicate(req, response, next){
    const userCheck = await userSearch(req.body)

    if (userCheck){
        return response.status(400).json("User already exists, no duplicates allowed")
    }
    next();
}





