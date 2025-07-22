const { db } = require("../modules/firebaseConfig");
const { doc, getDocs, getDoc, updateDoc, deleteDoc, addDoc, collection } = require("firebase/firestore");


class EmployeeModel {
  constructor() {
    this.collectionName = "employee";
  }

  async get () {
    const colRef = collection(db, this.collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getByID(id) {
    const docRef = doc(db, this.collectionName, id);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? snapshot.data() : null;
  }

  async create(data) {
    const colRef = collection(db, this.collectionName);
    console.log(data)
    const docRef = await addDoc(colRef, data);
    return docRef.id;
  }

  async delete(id) {
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
    return id;
  }

}

module.exports = new EmployeeModel();
