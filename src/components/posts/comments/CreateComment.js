import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { database } from '../../../firebaseConfig';

export const CreateComment = ({ postId }) => {
    const [input, setInput] = useState([]);
    const { loggedUser } = useContext(AuthContext);

    const onCreateComment = (e) => {
        e.preventDefault();

        if (input === '') {
            alert('Please enter a valid comment');
            return;
        }

        addDoc(collection(database, 'comments'), {
            text: input,
            commentId: postId,
            uid: loggedUser.uid,
            email: loggedUser.email,
            timestamp: serverTimestamp(),
            likes: []
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
            <form onSubmit={onCreateComment}>
                <label htmlFor="comment" />
                <textarea
                    className="comment__textarea"
                    type="text"
                    id="comment"
                    name="comment"
                    placeholder="Add a comment..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" className="post__comment__btn">post</button>
            </form>
        </div>
    );
}