import {
    describe,
    expect,
    it,
    beforeAll,
    afterAll,
    afterEach,
    beforeEach,
  } from '@jest/globals'
  import mongoose from 'mongoose'
  
  import connection from '../../models/connect'
  import NotesService from '../notes.service'
  import { Note } from '../../models/Note.model'
import { NotFoundError } from "../../errors/NotFoundError";
  

  describe('Note service', () => {
    beforeAll(async () => {
      connection(true)
    })
  
    afterAll(async () => {
      await mongoose.connection.close()
    })

    beforeEach(async () => {
        const note = new Note({title: 'Test note', slug: 'testNote'})
        await note.save()
    })

    afterEach(async () => {
        await Note.deleteMany({})
    })

    it('should get notes list', async () => {
      const notesList = await NotesService.getNoteList();
      expect(notesList.length).toBe(1)
    })

    it('should get note by slug', async () => {
      const notesList = await NotesService.getNote('testNote');
      expect(notesList?.slug).toBe('testNote')
    })

    it('should throw not found error', async () => {
      let error;
      try {
        await NotesService.getNote('testNoteError');
      } catch (e) {
        error = e
      }
      expect(error).toBeInstanceOf(Error)
    })

    it('should create and save a new note', async () => {
      const savedNote = await NotesService.createNote('new note')
      expect(savedNote._id).toBeDefined()
      expect(savedNote.title).toBe('new note')
    })

    it('should delete note by slug', async () => {
      await NotesService.deleteNote('testNote')
      let error;
      try {
        await NotesService.getNote('testNote');
      } catch (e) {
        error = e
      }
      expect(error).toBeInstanceOf(NotFoundError)
    })

    it('should update note ', async () => {
      const note = await NotesService.updateNote('testNote', {'title': 'newTitle'})
      expect(note?.title).toBe('newTitle')
    })
  })
  