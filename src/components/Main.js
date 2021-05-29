import {useEffect, useState} from "react";
import {api} from "../utils/Api"
import Card from "./Card"

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [cards, setCards] = useState([])

  useEffect(() => {
    api.getInitialCards().then(res => {
      setCards(res)
    })
  }, [])

  useEffect(() => {
    api.getUserInformation().then(res => {setUserName(res.name)})
  }, [])

  useEffect(() => {
    api.getUserInformation().then(res => {setUserDescription(res.about)})
  }, [])

  useEffect(() => {
    api.getUserInformation().then(res => {setUserAvatar(res.avatar)})
  }, [])
  
return (
  <main className="main">
    <section className="profile">
      <p className="profile__avatar" href="#" target="_blank" onClick={onEditAvatar} style={{backgroundImage: `url(${userAvatar})`}}></p>
      <div className="profile__info">
        <h1 className="profile__name">{userName}</h1>
        <h2 className="profile__description">{userDescription}</h2>
      </div>
      <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
      <button type="button" className="profile__add-card" onClick={onAddPlace}></button>
    </section>
    <section className="elements">
      {cards.map((card, i) => (
        <Card
          card={card}
          link={card.link}
          name={card.name}
          likes={card.likes}
          onCardClick={onCardClick}
          key={i} 
        />
      ))}
    </section>
    <section className="delete popup popup_type_delete">
      <div className="delete__container">
        <h3 className="delete__title">Вы уверены?</h3>
        <button type="button" className="popup__close-form"></button>
        <button type="button" className="delete__submit popup__submit">Да</button>
      </div>
    </section>
  </main>
)}

export default Main
