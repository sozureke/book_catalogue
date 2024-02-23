import React from 'react'
import AuthorizationForm from './section/authorization_form/authorizationForm'

const Authorization: React.FC = () => {
  return (
    <>
      <AuthorizationForm
        isLogin
        paragraph_text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      />
    </>
  )
}

export default Authorization
