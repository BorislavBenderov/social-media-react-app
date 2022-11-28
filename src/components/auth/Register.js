import { Link } from 'react-router-dom';

export const Register = () => {
    return (
        <div className="auth">
            <div className="auth__container">
                <h1>Social Media</h1>
                <form className="auth__form">
                    <label htmlfor="email" />
                    <input type="text" placeholder="Email" id="email" name="email" />
                    <label htmlfor="password" />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                    />
                    <label htmlfor="repeatPassword" />
                    <input
                        type="password"
                        placeholder="Repeat Password"
                        id="repeatPassword"
                        name="repeatPassword"
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