import * as Yup from 'yup';

export const editProfileSchema = Yup.object({
    username: Yup.string()
        .min(3, 'Минимум 3 символа')
        .max(10, 'Максимум 10 символов')
        .matches(/^[a-zA-Z0-9]+$/, 'Только буквы и цифры')
        .required('Имя обязательно'),

    email: Yup.string()
        .email('Некорректный email')
        .required('Email обязателен'),
});