import { Request, Response } from "express";


class NotesController {
    notesList(req:Request, res:Response) {
        res.send('note list')
    }
}

export default  new NotesController();
