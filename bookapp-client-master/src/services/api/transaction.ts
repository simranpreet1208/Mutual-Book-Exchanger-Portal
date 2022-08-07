import { getConfig } from "../utils/localStorageUtils";
import axios, {AxiosResponse} from "axios";
import { Transaction, TransactionStatus } from "../../types/transaction";

const client = axios.create({ baseURL: "http://localhost:8080/transaction" });

export function getTransactionForUser(){
	return client.get<any, AxiosResponse<Transaction[], any>>("/get", getConfig());
}

export function createTransaction(bookId: number){
	return client.post("/add", {bookId}, getConfig());
}

export function getRequests(){
	return client.get<any, AxiosResponse<Transaction[], any>>("/get/owner", getConfig());
}

export function changeTransactionStatus(transactionStatus: TransactionStatus, transactionId: number){
	return client.post("/update/status", {transactionStatus, transactionId},getConfig());
}
