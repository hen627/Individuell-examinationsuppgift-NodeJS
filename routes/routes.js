import { Router } from "express";
import { newAccount, checkAccount, 
         newNotes, getNotes, editNotes,
         deleteNotes, searchNote} from '../controllers/controller.js';
import { auth, lengthControl, antiDuplicates, 
         antiUserDuplicate, noteCheck } from "../middlewares/middleware.js";



export const router = Router();


//user routers
router.post("/user/signup", antiUserDuplicate, newAccount);

router.post("/user/login", checkAccount);

//note routers
router.post("/notes", auth, lengthControl, antiDuplicates, newNotes)

router.get("/notes", auth, getNotes)

router.put("/notes", auth, lengthControl, noteCheck, editNotes)

router.delete("/notes", auth, noteCheck, deleteNotes)

router.get("/notes/search/:title", auth, searchNote)

  