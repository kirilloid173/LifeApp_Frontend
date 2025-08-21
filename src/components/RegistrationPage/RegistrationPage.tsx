import { useState } from 'react';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import './style.scss';
export default function RegistrationPage() {
    type TypeNameForm = 'reg' | 'login';
    const [typeForm, setTypeForm] = useState<TypeNameForm>('reg');

    if (typeForm === 'reg') return <RegistrationForm />;
    if (typeForm === 'login') return <LoginForm />;
}
