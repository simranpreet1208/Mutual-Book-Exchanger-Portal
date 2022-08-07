import { AxiosRequestConfig } from "axios";

export function checkLoggedIn() {
	const token = localStorage.getItem("token");
	if (token) {
		return true;
	}
	return false;
}

export function clearLocalStorage(){
	localStorage.removeItem("token");
}

export function setLocalStorage(token: string){
	localStorage.setItem("token", token);
}

export function getConfig(): AxiosRequestConfig {
	const token = localStorage.getItem("token") as string;
	const config: AxiosRequestConfig = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	return config;
}
