import axios, { Axios, AxiosResponse } from "axios";
import { Book, FeedBook } from "../../types/book";
import { RegisterUserDto, User } from "../../types/user";
import { getConfig } from "../utils/localStorageUtils";

const client = axios.create({ baseURL: "http://localhost:8080/user" });

export function loginUser(loginInfo: { email: string; password: string }) {
	return client.post<any, AxiosResponse<{ token: string }>>(
		"/login",
		loginInfo
	);
}

export function getUserProfile() {
	return client.get<any, AxiosResponse<User, any>>("/get", getConfig());
}

export function registerUser(registerInfo: RegisterUserDto) {
	return client.post<any, AxiosResponse<{ token: string }>>(
		"/register",
		registerInfo
	);
}

export function addCategories(categories: number[]) {
	return client.post<any, AxiosResponse<User>>(
		"/update/category",
		{ ids: categories },
		getConfig()
	);
}

export function getFeed() {
	return client.get<any, AxiosResponse<FeedBook[], any>>(
		"/feed",
		getConfig()
	);
}

export function getUserBooks(){
	return client.get<any, AxiosResponse<Book[], any>>("/book", getConfig());
}

export function searchUser(q: string){
	return client.get<any, AxiosResponse<User[], any>>(`/search?query=${q}`, getConfig());
}

export function deleteUser(id: number){
	return client.delete(`/${id}`, getConfig());
}
