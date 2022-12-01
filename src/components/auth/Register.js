import { Link, useNavigate } from 'react-router-dom';
import { setPersistence, browserSessionPersistence, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, database, storage } from '../../firebaseConfig';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';

export const Register = () => {
    const [isFileAdd, setIsFileAdd] = useState(false);
    const navigate = useNavigate();
    const { users } = useContext(UserContext);
    console.log(users)

    const onRegister = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email');
        const username = formData.get('username');
        const password = formData.get('password');
        const repeatPassword = formData.get('repeatPassword');
        const image = formData.get('image');

        const isUsernameInUse = users.find(user => user.displayName === username);

        if (email === '' || password === '' || repeatPassword === '' || image.name === '') {
            alert('Please fill all the fields!');
            return;
        }

        if (password !== repeatPassword) {
            alert("Your password and confirmation password do not match!");
            return;
        }

        if (isUsernameInUse) {
            alert('This username is already in use!');
            return;
        }

        setPersistence(auth, browserSessionPersistence)
            .then(async () => {
                const res = await createUserWithEmailAndPassword(auth, email, password);
                const storageRef = ref(storage, `/users/${email}`);
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
                                updateProfile(res.user, {
                                    displayName: username,
                                    photoURL: downloadUrl
                                });
                                setDoc(doc(database, 'users', res.user.uid), {
                                    email: email,
                                    displayName: username,
                                    image: downloadUrl,
                                    uid: res.user.uid,
                                    following: [],
                                    followers: []
                                })
                                navigate('/posts')
                            })
                    })
            })
            .catch((err) => {
                alert(err.message);
            });
    }


    return (
        <div className="auth">
            <div className="auth__container">
                <h1>Social Media</h1>
                <form className="auth__form" onSubmit={onRegister}>
                    <label htmlFor="email" />
                    <input type="text" placeholder="Email" id="email" name="email" />
                    <label htmlFor="username" />
                    <input type="text" placeholder="Username" id="username" name="username" />
                    <label htmlFor="password" />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                    />
                    <label htmlFor="repeatPassword" />
                    <input
                        type="password"
                        placeholder="Repeat Password"
                        id="repeatPassword"
                        name="repeatPassword"
                    />
                    <label htmlFor="image">
                        <i
                            className="fa fa-picture-o fa-lg"
                            aria-hidden="true"
                            style={{ cursor: "pointer" }}>
                            {isFileAdd ? "File is added!" : "Add a file"}</i>
                    </label>
                    <input
                        type="file"
                        placeholder="Choose a file"
                        id="image"
                        name="image"
                        onChange={() => setIsFileAdd(true)}
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
            <div className="auth__action">
                <p>Have an account?</p>
                <Link to="/">Log in</Link>
            </div>
        </div>
    );
}