import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUser, getLoading } from "../features/auth/authSlice";
import { editProfileSchema } from "../validators/profileEditSchema";
import * as Yup from "yup";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "../features/user/userService";
import LoadingSpinner from "../components/LodaingSpinner";

export function EditProfile() {
  const isLoading = useSelector(getLoading);
  const user = useSelector(getUser);
  const [editProfile] = useEditProfileMutation();
  const [updateAvatar] = useUpdateAvatarMutation();

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl || "");
  const [errorMessage, setErrorMessage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
    setErrorMessage("");
    try {
      editProfileSchema.validateSync(
        { username, email },
        { abortEarly: false }
      );
      setErrors({});
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        let newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
    }
  }, [username, email]);

  if (isLoading) return <LoadingSpinner />;

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await editProfileSchema
        .validate({
          username,
          email,
        })
        .unwrap();
      await editProfile({ username, email }).unwrap();
      setErrorMessage(null);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        let newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        setErrorMessage("Не удалось сохранить изменения");
      }
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target?.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);
    updateAvatar(formData)
      .unwrap()
      .catch(() => {
        setErrorMessage("Не удалось загрузить аватар");
      });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Редактировать профиль</h1>

      {errorMessage && (
        <div className="flex w-fit text-red-400 m-10">{errorMessage}</div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            {!avatarPreview && user.avatarUrl == null ? (
              <div className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 bg-blue-300 flex justify-around font-semibold text-blue-950 text-7xl select-none">
                {user.username[0].toUpperCase()}
              </div>
            ) : (
              <img
                src={avatarPreview || "/avatars/" + user.avatarUrl}
                alt="Аватар"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              />
            )}
          </div>
          <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm">
            Изменить
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Форма */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Имя пользователя
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && (
              <div className="text-sm font-semibold text-red-500">
                {errors.username}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <div className="text-sm font-semibold text-red-500">
                {errors.email}
              </div>
            )}
          </div>

          <button
            onClick={handleSave}
            disabled={isLoading || Object.keys(errors).length != 0}
            className="mt-4 disabled:bg-gray-500 disabled:hover:bg-gray-600 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition cursor-pointer"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
