export const EditUser = () => {
    return (
        <div className="auth">
            <div className="auth__container">
                <h1>Edit User</h1>
                <form className="auth__form">
                    <label htmlFor="username" />
                    <input type="text" placeholder="Username" id="username" name="username" />
                    <label htmlFor="description" />
                    <input type="text" placeholder="Description" id="description" name="description" />
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
                    />
                    <button type="submit">Edit</button>
                </form>
            </div>
        </div>
    );
}