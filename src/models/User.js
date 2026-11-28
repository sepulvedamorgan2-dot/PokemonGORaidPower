import {PokemonList} from "@/models/PokemonList.js";
import {collection, doc, getDoc} from "firebase/firestore";
import {db} from "@/firebase/index.js";

const COLLECTION_NAME = 'users';

export function User(data) {
    this.uid = '';
    this._path = '';
    this.displayName = data.displayName ?? '';
    this.friendshipCode = data.friendshipCode ?? '';
    this.socialMedia = data.socialMedia ?? {
        reddit: null,
        discord: null,
    };

    this.exists = function () {
        return !!this.uid;
    }

    this.toFireStore = function () {
        return {
            displayName: this.displayName,
            friendshipCode: this.friendshipCode,
            socialMedia: this.socialMedia,
        };
    }

}


User.fromFirestore = function (snapshot, options) {
    const data = snapshot.data(options);
    data.uid = snapshot.id; // Ensure the uid is set from the document ID
    data._path = snapshot.ref.path;
    // Store the document path for later use
    console.log(data)
    return new User(data);

}