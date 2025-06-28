import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetMeQuery } from '../features/auth/authService';
import { setUser, setAuth, setLoading } from '../features/auth/authSlice';

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useGetMeQuery();

    useEffect(() => {
        console.log(isLoading, data, error);
        if (!isLoading) {
            if (!error && data) {
                const user = data;
                dispatch(setUser(user));
                dispatch(setAuth(true));
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