import {useContext} from "react";
import {AppContext} from "../context/AppContext";

const ImagePopup = ({card}) => {

    const {closeAllPopups} = useContext(AppContext)

    return (
        <div className={`popup popup_type_img ${card && 'popup_opened'}`}>
            <figure className="popup__image-container">
                <img className="popup__image" src={card.link} alt={card.link}/>
                <figcaption className="popup__caption">{card.name}</figcaption>
                <button className="popup__close-btn" type="button" onClick={closeAllPopups}></button>
            </figure>
        </div>
    )
}

export default ImagePopup