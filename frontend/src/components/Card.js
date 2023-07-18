import {useContext} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";

const Card = ({card, onCardClick, onCardLike, onCardDelete}) => {

    const currentUser = useContext(CurrentUserContext)
    const isOwn = currentUser._id === card.owner._id
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (`element__like-button ${isLiked && 'element__like-button_active'}`);

    const handleClick = () => {
        onCardClick(card)
    }

    const handleLikeClick = () => {
        onCardLike(card)
    }

    const handleDeleteClick = () => {
        onCardDelete(card._id)
    }

    return (
        <li className="elements-list__member">
            <article className="element">
                <img className="element__image" src={card.link} alt={card.link} onClick={handleClick}/>
                {isOwn &&
                    <button type="button" className="element__delete-button" onClick={handleDeleteClick}></button>}
                <div className="element__content">
                    <h2 className="element__title">{card.name}</h2>
                    <div className="element__like-container">
                        <button className={cardLikeButtonClassName} type="submit" onClick={handleLikeClick}></button>
                        <span className="element__like-counter">{card.likes.length}</span>
                    </div>
                </div>
            </article>
        </li>
    )

}

export default Card;