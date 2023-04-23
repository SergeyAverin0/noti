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
  
    it('should create and save a new user', async () => {
      const userData = {
        username: 'UserName',
        password: 'UserPassword',
        email: 'test@gmail.com'
      }
      const user = new User(userData)
      const savedUser = await user.save()
      expect(savedUser._id).toBeDefined()
      expect(savedUser.username).toBe(userData.username)
      expect(savedUser.password).toBe(userData.password)
    })
  
    it('should not save a user with invalid email', async () => {
      const userData = {
        username: 'UserName',
        password: 'UserPassword',
        email: 'test@gmailcom'
      }
      const user = new User(userData)
      let error
      try {
        await user.save()
      } catch (e) {
        error = e
      }
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
    })
  })
  