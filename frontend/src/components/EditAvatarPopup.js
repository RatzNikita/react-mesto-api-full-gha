import PopupWithForm from "./PopupWithForm";
import {useContext, useRef} from "react";
import {AppContext} from "../context/AppContext";

export const EditAvatarPopup = ({isOpen, onUpdateAvatar}) => {

    const {closeAllPopups, isLoading} = useContext(AppContext)

    const avatarInputRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarInputRef.current.value,
        });
    }

    return (
        <PopupWithForm name='avatar' title='Обновить аватар' isOpen={isOpen} isLoading={isLoading}
                       onClose={closeAllPopups} onSubmit={handleSubmit}>
            <input className="popup__input popup__input_type_description"
                   placeholder="Ссылка на картинку"
                   type="url"
                   name="img-input" required
                   ref={avatarInputRef}/>
            <span className="popup__error img-input-error"></span>
        </PopupWithForm>
    )
}