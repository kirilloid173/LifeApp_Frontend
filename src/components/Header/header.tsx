import './style.scss';
import { useStatusAuthStore } from '../../stores/statusAuth';

export default function Header() {
    const changeStatusAuthStore = useStatusAuthStore(
        (state) => state.changeStatusAuth
    );

    const removeAuthUser = () => {
        fetch('/api/deleteTokenAuth/', {
            method: 'POST',
            credentials: 'include',
        }).then(async (res) => {
            const data = await res.json();
            if (res.ok && data.statusDeleted) {
                changeStatusAuthStore('notIsAuth');
            }
        });
    };
    return (
        <div className='header'>
            <div className='header__inner-block'>
                <h1 className='header__name-app'>LifeApp</h1>
            </div>
            <div className='header__outter-block'>
                <p>Здравствуйте {null}</p>
                <p className='header__exit' onClick={() => removeAuthUser()}>
                    Выйти
                </p>
            </div>
        </div>
    );
}
