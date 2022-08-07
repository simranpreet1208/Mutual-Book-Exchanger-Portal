import { Author } from "./author";
import { Category } from "./category";
import { User, UserResponse } from "./user";

export interface FeedBook {
	id: number;
	name:string;
	isbn:string;
	year: number;
	price: number;
	publishStatus:string;
	owner: UserResponse;
	author: Author;
	category: Category;
	createdDate: string;
}

export interface Book {
	id: number;
	name:string;
	isbn:string;
	year: number;
	price: number;
	publishStatus:string;
	owner: User;
	author: Author;
	category: Category;
	createdDate: string;
}

export interface AddBookDto{
	name: string;
	isbn: string;
	year: number;
	categoryId: number;
	authorId: number;
}
