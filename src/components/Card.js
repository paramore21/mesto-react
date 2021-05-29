function Card({card, link, name, likes, onCardClick}) {
  const handleCardClick = () => {
    onCardClick({name, link, isOpen: true})
  }

  return (
    <div className="element">
      <img className="element__image" src={link} alt={name} onClick={handleCardClick}/>
      <button type="button" className="element__delete"></button>
      <h2 className="element__title">{card.name}</h2>
      <div className="element__likes">
        <button type="button" className="element__like-button"></button>
        <p className="element__like-count">{likes.length}</p>
      </div>  
    </div>
  )
}

export default Card