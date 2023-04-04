import { Note } from "../models/Note.model";


class NotesService {
    getNoteList() {
        return Note.find({});
    }
}

export default new NotesService();
