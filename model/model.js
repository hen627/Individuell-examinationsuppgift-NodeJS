import Datastore from 'nedb-promises';
import { v4 as uuidv4 } from 'uuid';
import { encryptPassword, comparePassword } from '../utils/utils.js';
import { dateAndTime } from '../utils/utils.js';
import jsonwebtoken from 'jsonwebtoken';
const accountDB = Datastore.create("./db/accountDB.db")
const notesDB = Datastore.create("./db/notesDB.db")

export const { sign, verify, decode } = jsonwebtoken;



export async function createAccount(req) {
    const pass = await encryptPassword(req.password)
    await accountDB.insert({ uuid: uuidv4(), 
    username: req.username,
    password: pass
    });
    return {
        msg: req.username + " created"
    }
}


export async function signIntoAccount(req) {

    const name = await accountDB.findOne({ username: req.username });
    const result = {
        success: false,
        msg: "username or password incorrect"
    }
    if (name) {
        const tryPassword = await comparePassword(req.password, name.password);
        if (tryPassword) {
            result.success = true;
            result.msg = "Succesfully signed in"
            result.token = sign({id : name.uuid}, 'h3ll0', {
                expiresIn: 600 // 10 min
            });
        }
    }
    return result;
}

export async function createNotes(req){
    const dateTime = dateAndTime();
    const newNotes = await notesDB.insert({
        id: uuidv4(),
        title: req.title,
        text: req.text,
        createdAt: dateTime,
        modifiedAt: dateTime
    })
    return newNotes
}

export async function findNotes(){
    return await notesDB.find({})
}

export async function changeNotes(req){
    const dateTime = dateAndTime();
    return await notesDB.update({title: req.title}, {$set: {text: req.text, modifiedAt: dateTime}})
}

export async function removeNotes(req){
    return await notesDB.remove({title: req.title})
}

export async function findSpecificNote(req){
    const specifiedNote = await notesDB.findOne({title: req.title})
    const result = {
        success: false,
        msg: "Note not found"
    }

    if (specifiedNote){
        result.success = true;
        result.msg = "Note found";
        result.title = specifiedNote.title;
        result.text = specifiedNote.text;
    }
    return result;
}

export async function userSearch(req){
    return await accountDB.findOne({username: req.username})
}