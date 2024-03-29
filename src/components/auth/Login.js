import { Link, useNavigate } from "react-router-dom";
import {
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useState } from "react";

export const Login = () => {
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    if (email === "" || password === "") {
      setErr("Please fill all the fields!");
      return;
    }

    setPersistence(auth, browserSessionPersistence).then(() => {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setLoading(false);
          navigate("/posts");
        })
        .catch((err) => {
          setLoading(false);
          setErr(err.message);
        });
    });
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <h1>Social Media</h1>
        <form className="auth__form" onSubmit={onLogin}>
          <label htmlFor="email" />
          <input type="text" placeholder="Email" id="email" name="email" />
          <label htmlFor="password" />
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
          />
          <button type="submit">{loading ? "Loading..." : "Log In"}</button>
          <p className="errors">{err}</p>
        </form>
      </div>
      <div className="auth__action">
        <p>Don't have an account?</p>
        <Link to="/register">Sign up</Link>
      </div>
    </div>
  );
};
