// app/register/page.tsx
import AcmeLogo from "../ui/acme-logo";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <AcmeLogo />
          <h1 className="text-2xl font-bold mt-4">Создать аккаунт</h1>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Уже есть аккаунт? <a href="/login" className="text-blue-600 hover:underline">Войти</a>
        </p>
      </div>
    </main>
  );
}
