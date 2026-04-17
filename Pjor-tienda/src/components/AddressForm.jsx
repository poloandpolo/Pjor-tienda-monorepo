import React from 'react';
import { useForm } from 'react-hook-form';
import './styles/AddressForm.scss';
import { useMenPageContext } from '../context/MenPageContext';
import { createAddress } from '../services/addressService'; // ✅ NUEVO

export const AddressForm = ({ onSubmit, modalOpen, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { fetchAddresses } = useMenPageContext();

  const onFormSubmit = async (data) => {
    try {
      console.log(localStorage.getItem('jwt'));

      // ✅ USAR SERVICE EN LUGAR DE FETCH
      const result = await createAddress({
        first_name: data.firstName,
        last_name: data.lastName,
        address: data.address,
        city: data.city,
        state: data.state,
        postal_code: data.zipCode,
        phone: data.phone,
      });

      // Llamamos a fetchAddresses para obtener las nuevas direcciones
      await fetchAddresses();

      // Llamamos a onSubmit con el resultado después de actualizar las direcciones
      onSubmit(result);
      closeModal();

    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
      console.log(modalOpen)
    }
  };

  const handleCloseClick = () => {
    closeModal();
    console.log(modalOpen)
  };

  return (
    <div
      className={`address-form__overlay${modalOpen ? ' --show' : ''}`}
      onClick={handleOverlayClick}
    >
      <form className="address-form" onSubmit={handleSubmit(onFormSubmit)} onClick={(e) => e.stopPropagation()} >
        <div className="address-form__close-wrapper">
          <button
            type="button"
            className="address-form__close-button"
            onClick={handleCloseClick}
          >
            X
          </button>
        </div>

        <h2>Dirección de Envío</h2>

        <div className="address-form__name-wrapper">
          <div className="address-form__name">
            <input
              type="text"
              id="firstName"
              placeholder="Nombre"
              {...register('firstName', { required: 'El nombre es obligatorio' })}
            />
            {errors.firstName && <p className="address-form__error">{errors.firstName.message}</p>}
          </div>

          <div className="address-form__lastname">
            <input
              type="text"
              id="lastName"
              placeholder="Apellido"
              {...register('lastName', { required: 'El apellido es obligatorio' })}
            />
            {errors.lastName && <p className="address-form__error">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="address-form__group">
          <input
            type="text"
            id="address"
            placeholder="Dirección"
            {...register('address', { required: 'La dirección es obligatoria' })}
          />
          {errors.address && <p className="address-form__error">{errors.address.message}</p>}
        </div>

        <div className="address-form__city-details">
          <div className="address-form__city-details-wrapper">
            <input
              type="text"
              id="city"
              placeholder="Ciudad"
              {...register('city', { required: 'La ciudad es obligatoria' })}
            />
            {errors.city && <p className="address-form__error">{errors.city.message}</p>}
          </div>

          <div className="address-form__city-details-wrapper">
            <input
              type="text"
              id="state"
              placeholder="Estado"
              {...register('state', { required: 'El estado es obligatorio' })}
            />
            {errors.state && <p className="address-form__error">{errors.state.message}</p>}
          </div>

          <div className="address-form__city-details-wrapper">
            <input
              type="text"
              id="zipCode"
              placeholder="Código Postal"
              {...register('zipCode', {
                required: 'El código postal es obligatorio',
                pattern: { value: /^\d{5}$/, message: 'Debe ser un código postal válido (5 dígitos)' },
              })}
            />
            {errors.zipCode && <p className="address-form__error">{errors.zipCode.message}</p>}
          </div>
        </div>

        <div className="address-form__group">
          <input
            type="text"
            id="phone"
            placeholder="Teléfono"
            {...register('phone', {
              required: 'El teléfono es obligatorio',
              pattern: { value: /^\d{10}$/, message: 'Debe ser un número de teléfono válido (10 dígitos)' },
            })}
          />
          {errors.phone && <p className="address-form__error">{errors.phone.message}</p>}
        </div>

        <button type="submit" className="address-form__submit">
          Guardar Dirección
        </button>
      </form>
    </div>
  );
};