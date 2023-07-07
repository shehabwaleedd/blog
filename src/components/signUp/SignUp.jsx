import React from 'react'
import './SignUp.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useUserAuth } from '../authContext/AuthContext'
import { useTranslation } from 'react-i18next'
import { FacebookAuthProvider } from "firebase/auth";
import Data from './Data'
import { useEffect } from 'react'
import axios from 'axios'


const SignUp = (Props) => {

    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [agreed, setAgreed] = useState(false)
    const [formErrors, setFormErrors] = useState({});
    const [age, setAge] = useState('')



    const { createUser, signInWithGoogle, signInWithFacebook, signInWithApple } = useUserAuth()

    let navigate = useNavigate()
    const { t } = useTranslation()

    const handleGoogle = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithGoogle(email, password);
            navigate('/')
        } catch (e) {
            setError(e.message);
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await createUser(email, password);
            navigate('/')
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    }

    const handleFacebook = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithFacebook(email, password);
            navigate('/blog')
        } catch (e) {
            setError(e.message);
            console.log(error);
        }
    }

    useEffect(() => {
        // Fetch the country data when the component mounts
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const response = await axios.get('https://restcountries.com/v2/all');
            const countryData = response.data.map((country) => ({
                name: country.name,
                code: country.alpha2Code,
            }));
            setCountries(countryData);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };


    return (
        <section className="signup section">
            <div className="signup__container container">
                <h2 className='section__title'>{t("signup__form__title")}</h2>
                <div className="signup__content">
                    <form className="signup__form" onSubmit={handleSubmit}>
                        <div className="signup__form-container">
                            <div className="signup__user">
                                <input type="email" id="email" name='email' className="login__input-field" placeholder={t("signup__form__email")} value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="text" id="user" name='username' className="login__input-field" placeholder={t("signup__form__username")} value={username} onChange={(e) => setUsername(e.target.value)} />
                                <div className="signup__passwords">
                                    <input type="password" id="password" name='password' className="signup__input-field" placeholder={t("signup__form__password")} value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <input type="password" id="password" name="confirmPassword" className="signup__input-field" placeholder={t("signup__form__password_again")} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <input type="tel" id="phoneNumber" name="phoneNumber" className="signup__input-field" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                <div className="age__country">
                                    <div className="age__gender">
                                        <div className="age__select">
                                            <h3>Gender</h3>
                                            <select
                                                className={`dropdown-select ${formErrors.city ? 'error' : ''}`}
                                                name="gender"
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)} required
                                            >
                                                <option value="" disabled>
                                                    Gender
                                                </option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                            {formErrors.city && <p className="error-message">{formErrors.city}</p>}
                                            <div className="dropdown-icon">▼</div>
                                        </div>
                                    </div>
                                    <div className="age__select">
                                        <h3>Age</h3>
                                        <select
                                            className={`dropdown-select ${formErrors.budget ? "error" : ""}`}
                                            name="age"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)} required
                                        >
                                            <option value="age" disabled>
                                                Age
                                            </option>
                                            {Array.from({ length: 56 }, (_, index) => index + 15).map((value) => (
                                                <option key={value} value={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                        {formErrors.budget && <p className="error-message">{formErrors.budget}</p>}
                                        <div className="dropdown-icon">▼</div>
                                    </div>
                                    <div className="age__country">
                                        <div className="age__select dropdown__country">
                                            <h3>Country</h3>
                                            <select
                                                className={`dropdown-select  ${formErrors.country ? 'error' : ''}`}
                                                name="country"
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)} required
                                            >
                                                <option value="" disabled>
                                                    Select Country
                                                </option>
                                                {countries.map((country) => (
                                                    <option key={country.code} value={country.code}>
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {formErrors.country && <p className="error-message">{formErrors.country}</p>}
                                            <div className="dropdown-icon-country">▼</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="signup__button">
                                <div className="signup__button_manual">
                                    <button type="submit" className="signup__button-sign">
                                        <h3>Register</h3>
                                        <i className="uil uil-arrow-right button__icon-login"></i>
                                    </button>
                                </div>
                                <div className="signup__button_combined">
                                    <div className="signup__button_google">
                                        <button onClick={handleGoogle} className="signup__button-google">
                                            <i className="uil uil-google button__icon-login"></i>
                                            <h3>Google</h3>
                                        </button>
                                    </div>
                                    <div className="signup__button_facebook">
                                        <button onClick={handleFacebook} className="signup__button-facebook">
                                            <i className="uil uil-facebook-f button__icon-login"></i>
                                            <h3>Facebook</h3>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="signup__forgot">
                        <span className="signup__account">{t("signup__form__have_account_already")} <Link className="signup__link" to="/login">{t("signup__form__login")}</Link></span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp


