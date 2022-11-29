import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { database } from "../firebaseConfig";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const q = query(collection(database, 'users'), orderBy("displayName"));
        onSnapshot(q, (snapshot) => {
            setUsers(snapshot.docs.map((item) => {
                return { ...item.data(), id: item.id };
            }));
        });
    }, []);

    return (
        <UserContext.Provider value={{ users }}>
            {children}
        </UserContext.Provider>
    );
}