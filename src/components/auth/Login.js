export const Login = () => {
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
                    <button type="submit">Log In</button>
                </form>
            </div>
            <div className="auth__action">
                <p>Don't have an account?</p>
                <a href="">Sign up</a>
            </div>
        </div>
    );
}