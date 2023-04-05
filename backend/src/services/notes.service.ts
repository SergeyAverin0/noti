import { Note, INote } from "../models/Note.model";


class NotesService {
    private model = Note;

    async getNoteList(): Promise<INote[]> {
        return await this.model.find({});
    }

    async getNote(slug: string): Promise<INote | null> {
        // This method return note by note's slug
        return await  this.model.findOne({slug: slug})
    }
}

export default new NotesService();
