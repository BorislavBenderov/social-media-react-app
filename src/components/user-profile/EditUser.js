import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { database, storage } from "../../firebaseConfig";
import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";

export const EditUser = () => {
    const { users } = useContext(UserContext);
    const { loggedUser } = useContext(AuthContext);
    const { userId } = useParams();
    const navigate = useNavigate();
    const currentUser = users.find(user => user.uid === userId);
    const [values, setValues] = useState({
        username: currentUser?.displayName,
        description: currentUser?.profileDescription,
        image: currentUser?.image
    });

    const changeHandler = (e) => {
        setValues(oldState => ({
            ...oldState,
            [e.target.name]: e.target.value
        }));
    }

    const onEditUser = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const username = formData.get('username');
        const description = formData.get('description');
        const image = formData.get('image');

        const isUsernameInUse = users.filter(user => user.uid !== loggedUser.uid).find(user => user.displayName === username);

        if (isUsernameInUse) {
            alert('This username is already in use!');
            return;
        }

        if (username === '') {
            alert('Please set a username!');
            return;
        }

        if (username.length < 2 || username.length > 10) {
            alert('Username must be more than 2 characters and less then 10!');
            return;
        }

        if (image.name === '') {
            updateProfile(loggedUser, {
                photoURL: currentUser?.image,
                displayName: username
            });
            updateDoc(doc(database, 'users', loggedUser.uid), {
                image: currentUser?.image,
                displayName: username,
                profileDescription: description
            })
                .then(() => {
                    navigate(`/profile/${loggedUser.uid}`);
                })
                .catch((err) => {
                    alert(err.message);
                })
        } else {
            const storageRef = ref(storage, `/users/${loggedUser?.email}`);
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on('state_changed',
                (snapshot) => {
                },
                (err) => {
                    alert(err.message);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadUrl) => {
                            updateProfile(loggedUser, {
                                photoURL: downloadUrl,
                                displayName: username
                            });
                            updateDoc(doc(database, 'users', loggedUser.uid), {
                                image: downloadUrl,
                                displayName: username,
                                profileDescription: description
                            })
                                .then(() => {
                                    navigate(`/profile/${loggedUser.uid}`);
                                })
                        })
                        .catch((err) => {
                            alert(err.message);
                        })
                })
        }
    }

    return (
        <div className="auth">
            <div className="auth__container">
                <h1>Edit User</h1>
                <form className="auth__form" onSubmit={onEditUser}>
                    <label htmlFor="username" />
                    <input type="text" placeholder="Username" id="username" name="username" onChange={changeHandler} value={values.username} />
                    <label htmlFor="description" />
                    <textarea className='textarea__post' type="text" placeholder="Description" id="description" name="description" value={values.description} onChange={changeHandler} />
                    <label htmlFor="image">
                        <i
                            className="fa fa-picture-o fa-lg"
                            aria-hidden="true"
                            style={{ cursor: "pointer" }}>File</i>
                    </label>
                    <input
                        type="file"
                        placeholder="Choose a file"
                        id="image"
                        name="image"
                        value={values.image.name}
                        onChange={changeHandler}
                    />
                    <button type="submit">Edit</button>
                </form>
            </div>
        </div>
    );
}