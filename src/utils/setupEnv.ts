import { readFileSync } from "fs";

const setupEnv = (): boolean => {
	readFileSync(".env")
		.toString()
		.split("\n")
		.forEach(line => {
			const [key, value] = line.split("=");
			process.env[key] = value;
		}
		);
	return true;
};

export default setupEnv;