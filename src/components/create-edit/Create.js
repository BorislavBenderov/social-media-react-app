import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { database, storage } from '../../firebaseConfig';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export const Create = () => {
    const { loggedUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onCreate = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const image = formData.get('image');
        const description = formData.get('description');

        if (image.name === '') {
            alert('Please fill all the fields');
            return;
        }

        const storageRef = ref(storage, `/posts/${uuidv4()}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on('state_changed',
            (snapshot) => {
            },
            (error) => {
                alert(error.message)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        const postData = {
                            description,
                            image: downloadURL,
                            timestamp: serverTimestamp(),
                            ownerId: loggedUser.uid,
                            ownerImage: loggedUser.photoURL,
                            ownerName: loggedUser.displayName,
                            likes: [],
                            comments: []
                        }
                        addDoc(collection(database, 'posts'), postData)
                            .then(() => {
                                navigate('/posts');
                            })
                            .catch((err) => {
                                alert(err.message);
                            })
                    });
            }
        );
    }

    return (
        <div className="auth">
            <div className="auth__container">
                <h1>Create New Post</h1>
                <form className="auth__form" onSubmit={onCreate}>
                    <label htmlFor="description" />
                    <textarea
                        type="text"
                        placeholder="Write a description..."
                        id="description"
                        name="description" />
                    <label htmlFor="image" />
                    <input
                        type="file"
                        placeholder="Choose a picture"
                        id="image"
                        name="image"
                    />
                    <button type="submit">Create</button>
                </form>
            </div>
        </div>
    );
}