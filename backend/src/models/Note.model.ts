import { randomUUID } from 'crypto'
import mongoose, { Document } from 'mongoose'

const { Schema } = mongoose

enum CellsType {
  TEXT = 'text',
  CAPTION = 'caption',
  LINK = 'link',
  LINE = 'line',
  CHECK_BOX = 'checkBox',
  CITATION = 'citation',
  LIST = 'list',
}

export interface ICells extends Document {
  cellsType: CellsType
  props: object
  text: string
}

export interface INote extends Document {
  title: string
  slug: string
  isTrash: boolean
  isBookmark: boolean
  parentNote: INote
  childNote: [INote]
  cells: [ICells]
}

const CellsScheme = new mongoose.Schema<ICells>({
  cellsType: {
    type: String,
    enum: Object.values(CellsType),
    required: true,
  },
  props: mongoose.Schema.Types.Mixed,
  text: String,
})

export const NoteScheme = new Schema<INote>({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  slug: {
    type: String,
  },
  isTrash: {
    type: Boolean,
    default: false,
  },
  isBookmark: {
    type: Boolean,
    default: false,
  },
  parentNote: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
  },
  childNote: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
  cells: [CellsScheme],
})

// Generated random slug for note
NoteScheme.pre<INote>('save', function (next) {
  if (!this.slug) {
    this.slug = randomUUID()
  }
  next()
})

export const Note = mongoose.model<INote>('Note', NoteScheme)
