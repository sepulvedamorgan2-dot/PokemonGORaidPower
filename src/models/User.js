import {PokemonList} from "@/models/PokemonList.js";
import {collection, doc, getDoc} from "firebase/firestore";
import {db} from "@/firebase/index.js";

const COLLECTION_NAME = 'users';
export function User(data = {}) {
    this.uid = data.uid ?? '';
    this.displayName = data.displayName ?? '';
    this.friendshipCode = data.friendshipCode ?? '';
    this.socialMedia = data.socialMedia ?? {
        reddit: null,
        discord: null,
    };
    this.pokeList = data.pokeList ?? new PokemonList();
    this.tradeCardList = data.tradeCardList ?? [];

    this.exists = function() {
        return !!this.uid;
    }

}
User.getUserCollection = function () {
    return collection(db, COLLECTION_NAME);
};

User.getUserDoc = function (uid) {
    return doc(User.getUserCollection(), uid);
};

User.getUser = async function (uid) {
    const userDocRef = User.getUserDoc(uid);
    const userDocSnap = await getDoc(userDocRef.withConverter(User));
    return userDocSnap.exists() ? userDocSnap.data() : null;
};