import {useContext} from "react";
import {AppContext} from "../context/AppContext";

const PopupWithForm = ({title, name, children, isOpen, onSubmit}) => {

    const {closeAllPopups, isLoading} = useContext(AppContext)

    return (<div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
        <div className="popup__container">
            <h2 className="popup__title">{title}</h2>
            <form className="popup__form" id="card-form" name={name} onSubmit={onSubmit}>
                {children}
                <button className="popup__submit-btn" type="submit">{isLoading ? 'Сохранение...' : 'Сохранить'}</button>
            </form>
            <button className="popup__close-btn" type="button" onClick={closeAllPopups}></button>
        </div>
    </div>)
}

export default PopupWithForm