import { User, IUser } from "../models/User.model";
import { hashPassword } from "../utils/passwordEncryption";


class UserService {
    async createNote(username: string, password:string, email:string): Promise<IUser>{
        // This method create new user
        const  hashedPassword = await hashPassword(password)
        const createdNote = new User({username: username, password: hashedPassword, email: email});
        return await createdNote.save();
    }
}

export default new UserService();
