import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const configDB = {
    fileSystem: {
        products: path.resolve(__dirname, '../data/filePers/products.json'),
        cart: path.resolve(__dirname, '../data/filePers/cart.json'),
    },
    mongodb: {
        url: "mongodb+srv://kamp3rh:coderhouse@backendheredia.pimvu.mongodb.net/ecommerce"
    },
    memory: {
        products: [],
        cart: [],
    },
    enVariables: {
        DB: 'mongodb'
    }
};


export default configDB;