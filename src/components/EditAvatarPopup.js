import React, { useState } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import PopupWithForm from "./PopupWithForm"
function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const currentUser = React.createContext(CurrentUserContext)
  const [url, setUrl] = useState("")
  const urlRef = React.useRef();
  
  function handleUrlChange(e) {
    setUrl(e.target.value)
  }

  React.useEffect(() => {
    setUrl(currentUser.url)
  }, [currentUser])

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar(urlRef.current.value)
    urlRef.current.value = ""
  } 

  return (
    <PopupWithForm       
      isOpen={isOpen}
      formName='edit'
      title='Обновить аватар'
      buttonName='Сохранить'
      onClose={onClose}
      onSubmit={handleSubmit}> 
      <input type="url" ref={urlRef} value={"" || url} onChange={handleUrlChange} className="avatar__edit avatar__edit_type_url popup__input" name="avatar" placeholder="Ссылка на картинку" required />
      <span className="popup__error" id="avatar__avatar__error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup