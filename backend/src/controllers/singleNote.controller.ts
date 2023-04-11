import { Request, Response } from 'express'

import NotesService from '../services/notes.service'


interface ISingleNotesRequestGetParams {
    slug: string
}

class SingleNotesController {
  async get(req: Request, res: Response) {
    const { slug } = req.params as unknown as ISingleNotesRequestGetParams;
    const note = await NotesService.getNote(slug);
    res.status(200).json(note);
  }
}

export default new SingleNotesController()
