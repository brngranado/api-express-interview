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

  //   public async getCollection(collectionName: string) {
  //     return this.db.collection(collectionName);
  //   }

  //   public async getDocument(collectionName: string, documentId: string) {
  //     return this.db.collection(collectionName).doc(documentId);
  //   }

  //   public async addDocument(collectionName: string, data: any) {
  //     return this.db.collection(collectionName).add(data);
  //   }

  //   public async updateDocument(collectionName: string, documentId: string, data: any) {
  //     return this.db.collection(collectionName).doc(documentId).update(data);
  //   }

  //   public async deleteDocument(collectionName: string, documentId: string) {
  //     return this.db.collection(collectionName).doc(documentId).delete();
  //   }
}
