import { Request, Response } from 'express'

import NotesService from '../services/notes.service'


class NotesController {
  async get(req: Request, res: Response) {
    const notes = await NotesService.getNoteList();
    console.log(notes)
    res.status(200).json(notes);
  }
  async post(req: Request, res: Response) {
    const newNotes = await NotesService.createNote('Untitled');
    res.status(201).json(newNotes);
  }
}

export default new NotesController()
