import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './styles/AccountModal.scss';
import { ProfileInfo } from './ProfileInfo';
import { loginUser, registerUser, updateUserPassword } from '../services/authService';

// 🔥 AUTH CONTEXT
import { useAuth } from '../context/authContext';

export const AccountModal = ({ isVisible, onClose }) => {

  // ========================
  // 🔐 AUTH CONTEXT
  // ========================
  const { user, isAuthenticated, login, logout } = useAuth();

  // ========================
  // UI STATES
  // ========================
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [tempValues, setTempValues] = useState({});

  const [editingFields, setEditingFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });

  const { register, handleSubmit, formState: { errors } } = useForm();

  // ========================
  // UI HEIGHT CONTROL
  // ========================
  useEffect(() => {

    const contentElement = document.querySelector('.account-modal__content');

    if (contentElement) {

      const getHeight = () => {
        if (isSignUp) return '80vh';
        if (isAuthenticated) return '90vh';
        if (showProfile) return '80vh';
        return '60vh';
      };

      contentElement.style.setProperty('--content-height', getHeight());
    }

  }, [isSignUp, isAuthenticated, showProfile]);

  // ========================
  // LOGIN
  // ========================
  const handleLoginClick = async (data) => {
    try {
      const result = await loginUser(data);

      if (!result?.token) throw new Error('Token missing');

      login(result.token); // 🔥 AUTH CONTEXT

      setIsSignUp(false);
      setIsForgotPassword(false);

    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // ========================
  // REGISTER + AUTO LOGIN
  // ========================
  const handleRegister = async (data) => {
    try {
      await registerUser(data);

      const loginResult = await loginUser({
        email: data.email,
        password: data.password
      });

      if (!loginResult?.token) throw new Error('Token missing');

      login(loginResult.token); // 🔥 AUTH CONTEXT

      setIsSignUp(false);
      setIsForgotPassword(false);

      console.log('Usuario registrado y logueado');

    } catch (error) {
      console.error('Register error:', error);
    }
  };

  // ========================
  // PASSWORD UPDATE
  // ========================
  const updatePassword = async (newPassword) => {
    try {
      await updateUserPassword({
        userId: user.id,
        password: newPassword
      });
    } catch (error) {
      console.error(error);
    }
  };

  // ========================
  // LOGOUT
  // ========================
  const handleLogoutClick = () => {
    logout(); // 🔥 AUTH CONTEXT

    setShowProfile(false);
    setIsSignUp(false);
    setIsForgotPassword(false);
  };

  // ========================
  // UI HANDLERS
  // ========================
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

    setEditingFields((prev) => ({
      ...prev,
      [field]: false
    }));
  };

  const handleCancelClick = (field) => {
    setEditingFields((prev) => ({
      ...prev,
      [field]: false
    }));
  };

  // ========================
  // RENDER
  // ========================
  return (
    <div className={`account-modal__overlay ${isVisible ? 'show' : ''}`}>

      <div className='account-modal__content'>

        <div className='account-modal__close-wrapper'>
          <button className='account-modal__close-button' onClick={onClose}>
            X
          </button>
        </div>

        {/* ========================
            LOGGED IN
        ======================== */}
        {isAuthenticated ? (

          showProfile ? (

            <>
              <div className='account-modal__title'>
                <h2>Tu perfil</h2>
              </div>

              <ProfileInfo
                decodedToken={user}
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
                <h2>Bienvenido, {user?.first_name || 'Usuario'}</h2>
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
                {...register('firstName', { required: true })}
              />
              {errors.firstName && <p>Error</p>}

              <input
                placeholder='Apellido'
                {...register('lastName', { required: true })}
              />

              <input
                placeholder='Email'
                {...register('email', { required: true })}
              />

              <input
                placeholder='Contraseña'
                type='password'
                {...register('password', { required: true })}
              />

              <button type="submit">Registrar</button>

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
                {...register('email', { required: true })}
              />

              <input
                placeholder='Contraseña'
                type='password'
                {...register('password', { required: true })}
              />

              <button onClick={handleSubmit(handleLoginClick)}>
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