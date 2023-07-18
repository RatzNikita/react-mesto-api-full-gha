import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {useEffect, useState} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {api} from "../utils/api";
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";
import {AddPlacePopup} from "./AddPlacePopup";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Register} from "./Register";
import Login from "./Login";
import {ProtectedRouteElement} from "./ProtectedRouteElement";
import * as auth from "../utils/auth";
import {AppContext} from "../context/AppContext";

const App = () => {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null)
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, initialCards]) => {
                setCurrentUser(user)
                setCards(initialCards)
            })
            .catch(err => console.log(err))
    }, [])

    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard

    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen])

    useEffect(() => {
        handleTokenCheck();
    }, [])

    const handleTokenCheck = () => {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            auth.checkToken(token).then((data) => {
                if (data) {
                    setLoggedIn(true);
                    setEmail(data.email)
                    navigate('/')
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
    const handleLogin = (email) => {
        setEmail(email)
        setLoggedIn(true);
    }

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
    }

    const handleCardClick = (card) => {
        setSelectedCard(card)
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setSelectedCard(null)
    }

    const handleUpdateUser = ({name, about}) => {
        setIsLoading(true)
        api.setUserInfo(name, about)
            .then(user => {
                setCurrentUser(user)
            })
            .then(closeAllPopups)
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))

    }

    const handleUpdateAvatar = ({avatar}) => {
        setIsLoading(true)
        api.updateUserAvatar(avatar)
            .then(() => setCurrentUser(state => {
                return {...state, avatar: avatar}
            }))
            .then(closeAllPopups)
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards(state => state.map((c) => c._id === card._id ? newCard : c))
            })
            .catch(err => console.log(err));
    }

    function handleCardDelete(id) {
        api.deleteCard(id)
            .then(() => setCards(state => state.filter(card => card._id !== id)))
            .catch(err => console.log(err));
    }

    function handleAddPlaceSubmit({name, link}) {
        setIsLoading(true)

        api.postCard(name, link)
            .then(newCard => setCards([newCard, ...cards]))
            .then(closeAllPopups)
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }


    return (
        <AppContext.Provider value={{closeAllPopups, isLoading}}>
            <CurrentUserContext.Provider value={currentUser}>
                <div className="page">
                    <Routes>
                        <Route path="/sign-up" element={<Register/>}/>
                        <Route path="/sign-in" element={<Login handleLogin={handleLogin}/>}/>
                        <Route path="/" element={
                            <ProtectedRouteElement element={Main}
                                                   onAddPlace={handleAddPlaceClick}
                                                   onEditAvatar={handleEditAvatarClick}
                                                   onEditProfile={handleEditProfileClick}
                                                   onCardClick={handleCardClick}
                                                   onCardDelete={handleCardDelete}
                                                   onCardLike={handleCardLike}
                                                   cards={cards}
                                                   email={email}
                                                   loggedIn={loggedIn}/>}/>
                    </Routes>
                    <EditProfilePopup isOpen={isEditProfilePopupOpen}
                                      onUpdateUser={handleUpdateUser}/>
                    <AddPlacePopup isOpen={isAddPlacePopupOpen}
                                   onAddPlace={handleAddPlaceSubmit}/>
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                                     onUpdateAvatar={handleUpdateAvatar}/>
                    <PopupWithForm name='delete' title='Вы уверены?'/>
                    {selectedCard && <ImagePopup card={selectedCard}/>}
                </div>
            </CurrentUserContext.Provider>
        </AppContext.Provider>
    )
}

export default App;