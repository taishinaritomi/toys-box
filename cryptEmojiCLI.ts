import { decrypt } from './src/libs/crypto'

const args = process.argv.slice(2);

const text = args[0] || '';
const pass = args[1] || '';
console.log(decrypt(text,pass));
