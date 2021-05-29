import {useState} from "react";
import Header from "./Header"
import Main from "./Main"
import Footer from './Footer'
import PopupWithForm from "../components/PopupWithForm"
import ImagePopup from "./ImagePopup"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

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
    setSelectedCard(null)
  }

  function handleCardClick(card){
    setSelectedCard(card)
  }
  
  return (
    <div className="App">
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        />
        <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          formName='edit'
          title='Редактировать профиль'
          buttonName='Сохранить'
          onClose={closeAllPopups}
        >
          <input type="text" className="popup__edit popup__edit_type_name popup__input" name="name" placeholder="Имя" required minLength="2" maxLength="40"/>
          <span className="popup__error" id="popup__name__error"></span>
          <input type="text" className="popup__edit popup__edit_type_description popup__input" name="about" placeholder="О себе" required minLength="2" maxLength="200"/>
          <span className="popup__error" id="popup__about__error"></span>
        </PopupWithForm>
        <PopupWithForm
          isOpen={isAddPlacePopupOpen}
          formName='place'
          title='Новое место'
          buttonName='Создать'
          onClose={closeAllPopups}
        >
          <input type="text" className="place__edit place__edit_type_place popup__input" name="name" placeholder="Название" required minLength="2" maxLength="30"/>
          <span className="popup__error" id="place__name__error"></span>
          <input type="url" className="place__edit place__edit_type_url popup__input" name="link" placeholder="Ссылка на картинку" required/>
          <span className="popup__error" id="place__link__error"></span>
        </PopupWithForm>
        <PopupWithForm
          isOpen={isEditAvatarPopupOpen}
          formName='avatar'
          title='Обновить аватар'
          buttonName='Сохранить'
          onClose={closeAllPopups}
        >
          <input type="url" className="avatar__edit avatar__edit_type_url popup__input" name="avatar" placeholder="Ссылка на картинку" required/>
          <span className="popup__error" id="avatar__avatar__error"></span>
        </PopupWithForm>
        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups}
        />
      <Footer />
    </div>
  );
}

export default App;
