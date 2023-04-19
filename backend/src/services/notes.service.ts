import { Note, INote } from "../models/Note.model";
import { NotFoundError } from "../errors/NotFoundError";


class NotesService {
    private model = Note;

    isObjectFound(obj: INote | null): void {
        // Throw error if object not  found
        
        if (!obj) {
            throw new NotFoundError('Not found');
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

    async deleteNote(slug: string): Promise<void>{
        // This method delete note by slug
        const note = await this.getNote(slug)
        await note?.deleteOne()
    }

    async updateNote(slug: string, update: Partial<INote>): Promise<INote | null> {
        const note = await Note.findOneAndUpdate({ slug: slug }, update, { new: true });
        return note;
    }
}

export default new NotesService();
