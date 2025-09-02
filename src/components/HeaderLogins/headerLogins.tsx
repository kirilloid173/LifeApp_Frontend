import './style.scss';
import { useSearchPopupStore } from '../../stores/searchUsers';
function HeaderLoginsResult() {
    const resultUsers = useSearchPopupStore((state) => state.resultUsers);

    return (
        <>
            {resultUsers[0].defaultValue === 'notFound' ? (
                <div className='result-logins'>
                    <div className='result-logins__login-result'>
                        <p>Пользователи не найдены</p>
                    </div>
                </div>
            ) : null}

            {resultUsers.length && !resultUsers[0].defaultValue ? (
                <div className='result-logins'>
                    {resultUsers.map((item, index) => (
                        <div
                            key={index}
                            className='result-logins__login-result'
                        >
                            <p className='login-result__name text-hover'>
                                {item.login}
                            </p>
                        </div>
                    ))}
                </div>
            ) : null}
        </>
    );
}

export { HeaderLoginsResult };
