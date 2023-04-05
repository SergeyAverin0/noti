import { Note, INote } from "../models/Note.model";


class NotesService {
    private model = Note;

    isObjectFound(obj: INote | null): void {
        // Throw error if object not  found
        
        if (!obj) {
            throw new Error('Not found');
        }
    }

    async getNoteList(): Promise<INote[]> {
        // get user's notes list
        return await this.model.find({});
    }

    async getNote(slug: string): Promise<INote | null> {
        // This method return note by note's slug
        const note = await this.model.findOne({slug: slug})

        this.isObjectFound(note)
        
        return note
    }

    async createNote(title: string): Promise<INote>{
        // This method create new note
        const createdNote = new this.model({title: title});
        return await createdNote.save();
    }
}

export default new NotesService();
