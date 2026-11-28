import {db} from "@/firebase/index.js";
import {
    collection,
    query,
    where,
    orderBy,
    addDoc, onSnapshot, deleteDoc, doc, setDoc
} from "firebase/firestore";
import {PokemonInstance} from "@/models/PokemonInstance.js";
import {UserCollection} from "@/firebase/UserCollection.js";

export class PokelistCollection {
    static collectionName = 'pokelist';

    static getCollection(user) {
        const userCollectionRef = UserCollection.getUserDoc(user.uid);
        return collection(userCollectionRef, PokelistCollection.collectionName);
    }

    /**
     *
     * @returns {Query<DocumentData, DocumentData>}
     */
    static getPokelist(user) {
        return query(PokelistCollection.getCollection(user), orderBy('name', 'asc'))
            .withConverter(PokemonInstance)

    }

    static getSnapShot(pokemonList, user) {
        console.log(user)
        onSnapshot(PokelistCollection.getCollection(user), (snapshot) => {
            pokemonList.items.splice(0, pokemonList.items.length)

            snapshot.forEach(doc => {
                pokemonList.addSinglePokemon(doc.id, doc.data())
            })
        })
    }
    // static getPokemon(pokemonId, user) {
    //     const pokemonDocRef = doc(PokelistCollection.getCollection(user), pokemonId);
    //     return pokemonDocRef.get().then((docSnap) => {
    //         if (docSnap.exists()) {
    //             return new PokemonInstance(docSnap.id, docSnap.data());
    //         } else {
    //             console.log("No such document!");
    //             return null;
    //         }
    //     }).catch((error) => {
    //         console.error("Error getting document:", error);
    //         return null;
    //     });
    // }
    static addToPokelist(pokemonInstance, user) {
            addDoc(PokelistCollection.getCollection(user), pokemonInstance.toFirestore()).then((docRef) => {
                console.log("Pokemon added to Firestore with ID: ", docRef.id);
            }).catch((error) => {
                console.error("Error adding Pokemon to Firestore: ", error);
            });

    }
    static deleteFromPokelist(pokemonInstance, user) {
        deleteDoc(pokemonInstance.getDoc(user)).then(() => {
            console.log("Pokemon removed from Firestore:", pokemonInstance.id);
        }).catch((error) => {
            console.error("Error removing Pokemon from Firestore:", error);
        });
    }
    static updatePokelistItem(pokemonInstance, user) {
        setDoc(pokemonInstance.getDoc(user), pokemonInstance.toFirestore()).then(() => {
            console.log("Pokemon updated in Firestore:", pokemonInstance.id);
        }).catch((error) => {
            console.error("Error updating Pokemon in Firestore:", error);
        });
    }


}