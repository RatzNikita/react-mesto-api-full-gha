import PopupWithForm from "./PopupWithForm";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {AppContext} from "../context/AppContext";

export const EditProfilePopup = ({isOpen, onUpdateUser}) => {

    const {closeAllPopups, isLoading} = useContext(AppContext)

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser,isOpen])

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeDescription = (e) => {
        setDescription((e.target.value))
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name='edit' title='Редактировать профиль' isOpen={isOpen}
                       onClose={closeAllPopups} onSubmit={handleSubmit} isLoading={isLoading}>
            <input className="popup__input popup__input_type_name"
                   placeholder="Имя"
                   type="text"
                   name="name-input"
                   required
                   minLength="2"
                   maxLength="40"
                   value={name || ''}
                   onChange={handleChangeName}/>
            <span className="popup__error name-input-error"></span>
            <input className="popup__input popup__input_type_description"
                   placeholder="О себе"
                   type="text"
                   name="description-input"
                   required
                   minLength="2"
                   maxLength="200"
                   value={description || ''}
                   onChange={handleChangeDescription}/>
            <span className="popup__error description-input-error"></span>
        </PopupWithForm>
    )
}