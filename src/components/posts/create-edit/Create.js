import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { database, storage } from '../../../firebaseConfig';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

export const Create = () => {
    const [isFileAdd, setIsFileAdd] = useState(false);
    const { loggedUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onCreate = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const image = formData.get('image');
        const description = formData.get('description');

        if (image.name === '') {
            alert('Please add a file!');
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
                        className='textarea__post'
                        type="text"
                        placeholder="Write a description..."
                        id="description"
                        name="description" />
                    <label htmlFor="image">
                        <i
                            className="fa fa-picture-o fa-lg"
                            aria-hidden="true"
                            style={{ cursor: "pointer" }}>
                            {isFileAdd ? "File is added!" : "Add a file"}</i>
                    </label>
                    <input
                        type="file"
                        placeholder="Choose a picture"
                        id="image"
                        name="image"
                        onChange={() => setIsFileAdd(true)}
                    />
                    <button type="submit">Create</button>
                </form>
            </div>
        </div>
    );
}