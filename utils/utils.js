import bcrypt from 'bcryptjs'

export async function encryptPassword(password) {
    const pass = await bcrypt.hash(password, 10);
    return pass;
}

export async function comparePassword(password, hash) {
    const isTheSame = await bcrypt.compare(password, hash);
    return isTheSame;
}

export function dateAndTime(){
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
return dateTime
}

//gets time and date