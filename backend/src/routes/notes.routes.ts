import express, { Router } from 'express'

import notesControllerfrom from '../controllers/notes.controller'

const noteRoute: Router = express.Router()

// WorkCase
noteRoute.route('').get((req, res) => notesControllerfrom.notesList(req, res))

export default noteRoute
