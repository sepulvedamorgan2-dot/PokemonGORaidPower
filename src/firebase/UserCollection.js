import {db} from "@/firebase/index.js";
import {collection, doc, getDoc, onSnapshot, setDoc} from "firebase/firestore";
import {User} from "@/models/User.js";

export class UserCollection {
    static collectionName = 'users';

    static getUserCollection() {
        return collection(db, UserCollection.collectionName);
    };


    static getUserDoc(uid) {
        return doc(UserCollection.getUserCollection(), uid);
    };
    static async setUser(user){
        const userDocRef = UserCollection.getUserDoc(user.uid);
        return setDoc(userDocRef, user.toFireStore());
    }
    static async getUser(uid) {
        const userDocRef = UserCollection.getUserDoc(uid);
        const userDocSnap = await getDoc(userDocRef.withConverter(User));
        return userDocSnap.data()
    };
    static syncUser(uid, user){
        const userDocRef = UserCollection.getUserDoc(uid);
        onSnapshot(userDocRef.withConverter(User), doc => {
            Object.assign(user, doc.data());

        });
    }

    }