import { createContext, useEffect, useState } from "react";
import { collection, onSnapshot } from 'firebase/firestore';
import { database } from "../firebaseConfig";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        onSnapshot(collection(database, 'posts'), (snapshot) => {
            setPosts(snapshot.docs.map((item) => {
                return { ...item.data(), id: item.id }
            }));
        });
    }, []);

    return (
        <PostContext.Provider value={{ posts }}>
            {children}
        </PostContext.Provider>
    );
}