import configDB from "../config/configDB.js";
import CartDaoFile from "./cart/cartDaoFile.js";
import ProductDaoFile from "./products/productDaoFile.js";
import CartDaoMemory from "./cart/cartDaoMemory.js";
import ProductDaoMemory from "./products/productDaoMemory.js";
import CartDaoMongo from "./cart/cartDaoMongo.js";
import ProductDaoMongo from "./products/productDaoMongo.js";


const DB = configDB.enVariables.DB;

export const cartDao = {
    'fileSystem': new CartDaoFile,
    'memory': new CartDaoMemory,
    'mongodb': new CartDaoMongo,
}[DB];

export const productDao = {
    'fileSystem': new ProductDaoFile,
    'memory': new ProductDaoMemory,
    'mongodb': new ProductDaoMongo,
}[DB];
