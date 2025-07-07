import * as Yup from 'yup';

export const registerValidationSchema = Yup.object({
    username: Yup.string()
        .min(3, 'Минимум 3 символа')
        .max(10, 'Максимум 10 символов')
        .matches(/^[a-zA-Z0-9]+$/, 'Только буквы и цифры')
        .required('Имя обязательно'),

    email: Yup.string()
        .email('Некорректный email')
        .required('Email обязателен'),

    password: Yup.string()
        .min(8, 'Пароль должен быть не меньше 8 символов')
        .required('Пароль обязателен'),

    repeat_password: Yup.string()
        .equals([Yup.ref('password'), undefined], 'Пароли должны совпадать')
        .required('Повторите пароль'),
});
