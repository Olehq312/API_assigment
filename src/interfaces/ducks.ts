import { User } from "./user";


export interface Duck extends Document {
    name: string;
    age: number;
    style: string;
    color: string;
    _createdby: User ['id'];
}