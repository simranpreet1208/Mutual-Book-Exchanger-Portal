import { Book } from "./book";
import { User } from "./user";

export interface Transaction {
	id: number;
	requestedDate: string;
	lendDate: string | null;
	expReturnDate: string | null;
	returnDate: string | null;
	penalty: number;
	user: User;
	book: Book;
	transactionStatus: TransactionStatus;
}

export enum TransactionStatus {
	REQUESTED = "REQUESTED",
	BORROWED = "BORROWED",
	EXTENDED = "EXTENDED",
	RETURNED = "RETURNED",
	CANCELED = "CANCELED",
}
