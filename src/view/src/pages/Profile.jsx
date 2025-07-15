import { useParams, useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../features/user/userService";

export function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetUserByIdQuery(Number(id));

  if (isLoading) return <>Загрузка</>;
  if (error) return <>Непредвиденная ошибка</>;
  if (!data) return navigate("/404");

  const user = data;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-6 mb-6">
          {user.avatarUrl != null ? (
            <img
              src={user.avatarUrl || "https://via.placeholder.com/100 "}
              alt="Аватар"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
          ) : (
            <div className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 flex justify-around bg-blue-300 text-blue-950 font-semibold text-7xl select-none">
              {user.username[0].toUpperCase()}
            </div>
          )}

          <div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-gray-600">{user.email}</p>
            {user.isAdmin && (
              <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                Администратор
              </span>
            )}
          </div>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold mb-2">Информация о профиле</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
            <div>
              <dt className="text-sm text-gray-500">ID пользователя</dt>
              <dd className="text-md">{user.id}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Email подтверждён</dt>
              <dd className="text-md">
                {user.emailValidated ? (
                  <span className="text-green-500">Да</span>
                ) : (
                  <span className="text-red-500">Нет</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Дата регистрации</dt>
              <dd className="text-md">
                {new Date(user.createdAt).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
