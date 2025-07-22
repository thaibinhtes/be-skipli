const { db } = require("../modules/firebaseConfig");
const { doc, setDoc, getDoc, updateDoc, deleteDoc } = require("firebase/firestore");

class UserModel {
  constructor() {
    this.collectionName = "users";
  }

  // Lấy thông tin user theo email
  async get(account) {
    const userRef = doc(db, this.collectionName, account);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      return snapshot.data();
    }
    return null;
  }

  async createOrUpdate(userData) {
    const userRef = doc(db, this.collectionName, userData.email);
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      await updateDoc(userRef, { ...userData });
    } else {
      await setDoc(userRef, userData);
    }
    
    const updatedSnapshot = await getDoc(userRef);
    return updatedSnapshot.data();
  }

  async delete(email) {
    const userRef = doc(db, this.collectionName, email);
    await deleteDoc(userRef);
  }
}

module.exports = new UserModel();
