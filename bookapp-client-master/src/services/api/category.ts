import { getConfig } from "../utils/localStorageUtils";
import axios, { AxiosResponse } from "axios";
import { Category } from "../../types/category";

const client = axios.create({ baseURL: "http://localhost:8080/category" });

export function getAllCategories() {
	return client.get<any, AxiosResponse<Category[]>>("/all", getConfig());
}

export function addCategory(name: string){
	return client.post("/add", {name}, getConfig());
}
