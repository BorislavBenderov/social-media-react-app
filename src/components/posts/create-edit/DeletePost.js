import { database } from '../../../firebaseConfig';
import { deleteDoc, doc } from 'firebase/firestore';

export const DeletePost = ({postId}) => {
    const onDeletePost = async () => {
        const confirmation = window.confirm('Are you sure you want to delete this post?');

        if (confirmation) {
            deleteDoc(doc(database, 'posts', postId));
        }
    }

    return (
        <i className="fa fa-trash fa-lg" aria-hidden="true" onClick={onDeletePost}></i>
    );
}