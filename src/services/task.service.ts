import { CreateUser, UpdateUser } from "./interfaces/user.interface";
import { injectable, inject } from "inversify";
import { CreateTask, UpdateTask } from "./interfaces/task.interface";
import { FirestoreDb } from "../config/db.config";
import { TYPES } from "../controllers/types";

@injectable()
class TaskService {
  private firestoreDb: FirestoreDb;

  constructor(@inject(TYPES.FirestoreDb) firestoreDb: FirestoreDb) {
    this.firestoreDb = firestoreDb;
  }
  async findAll() {
    const db = await this.firestoreDb.connect();
    const tasksCollection = await db.collection("tasks").get();
    return tasksCollection.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  }

  async findOne(id: string) {
    const db = await this.firestoreDb.connect();
    const tasksCollection = db.collection("tasks");
    const snapshot = await tasksCollection.doc(id).get();

    if (snapshot.exists) {
      return {
        id: snapshot.id,
        ...snapshot.data(),
      };
    } else {
      return null;
    }
  }

  async create(create: CreateTask) {
    const db = await this.firestoreDb.connect();
    const tasksCollection = await db.collection("tasks");
    const getData = await tasksCollection.add({
      ...create,
    });
    return getData.id;
  }

  async update(id: string, update: UpdateTask) {
    const db = await this.firestoreDb.connect();
    const tasksCollection = await db.collection("tasks");
    const taskDoc = await tasksCollection.doc(id.toString()).get();
    if (taskDoc.exists) {
      await tasksCollection.doc(id.toString()).update({
        ...update,
      });
      return {
        id: id,
        ...update,
      };
    } else {
      throw new Error("Task not found");
    }
  }

  async delete(id: string) {
    const db = await this.firestoreDb.connect();
    const tasksCollection = await db.collection("tasks");
    const userDoc = await tasksCollection.doc(id.toString()).get();
    if (userDoc.exists) {
      await tasksCollection.doc(id.toString()).delete();
      return {
        id: id,
        message: "deleted",
      };
    } else {
      throw new Error("Task not found");
    }
  }
}

export default TaskService;
