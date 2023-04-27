import { createAccount, signIntoAccount,
         createNotes, findNotes, changeNotes,
         removeNotes, findSpecificNote } from '../model/model.js'

export function newAccount(req, res) {
createAccount(req.body)
    .then(data => {
        res.status(200).json(data)
    })
    .catch (err => res.status(400).json(err))
}

export function checkAccount(req, res) {
    signIntoAccount(req.body)
    .then(data => {
        res.status(200).json(data)
    })
    .catch (err => res.status(400).json(err))
}

export function newNotes(req, res) {
    createNotes(req.body)
    .then(data => {
        res.status(200).json(data)
    })
    .catch (err => res.status(400).json(err))
}

export function getNotes(req, res) {
    findNotes(req.body)
    .then(data => {
        res.status(200).json(data)
    })
    .catch (err => res.status(400).json(err))
}

export function editNotes(req, res) {
    changeNotes(req.body)
    .then(data => {
        res.status(200).json("The note has been updated")
    })
    .catch (err => res.status(400).json(err))
}

export function deleteNotes(req, res) {
    removeNotes(req.body)
    .then(data => {
        res.status(200).json("The note has been deleted")
    })
    .catch (err => res.status(400).json(err))
}

export function searchNote(req, res) {
    findSpecificNote(req.body)
    .then(data => {
        res.status(200).json(data)
    })
    .catch (err => res.status(400).json(err))
}


