import {useEffect, useState} from "react";
import Header from "./Header"
import Main from "./Main"
import Footer from './Footer'
import ImagePopup from "./ImagePopup"
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api"
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({isOpen: false,})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])

  useEffect(() => {
    api.getInitialCards().then(res => {
      setCards(res)
    })
    .catch(err => console.log(err))
  }, [])

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function closeAllPopups(){
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setSelectedCard({isOpen: false})
  }

  function handleCardClick(card){
    setSelectedCard(card)
  }

  const handleCardDelete = (id) => {
    return api.deleteCard(id)
    .then(() => {
      const newCards = cards.filter(card => card._id !== id)
      setCards(newCards)
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if(!isLiked){
      api.setLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
    }
    else {
      api.removeLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
    }
  }
  function handleUpdateUser({name, about}) {
    const userInfo = {
      name, about
    }
    return api.updateUserInformation(userInfo.name, userInfo.about).then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
  }

  function handleUpdateAvatar(avatar) {
    return api.updateUserAvatar(avatar).then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
  }

  function handleAddPlaceSubmit({place, link}) {
    return api.addNewCardToServer(place, link).then((res) => {
      setCards([res, ...cards]);
      closeAllPopups()
    }) 
  }

  useEffect(() => {
    api.getUserInformation().then(res => {
      setCurrentUser(res)
    })
    .catch(err => console.log(err))
  }, [])
  
  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          cards={cards}
          />
          <EditAvatarPopup />
          <AddPlacePopup onCardCreate={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
          <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
          <ImagePopup 
            card={selectedCard}
            onClose={closeAllPopups}
            />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
