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
  import { User } from '../User.model'
  
  
  describe('User model', () => {
    beforeAll(async () => {
      connection(true)
    })
  
    afterAll(async () => {
      await mongoose.connection.close()
    })
  
    afterEach(async () => {
      await User.deleteMany({})
    })
  
    it('should create and save a new User', async () => {
      const userData = {
        username: 'UserName',
        password: 'UserPassword'
      }
      const user = new User(userData)
      const savedUser = await user.save()
      expect(savedUser._id).toBeDefined()
      expect(savedUser.username).toBe(userData.username)
      expect(savedUser.slug.length).toBeGreaterThan(0)
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
  