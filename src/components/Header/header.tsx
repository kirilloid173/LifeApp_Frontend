import './style.scss';

export default function Header() {
    return (
        <div className='header'>
            <div className='header__inner-block'>
                <h1 className='header__name-app'>LifeApp</h1>
            </div>
            <div className='header__outter-block'>
                <p>Здравствуйте {null}</p>
                <p>Выйти</p>
            </div>
        </div>
    );
}
