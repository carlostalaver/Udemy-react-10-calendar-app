import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogin, startRegister } from '../../actions/auht';
import { useForm } from '../../hooks/useForm';
import Swal  from 'sweetalert2';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const [ formLoginValues, handleLoginInputChange, reset ] = useForm({   
        loginEmail: 'carlos2@email.com',
        loginPassword: '123456'
    });

    const [ formRegisterValues, handleRegisterInputChange, registerReset ] = useForm( {   
        registerName: 'Cart',
        registerEmail: 'carlos3@email.com',
        registerPassword: '123456',
        registerPassword2: '123456'
    } );

    const { loginEmail, loginPassword } = formLoginValues;
    const { registerName, registerEmail, registerPassword, registerPassword2 } = formRegisterValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch( startLogin(loginEmail, loginPassword) );
    }

    const handleRegister = (e) => {
        e.preventDefault();

        if( registerPassword !== registerPassword2) {
            return Swal.fire('Error', 'Las cantraseñas deben ser iguales', 'error');
        }

        dispatch( startRegister(registerEmail, registerPassword, registerName));
    }
    
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name = 'registerName'
                                value = { registerName }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name = 'registerEmail'
                                value = { registerEmail }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name = 'registerPassword'
                                value = { registerPassword }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name = 'registerPassword2'
                                value = { registerPassword2 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}