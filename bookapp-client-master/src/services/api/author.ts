import { getConfig } from "../utils/localStorageUtils";
import axios, { AxiosResponse } from "axios";
import { Author } from "../../types/author";

const client =axios.create({ baseURL: "http://localhost:8080/author" });

export function getAllAuthors(){
	return client.get<any, AxiosResponse<Author[], any>>("/all", getConfig());
}

export function addAuthor(name: string){
	return client.post("/add", {name}, getConfig());
}
