import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';
import './styles/AccountModal.scss';
import { ProfileInfo } from './ProfileInfo';

export const AccountModal = ({ isVisible, onClose }) => {

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [decodedToken, setDecodedToken] = useState(null);
  const [userName, setUserName] = useState(undefined);

  const [tempValues, setTempValues] = useState({});

  const [editingFields, setEditingFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      try {

        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp > currentTime) {

          setIsLoggedIn(true);
          setUserName(decoded.first_name);
          setDecodedToken(decoded);

        } else {

          localStorage.removeItem('jwt');
          setIsLoggedIn(false);

        }

      } catch (error) {

        localStorage.removeItem('jwt');

      }
    }

  }, []);

  useEffect(() => {

    const contentElement = document.querySelector('.account-modal__content');

    if (contentElement) {

      const getHeight = () => {

        if (isSignUp) return '80vh';
        if (isLoggedIn) return '90vh';
        if (showProfile) return '80vh';

        return '60vh';

      };

      contentElement.style.setProperty('--content-height', getHeight());

    }

  }, [isSignUp, isLoggedIn, showProfile]);

  const handleForgotPasswordClick = () => {

    setIsForgotPassword(true);
    setIsSignUp(false);

  };

  const handleBackToLoginClick = () => {

    setIsForgotPassword(false);
    setIsSignUp(false);

  };

  const handleSignUpClick = () => {

    setIsSignUp(true);
    setIsForgotPassword(false);

  };

  const handleLoginClick = async (data) => {

    try {

      const response = await fetch('http://localhost:3000/auth/login', {

        method: 'POST',

        headers: {

          'Content-Type': 'application/json',

        },

        body: JSON.stringify(data),

      });

      const result = await response.json();

      if (response.ok) {

        localStorage.setItem('jwt', result.token);

        setIsLoggedIn(true);

        const decoded = jwtDecode(result.token);

        setUserName(decoded.first_name);
        setDecodedToken(decoded);

      }

    } catch (error) {

      console.error('Error:', error);

    }

  };

  const handleRegister = async (data) => {

    try {

      const response = await fetch('http://localhost:3000/users', {

        method: 'POST',

        headers: {

          'Content-Type': 'application/json',

        },

        body: JSON.stringify(data)

      });

      if (response.ok) {

        console.log('Usuario registrado');

      }

    } catch (error) {

      console.error('Error:', error);

    }

  };

  const updatePassword = async (newPassword) => {

  const token = localStorage.getItem('jwt');
  const decoded = jwtDecode(token);

  const userId = decoded.id;

  console.log(userId)

  try {

    const response = await fetch('http://localhost:3000/users/password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        password: newPassword
      })
    });

    const data = await response.json();


  } catch (error) {
    console.error(error);
  }
};

  const handleLogoutClick = () => {

    localStorage.removeItem('jwt');

    setIsLoggedIn(false);
    setUserName(undefined);
    setDecodedToken(null);

  };

  const handleViewProfileClick = () => {

    setShowProfile(true);

  };

  const handleBackToMenuClick = () => {

    setShowProfile(false);

  };

  const handleEditClick = (field) => {

    setEditingFields((prev) => ({

      ...prev,
      [field]: !prev[field],

    }));

  };

  const handleFieldChange = (field, value) => {

    setTempValues((prev) => ({

      ...prev,
      [field]: value

    }));

  };

  const handleSaveClick = (field) => {

    if (field === 'password') {

      updatePassword(tempValues.password);

    }

    console.log(`Guardando cambios para ${field}:`, tempValues[field]);

    setEditingFields((prev) => ({

      ...prev,
      [field]: false

    }));

  };

  const handleCancelClick = (field) => {

    console.log(`Cancelando cambios para ${field}`);

    setEditingFields((prev) => ({

      ...prev,
      [field]: false

    }));

  };

  return (

    <div className={`account-modal__overlay ${isVisible ? 'show' : ''}`}>

      <div className='account-modal__content'>

        <div className='account-modal__close-wrapper'>

          <button
            className='account-modal__close-button'
            onClick={onClose}
          >
            X
          </button>

        </div>

        {isLoggedIn ? (

          showProfile ? (

            <>

              <div className='account-modal__title'>

                <h2>Tu perfil</h2>

              </div>

              <ProfileInfo
                decodedToken={decodedToken}
                editingFields={editingFields}
                handleFieldChange={handleFieldChange}
                handleEditClick={handleEditClick}
                handleSaveClick={handleSaveClick}
                handleCancelClick={handleCancelClick}
                handleBackToMenuClick={handleBackToMenuClick}
              />

            </>

          ) : (

            <>

              <div className='account-modal__title'>

                <h2>Bienvenido, {userName || 'Usuario'}</h2>

              </div>

              <div className='account-modal__menu'>

                <h2 onClick={handleViewProfileClick}>Tu perfil</h2>
                <h2>Tus pedidos</h2>
                <h2>Promociones</h2>
                <h2>Direcciones y pagos</h2>

                <button
                  className='account-modal__log-out-button'
                  onClick={handleLogoutClick}
                >
                  Cerrar sesión
                </button>

              </div>

            </>

          )

        ) : isForgotPassword ? (

          <>
            <div className='account-modal__title'>
              <h2>Recupera tu contraseña</h2>
            </div>

            <div className='account-modal__input-wrapper'>
              <input placeholder='Email' type='email' />
              <button>Enviar correo</button>
              <label onClick={handleBackToLoginClick}>
                Volver a iniciar sesión
              </label>
            </div>
          </>

        ) : isSignUp ? (

          <>
            <div className='account-modal__title'>
              <h2>Crea tu cuenta</h2>
            </div>

            <form
              onSubmit={handleSubmit(handleRegister)}
              className="account-modal__input-wrapper"
            >

              <input
                placeholder='Nombre'
                type='text'
                {...register('firstName', { required: 'Este campo es obligatorio' })}
              />

              {errors.firstName && <p className='error'>{errors.firstName.message}</p>}

              <input
                placeholder='Apellido'
                type='text'
                {...register('lastName', { required: 'Este campo es obligatorio' })}
              />

              {errors.lastName && <p className='error'>{errors.lastName.message}</p>}

              <input
                placeholder='Email'
                type='email'
                {...register('email', {
                  required: 'Este campo es obligatorio',
                  pattern: {
                    value: /^[^@]+@[^@]+\.[^@]+$/,
                    message: 'Email no válido'
                  },
                })}
              />

              {errors.email && <p className='error'>{errors.email.message}</p>}

              <input
                placeholder='Contraseña'
                type='password'
                {...register('password', { required: 'Este campo es obligatorio' })}
              />

              {errors.password && <p className='error'>{errors.password.message}</p>}

              <button type="submit">
                Registrar
              </button>

              <label onClick={handleBackToLoginClick}>
                Volver a iniciar sesión
              </label>

            </form>

          </>

        ) : (

          <>
            <div className='account-modal__title'>
              <h2>Entra a tu cuenta</h2>
            </div>

            <div className='account-modal__input-wrapper'>

              <input
                placeholder='Email'
                type='email'
                {...register('email', { required: 'Este campo es obligatorio' })}
              />

              <input
                placeholder='Contraseña'
                type='password'
                {...register('password', { required: 'Este campo es obligatorio' })}
              />

              <button
                type="submit"
                onClick={handleSubmit(handleLoginClick)}
              >
                Entrar
              </button>

              <label onClick={handleForgotPasswordClick}>
                ¿Olvidaste contraseña?
              </label>

              <label onClick={handleSignUpClick}>
                Crear cuenta
              </label>

            </div>
          </>

        )}

      </div>

    </div>

  );

};
