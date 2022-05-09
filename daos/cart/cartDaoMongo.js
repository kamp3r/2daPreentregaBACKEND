import MongoHandler from "../../container/mongoHandler.js";

class CartMongoDao extends MongoHandler {
    constructor() {
        super("carts", { 
            timestamp: { type: Date, required: true },
            products: { type: Array, required: true },
        });
    }
}

export default CartMongoDao
