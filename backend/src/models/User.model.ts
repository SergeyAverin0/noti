import mongoose, { Document } from 'mongoose'

const { Schema } = mongoose


export interface IUser extends Document  {
    username: string
    password: string
    avatar: string,
    email:string,
    dataCreated: Date,
    dataUpdatedPassword: Date,
}

const UserScheme = new Schema<IUser>({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    },
    dataCreated: {
        type: Date,
        required: true,
        default: new Date()
    },
    dataUpdatedPassword: {
        type: Date,
        required: true,
        default: new Date()
    },
})

export const User = mongoose.model<IUser>('User', UserScheme)
