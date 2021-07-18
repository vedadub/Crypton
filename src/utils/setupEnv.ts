import { readFileSync } from "fs";

const setupEnv = () => {
    readFileSync(".env")
        .toString()
        .split("\n")
        .forEach(line => {
            const [key, value] = line.split("=");
            process.env[key] = value;
        }
    );
};

export default setupEnv;