import admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";
import configDB from "../config/configDB.js";

const _prvkey = configDB.firebase.privateKey;

try {
  admin.initializeApp(
    {
      credential: admin.credential.cert(_prvkey),
    },
    console.log("Firebase inizialized")
  );
} catch (err) {
  console.log(err);
}

const database = admin.firestore();

class FirebaseHandler {
  constructor(collectionName) {
    this.coll = database.collection(collectionName);
  }
  async readAll() {
    try {
      const data = await this.coll.get();
      return data.docs.map((doc) => doc.data());
    } catch (err) {
      console.error(err);
    }
  }
  async getById(id) {
    try {
      const elem = await this.readAll();
      const data = elem.find((element) => element.id == id);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  async save(obj) {
    try {
      const date = new Date().toISOString();
      const productSave = await this.coll.add({
        ...obj,
        timestamp: date,
        id: uuidv4(),
      });
      return productSave;
    } catch (err) {
      console.error(err);
    }
  }
  async updateElement(id, element) {
    try {
      const updateProd = await this.coll.doc(id).update(element);
      return updateProd;
    } catch (err) {
      console.error(err);
    }
  }
  async deleteElement(id) {
    try {
      const index = await this.coll.doc(id).delete();
      return index;
    } catch (err) {
      console.error(err);
    }
  }
  async deleteAll() {
    try {
      const data = await this.coll.get().delete();
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  async addByid(id, obj) {
    try {
      const addInCart = await this.getById(id);
      if (addInCart) {
        addInCart.products.push(obj);
        const cartUpdated = await this.coll.update(addInCart.id, addInCart);
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
    }
  }
  async deleteByIdfromCart(idCart, idProduct) {
    try {
      const data = await this.getById(idCart);
      if (data) {
        const index = data.products.findIndex(
          (product) => product.id == idProduct
        );
        if (index > -1) {
          data.products.splice(index, 1);
          await this.updateElement(idCart, data);
          return data;
        } else {
          return null;
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default FirebaseHandler;
