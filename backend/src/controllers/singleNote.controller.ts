import { Request, Response } from 'express'

import NotesService from '../services/notes.service'
import { INote } from '../models/Note.model';


interface ISingleNotesRequestParams {
    slug: string
}

class SingleNotesController {
  async get(req: Request, res: Response) {
    const { slug } = req.params as unknown as ISingleNotesRequestParams;
    const note = await NotesService.getNote(slug);
    res.status(200).json(note);
  }
  async patch(req: Request, res: Response) {
    const { slug } = req.params as unknown as ISingleNotesRequestParams;
    const updatedNoteBody = req.body
    const updatedNote = await NotesService.updateNote(slug, updatedNoteBody);
    res.status(200).json(updatedNote);
  }
}

export default new SingleNotesController()
