'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const [email, setEmail] = useState('kosseivan@yandex.ru')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailSave = () => {
    setEmailError('')
    setSuccessMessage('')

    if (!validateEmail(email)) {
      setEmailError('Неверный формат email. Используйте формат: xxx@xxx.xx')
      return
    }

    setSuccessMessage('Email успешно сохранен')
  }

  const handlePasswordChange = () => {
    setPasswordError('')
    setSuccessMessage('')

    if (!oldPassword || !newPassword || !repeatPassword) {
      setPasswordError('Заполните все поля')
      return
    }

    // Validate old password (in real app, check against backend)
    if (oldPassword !== 'correctPassword') {
      setPasswordError('Старый пароль введен неверно, попробуйте снова')
      return
    }

    if (newPassword !== repeatPassword) {
      setPasswordError('Пароли не совпадают, попробуйте снова')
      return
    }

    setSuccessMessage('Пароль успешно изменен')
    setOldPassword('')
    setNewPassword('')
    setRepeatPassword('')
  }

  const handleLogout = () => {
    router.push('/auth')
  }

  return (
    <div className="min-h-screen bg-[#f4f9fd] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm fixed h-full">
        <nav className="py-8">
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-6 py-3 text-left bg-gray-100 border-l-4 border-indigo-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="font-medium">Профиль</span>
            </button>
            
            <button
              onClick={() => router.push('/users')}
              className="w-full flex items-center gap-3 px-6 py-3 text-left text-gray-600 hover:bg-gray-50"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>Пользователи</span>
            </button>
            
            <button
              onClick={() => router.push('/groups')}
              className="w-full flex items-center gap-3 px-6 py-3 text-left text-gray-600 hover:bg-gray-50"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
              </svg>
              <span>Группы</span>
            </button>
            
            <button
              onClick={() => router.push('/gifts')}
              className="w-full flex items-center gap-3 px-6 py-3 text-left text-gray-600 hover:bg-gray-50"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
              <span>Подарки</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-6 py-3 text-left text-gray-600 hover:bg-gray-50">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 2v2m6-2v2M4 6h16M5 10h14v10H5V10z" />
              </svg>
              <span>Заказы</span>
            </button>
            
            <button
              onClick={() => router.push('/orders')}
              className="w-full flex items-center gap-3 px-6 py-3 text-left text-gray-600 hover:bg-gray-50"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 2v2m6-2v2M4 6h16M5 10h14v10H5V10z" />
              </svg>
              <span>Заказы</span>
            </button>

            <button
              onClick={() => router.push('/history')}
              className="w-full flex items-center gap-3 px-6 py-3 text-left text-gray-600 hover:bg-gray-50"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span>История</span>
            </button>
          </div>
        </nav>
        
        <div className="absolute bottom-8 left-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            <span>Выйти</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-8">Профиль</h1>

          {/* Basic Information Section */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Основная информация</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Логин</label>
                <input
                  type="text"
                  value="admin"
                  disabled
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {emailError && (
              <div className="text-red-500 text-sm mb-4">{emailError}</div>
            )}

            <button
              onClick={handleEmailSave}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Сохранить
            </button>
          </div>

          {/* Password Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Пароль</h2>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Старый пароль</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••••••"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-2">Новый пароль</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••••••"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-2">Повторите новый пароль</label>
                <input
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {passwordError && (
              <div className="text-red-500 text-sm mb-4">{passwordError}</div>
            )}
            
            {successMessage && (
              <div className="text-green-600 text-sm mb-4">{successMessage}</div>
            )}

            <button
              onClick={handlePasswordChange}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Сохранить
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
