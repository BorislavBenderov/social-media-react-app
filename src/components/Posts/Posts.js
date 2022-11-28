export const Posts = () => {
    return (
        <main>
            <header class="header__container">
                <ul class="nav">
                    <li><a href="">Create</a></li>
                    <li><a href="">Profile</a></li>
                    <li><a href="">Logout</a></li>
                </ul>
            </header>
            <section class="content__container">
                <div class="content__card">
                    <div class="name__img">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="img" />
                        <h3 class="content__card__name">Borislav</h3>
                    </div>
                    <img class="content__card__img" src="https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?cs=srgb&dl=pexels-lukas-rodriguez-3680219.jpg&fm=jpg" alt="" />
                    <div class="likes__coments">
                        <p>likes</p>
                        <p>comments</p>
                    </div>
                    <div class="name__description">
                        <h3 class="content__card__name">Borislav</h3>
                        <p>Lorem, ipsum dolor sit </p>
                    </div>
                    <p className="view__all__comments">view all comments</p>
                    <div class="comment__container">
                        <form>
                            <label for="comment"></label>
                            <input type="text" id="comment" name="comment" placeholder="Add a comment..." />
                            <button>post</button>
                        </form>
                    </div>
                </div>
                <div class="content__card">
                    <div class="name__img">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="img" />
                        <h3 class="content__card__name">Borislav</h3>
                    </div>
                    <img class="content__card__img" src="https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?cs=srgb&dl=pexels-lukas-rodriguez-3680219.jpg&fm=jpg" alt="" />
                    <div class="likes__coments">
                        <p>likes</p>
                        <p>comments</p>
                    </div>
                    <div class="name__description">
                        <h3 class="content__card__name">Borislav</h3>
                        <p>Lorem, ipsum dolor sit </p>
                    </div>
                    <p>view all comments</p>
                    <div class="comment__container">
                        <form>
                            <label for="comment"></label>
                            <input type="text" id="comment" name="comment" placeholder="Add a comment..." />
                            <button>post</button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}