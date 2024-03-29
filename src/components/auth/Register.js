import { Link, useNavigate } from "react-router-dom";
import {
  setPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, database, storage } from "../../firebaseConfig";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

export const Register = () => {
  const [err, setErr] = useState("");
  const [isFileAdd, setIsFileAdd] = useState(false);
  const navigate = useNavigate();
  const { users } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const onRegister = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const repeatPassword = formData.get("repeatPassword");
    const image = formData.get("image");

    const isUsernameInUse = users.find((user) => user.displayName === username);

    if (
      email === "" ||
      password === "" ||
      repeatPassword === "" ||
      image.name === ""
    ) {
      setErr("Please fill all the fields!");
      return;
    }

    if (password !== repeatPassword) {
      setErr("Your password and confirmation password do not match!");
      return;
    }

    if (isUsernameInUse) {
      setErr("This username is already in use!");
      return;
    }

    if (username.length < 2 || username.length > 10) {
      setErr("Username must be more than 2 characters and less then 10!");
      return;
    }

    setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        setLoading(true);
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const storageRef = ref(storage, `/users/${email}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (err) => {
            alert(err.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
              updateProfile(res.user, {
                displayName: username,
                photoURL: downloadUrl,
              });
              setDoc(doc(database, "users", res.user.uid), {
                email: email,
                displayName: username,
                image: downloadUrl,
                uid: res.user.uid,
                following: [],
                followers: [],
              });
              setLoading(false);
              navigate("/posts");
            });
          }
        );
      })
      .catch((err) => {
        setErr(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <h1>Social Media</h1>
        <form className="auth__form" onSubmit={onRegister}>
          <label htmlFor="email" />
          <input type="text" placeholder="Email" id="email" name="email" />
          <label htmlFor="username" />
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
          />
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
              style={{ cursor: "pointer" }}
            >
              {isFileAdd ? "File is added!" : "Add a file"}
            </i>
          </label>
          <input
            type="file"
            placeholder="Choose a file"
            id="image"
            name="image"
            onChange={() => setIsFileAdd(true)}
          />
          <button type="submit">{loading ? "Loading..." : "Register"}</button>
          <p className="errors">{err}</p>
        </form>
      </div>
      <div className="auth__action">
        <p>Have an account?</p>
        <Link to="/">Log in</Link>
      </div>
    </div>
  );
};
