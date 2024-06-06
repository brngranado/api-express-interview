import { CreateUser, UpdateUser } from "./interfaces/user.interface";
import { injectable, inject } from "inversify";
import { FirestoreDb } from "../config/db.config";
import { TYPES } from "../controllers/types";

@injectable()
class UserService {
  private firestoreDb: FirestoreDb;

  constructor(@inject(TYPES.FirestoreDb) firestoreDb: FirestoreDb) {
    this.firestoreDb = firestoreDb;
  }
  async findAll() {
    const db = await this.firestoreDb.connect();
    const userCollection = await db.collection("users").get();
    return userCollection.docs.map((doc) => doc.data());
  }

  async findOne(email: string) {
    const db = await this.firestoreDb.connect();
    const userCollection = await db.collection("users");
    const query = await userCollection.where("email", "==", email).get();
    return query.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    })[0];
  }

  async create(create: CreateUser) {
    const db = await this.firestoreDb.connect();
    const userCollection = await db.collection("users");
    const getData = await userCollection.add({
      ...create,
    });
    return getData.id;
  }

  async update(id: number, update: UpdateUser) {
    const db = await this.firestoreDb.connect();
    const userCollection = await db.collection("users");
    const userDoc = await userCollection.doc(id.toString()).get();
    if (userDoc.exists) {
      await userCollection.doc(id.toString()).update({
        ...update,
      });
      return {
        id: id,
        ...update,
      };
    } else {
      throw new Error("User not found");
    }
  }

  async delete(id: string) {
    const db = await this.firestoreDb.connect();
    const userCollection = await db.collection("users");
    const userDoc = await userCollection.doc(id.toString()).get();
    if (userDoc.exists) {
      await userCollection.doc(id.toString()).delete();
      return {
        id: id,
        message: "deleted",
      };
    } else {
      throw new Error("User not found");
    }
  }
}

export default UserService;
