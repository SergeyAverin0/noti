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
      const notesList = await NotesService.getList();
      expect(notesList.length).toBe(1)
    })
  })
  