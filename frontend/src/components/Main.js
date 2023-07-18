import {useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from "../context/CurrentUserContext";
import Header from "./Header";
import Footer from "./Footer";

const Main = ({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete, email}) => {

    const currentUser = useContext(CurrentUserContext);

    return (
        <>
            <Header email={email}/>
            <main className="content">
                <section className="profile">
                    <div className="profile__avatar">
                        <img alt="Аватар пользователя"
                             className="profile__photo"
                             src={currentUser.avatar}/>
                        <button className="profile__update-avatar-button" type="button"
                                onClick={onEditAvatar}></button>
                    </div>
                    <div className="profile__text-content">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <p className="profile__subtitle">{currentUser.about}</p>
                        <button className="profile__edit-button" type="button"
                                onClick={onEditProfile}></button>
                    </div>
                    <button className="profile__add-button" type="button"
                            onClick={onAddPlace}></button>
                </section>
                <section className="elements">
                    <ul className="elements-list">
                        {cards && cards.map(card => {
                            return (
                                <Card card={card}
                                      key={card._id}
                                      onCardClick={onCardClick}
                                      onCardDelete={onCardDelete}
                                      onCardLike={onCardLike}/>
                            )
                        })}
                    </ul>
                </section>
            </main>
            <Footer/>
        </>
    )
}

export default Main