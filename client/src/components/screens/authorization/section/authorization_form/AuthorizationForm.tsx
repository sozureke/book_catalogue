import Heading from '@/components/shared/heading/Heading'
import Input from '@/components/shared/input/Input'
import Button from '@/components/ui/button/Button'
import React, { useState } from 'react'
import './authorization.component.scss'
import { AuthorizationFormProps } from './authorization_form.types'

const AuthorizationForm: React.FC<AuthorizationFormProps> = ({
  paragraph_text,
  isLogin: initialIsLogin = true
}) => {
  const [isLogin, setIsLogin] = useState(initialIsLogin)

  const toggleForm = () => {
    setIsLogin(!isLogin)
  }

  return (
    <section className="authorization">
      <form method="post" className="authorization_form">
        <div className="form_text_container">
          <Heading
            level="h2"
            text={isLogin ? 'Log in' : 'Sign up'}
            className="heading-h2"
          />
          <p className="container_text">{paragraph_text}</p>
        </div>

        <div className="input_container">
          <div className="user_information_container">
            {!isLogin && <Input inputType="text" placeholder="Name" />}
            {!isLogin && <Input inputType="text" placeholder="Surname" />}
          </div>
          <Input inputType="text" placeholder="Email" />
          <Input inputType="password" placeholder="Password" />
        </div>

        <div className="button_container">
          <Button
            text={isLogin ? 'Log in' : 'Sign up'}
            className="authorization_button"
          />

          {isLogin ? (
            <p>
              Don’t have an account?{' '}
              <span className="toggle_button" onClick={toggleForm}>
                Register now!
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span className="toggle_button" onClick={toggleForm}>
                Log in here!
              </span>
            </p>
          )}
        </div>
      </form>

      <div className="authorization_video"></div>
    </section>
  )
}

export default AuthorizationForm
