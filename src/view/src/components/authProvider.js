import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRefreshQuery } from '../features/auth/authService';
import { setUser, setAuth, setLoading } from '../features/auth/authSlice';
import { jwtDecode } from 'jwt-decode';

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useRefreshQuery();

    useEffect(() => {
        if (!isLoading) {
            if (data?.token) {
                try {
                    const user = jwtDecode(data.accessToken);
                    dispatch(setUser(user));
                    dispatch(setAuth(true));
                } catch (e) {
                    console.error('Ошибка парсинга токена', e);
                    dispatch(setUser(null));
                    dispatch(setAuth(false));
                }
            } else {
                dispatch(setUser(null));
                dispatch(setAuth(false));
            }
            dispatch(setLoading(false));
        }
    }, [data, isLoading, error, dispatch]);

    // if (isLoading) {
    //     return <div>Загрузка...</div>;
    // }

    return <>{children}</>;
};

export default AuthProvider;