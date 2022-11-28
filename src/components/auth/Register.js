import { Link, useNavigate } from 'react-router-dom';
import { setPersistence, browserSessionPersistence, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, database, storage } from '../../firebaseConfig';

export const Register = () => {
    const navigate = useNavigate();

    const onRegister = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPassword = formData.get('repeatPassword');
        const image = formData.get('image');

        if (email === '' || password === '' || repeatPassword === '' || image.name === '') {
            alert('Please fill all the fields!');
            return;
        }

        if (password !== repeatPassword) {
            alert("Your password and confirmation password do not match");
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
                                    displayName: email,
                                    photoURL: downloadUrl
                                });
                                setDoc(doc(database, 'users', res.user.uid), {
                                    displayName: email,
                                    image: downloadUrl,
                                    uid: res.user.uid
                                })
                                navigate('/posts')
                            })
                            .catch((err) => {
                                alert(err.message);
                            });
                    })
            })
    }


    return (
        <div className="auth">
            <div className="auth__container">
                <h1>Social Media</h1>
                <form className="auth__form" onSubmit={onRegister}>
                    <label htmlFor="email" />
                    <input type="text" placeholder="Email" id="email" name="email" />
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
                    <label htmlFor="image" />
                    <input
                        type="file"
                        placeholder="Choose a file"
                        id="image"
                        name="image"
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