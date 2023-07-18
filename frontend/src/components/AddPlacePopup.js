import PopupWithForm from "./PopupWithForm";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../context/AppContext";

export const AddPlacePopup = ({isOpen, onAddPlace,}) => {

    const {closeAllPopups, isLoading} = useContext(AppContext)

    const [name, setName] = useState('')
    const [link, setLink] = useState('')

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeLink = (e) => {
        setLink((e.target.value))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace({name, link})
    }

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    return (
        <PopupWithForm name='add' title='Новое место' isOpen={isOpen} onClose={closeAllPopups} onSubmit={handleSubmit} isLoading={isLoading}>
            <input className="popup__input popup__input_type_name"
                   placeholder="Название"
                   type="text"
                   name="place-name-input"
                   required
                   minLength="2"
                   maxLength="40"
                   value={name}
                   onChange={handleChangeName}/>
            <span className="popup__error place-name-input-error"></span>
            <input className="popup__input popup__input_type_description"
                   placeholder="Ссылка на картинку"
                   type="url"
                   name="img-input" required
                   value={link}
                   onChange={handleChangeLink}/>
            <span className="popup__error img-input-error"></span>
        </PopupWithForm>
    )
}