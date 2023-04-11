import express, { Router } from 'express'

import NotesController from '../controllers/notes.controller'
import SingleNotesController from '../controllers/singleNote.controller'

const noteRoute: Router = express.Router()

// List Note
noteRoute.route('')
    .get((req, res) => NotesController.get(req, res))
    .post((req, res) => NotesController.post(req, res))

// Single Note
noteRoute.get('/:slug', (req, res) => SingleNotesController.get(req, res))
noteRoute.patch('/:slug', (req, res) => SingleNotesController.patch(req, res))


export default noteRoute
