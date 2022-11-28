import { useContext, useState } from "react";
import { AuthContext } from '../../../contexts/AuthContext';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { database } from "../../../firebaseConfig";
import { v4 as uuidv4 } from 'uuid';

export const Comments = ({ postId }) => {
    const [input, setInput] = useState('');
    const { loggedUser } = useContext(AuthContext);

    const onComment = (e) => {
        e.preventDefault();

        if (input === '') {
            alert('Please enter a valid comment!');
            return;
        }

        updateDoc(doc(database, 'posts', postId), {
            comments: arrayUnion({
                comment: input,
                ownerId: loggedUser.uid,
                ownerImage: loggedUser.photoURL,
                ownerName: loggedUser.displayName,
                id: uuidv4()
            })
        })
            .then(() => {
                setInput('');
            })
            .catch((err) => {
                alert(err.message);
            })
            
    }
    return (
        <div className="comment__container">
            <form onSubmit={onComment}>
                <label htmlFor="comment" />
                <input
                    type="text"
                    id="comment"
                    name="comment"
                    placeholder="Add a comment..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button>post</button>
            </form>
        </div>
    );
}