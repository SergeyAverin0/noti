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
  import UserService from '../user.service'
  import { User } from '../../models/User.model'
  import { comparePassword } from '../../utils/passwordEncryption'
  

  describe('Note service', () => {
    beforeAll(async () => {
      connection(true)
    })
  
    afterAll(async () => {
      await mongoose.connection.close()
    })

    afterEach(async () => {
        await User.deleteMany({})
    })

    it('should create user', async () => {
        const savedUser = await UserService.createNote('username1', 'password', 'test@gmail.com')
        expect(savedUser._id).toBeDefined()
        expect(savedUser.username).toBe(savedUser.username)
        expect(savedUser.email).toBe(savedUser.email)
        const comparedPassword = await comparePassword('password', savedUser.password)
        expect(comparedPassword).toBe(true)
    })
  })
  