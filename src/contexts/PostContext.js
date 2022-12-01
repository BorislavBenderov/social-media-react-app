import { createContext, useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { database } from "../firebaseConfig";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const q = query(collection(database, 'posts'), orderBy("timestamp", 'desc'))
        onSnapshot(q, (snapshot) => {
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