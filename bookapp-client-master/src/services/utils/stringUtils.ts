export function toNameCase(name: string){
	const names = name.split(" ");
	let str = "";
	names.forEach((n) => {
		const r = n.charAt(0).toUpperCase() + n.toLowerCase().slice(1) + " ";
		str += r;
	})
	return str;
}
