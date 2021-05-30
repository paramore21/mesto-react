import {useEffect, useState} from "react";
import {api} from "../utils/api"
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
    .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    api.getUserInformation().then(res => {
      setUserName(res.name)
      setUserDescription(res.about)
      setUserAvatar(res.avatar)
    })
    .catch(err => console.log(err))
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
      {cards.map((card, _id) => (
        <Card
          card={card}
          link={card.link}
          name={card.name}
          likes={card.likes}
          onCardClick={onCardClick}
          key={card._id} 
        />
      ))}
    </section>
  </main>
)}

export default Main
