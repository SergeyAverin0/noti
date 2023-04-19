import {
  describe,
  expect,
  it,
  beforeAll,
  afterAll,
  afterEach,
} from '@jest/globals'
import mongoose from 'mongoose'

import connection from '../connect'
import { Note } from '../Note.model'

describe('Note model', () => {
  beforeAll(async () => {
    connection(true)
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  afterEach(async () => {
    await Note.deleteMany({})
  })

  it('should create and save a new note', async () => {
    const noteData = {
      title: 'Test note',
    }
    const note = new Note(noteData)
    const savedNote = await note.save()
    expect(savedNote._id).toBeDefined()
    expect(savedNote.title).toBe(noteData.title)
    expect(savedNote.slug.length).toBeGreaterThan(0)
  })

  it('should not save a note with invalid title', async () => {
    const noteData = {
      title: '_'.repeat(51),
    }
    const note = new Note(noteData)
    let error
    try {
      await note.save()
    } catch (e) {
      error = e
    }
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
  })
})
