import { injectable } from "inversify";
import * as admin from "firebase-admin";
import { Firestore } from "firebase-admin/firestore";

@injectable()
export class FirestoreDb {
  private db: Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  public connect = async () => {
    return await this.db;
  };
}
