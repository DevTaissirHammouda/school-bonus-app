'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Types
type UserRole = 'Ученик' | 'Преподаватель'

interface User {
  id: number
  login: string
  fullName: string
  firstName: string
  lastName: string
  middleName?: string
  email: string
  birthDate: string
  role: UserRole
  algocoins: number
}

// Mock data
const initialUsers: User[] = [
  { 
    id: 1,
    login: 'SMYLAI',
    firstName: 'мохаммед салим',
    lastName: 'Буссаид',
    middleName: 'салим',
    fullName: 'Буссаид мохаммед салим  ',
    email: 'salimboussaid@mail.ru',
    birthDate: '12.09.2002',
    role: 'Ученик',
    algocoins: 23,
  },
  {
    id: 2,
    login: 'SMYLAI',
    firstName: 'мохаммед ',
    lastName: 'Буссаид',
    middleName: 'салим',
    fullName: 'Буссаид мохаммед салим  ',
    email: 'salimboussaid@mail.ru',
    birthDate: '12.09.2002',
    role: 'Ученик',
    algocoins: 23,
  },
  {
    id: 3,
    login: 'SMYLAI',
    firstName: 'мохаммед салим',
    lastName: 'Буссаид',
    middleName: 'салим',
    fullName: 'Буссаид мохаммед салим  ',
    email: 'salimboussaid@mail.ru',
    birthDate: '12.09.2002',
    role: 'Ученик',
    algocoins: 23,
  },
  {
    id: 4,
    login: 'SMYLAI',
    firstName: 'мохаммед салим',
    lastName: 'Буссаид',
    middleName: 'салим',
    fullName: 'Буссаид мохаммед салим  ',
    email: 'salimboussaid@mail.ru',
    birthDate: '12.09.2002',
    role: 'Ученик',
    algocoins: 23,
  },
  {
    id: 5,
    login: 'SMYLAI',
    firstName: 'мохаммед салим',
    lastName: 'Буссаид',
    middleName: 'салим',
    fullName: 'Буссаид мохаммед салим  ',
    email: 'salimboussaid@mail.ru',
    birthDate: '12.09.2002',
    role: 'Ученик',
    algocoins: 23,
  },
]

export default function UsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'students' | 'teachers'>('students')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'date'>('name')

  // Form states for Create User
  const [newUser, setNewUser] = useState({
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    middleName: '',
    role: 'Ученик' as UserRole,
    email: '',
    birthDate: '',
  })

  // Form states for Edit User (no password)
  const [editUser, setEditUser] = useState({
    login: '',
    firstName: '',
    lastName: '',
    middleName: '',
    role: 'Ученик' as UserRole,
    email: '',
    birthDate: '',
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Validations
  const validateLogin = (login: string): string | null => {
    if (!login) return 'Логин обязателен'
    if (!/^[a-zA-Z0-9]+$/.test(login)) {
      return 'Логин может содержать только латинские буквы и цифры'
    }
    const loginExists = users.some(u => u.login === login && u.id !== selectedUser?.id)
    if (loginExists) return 'Логин уже занят'
    return null
  }

  const validateName = (name: string, fieldName: string): string | null => {
    if (!name) return `${fieldName} обязательно`
    if (!/^[а-яА-ЯёЁa-zA-Z]+$/.test(name)) {
      return `${fieldName} может содержать только буквы`
    }
    return null
  }

  const validateEmail = (email: string): string | null => {
    if (!email) return 'Email обязателен'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Неверный формат email'
    }
    const emailExists = users.some(u => u.email === email && u.id !== selectedUser?.id)
    if (emailExists) return 'Email уже занят'
    return null
  }

  const validatePassword = (password: string): string | null => {
    if (!password) return 'Пароль обязателен'
    if (password.length < 4) {
      return 'Пароль должен содержать минимум 4 символа'
    }
    return null
  }

  const validateBirthDate = (date: string): string | null => {
    if (!date) return 'Дата рождения обязательна'
    // Simple date format validation (DD.MM.YYYY)
    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
      return 'Формат даты: ДД.МА.ГГГГ'
    }
    return null
  }

  const handleCreateUser = () => {
    const newErrors: { [key: string]: string } = {}

    const loginError = validateLogin(newUser.login)
    if (loginError) newErrors.login = loginError

    const passwordError = validatePassword(newUser.password)
    if (passwordError) newErrors.password = passwordError

    const firstNameError = validateName(newUser.firstName, 'Имя')
    if (firstNameError) newErrors.firstName = firstNameError

    const lastNameError = validateName(newUser.lastName, 'Фамилия')
    if (lastNameError) newErrors.lastName = lastNameError

    if (newUser.middleName) {
      const middleNameError = validateName(newUser.middleName, 'Отчество')
      if (middleNameError) newErrors.middleName = middleNameError
    }

    const emailError = validateEmail(newUser.email)
    if (emailError) newErrors.email = emailError

    const birthDateError = validateBirthDate(newUser.birthDate)
    if (birthDateError) newErrors.birthDate = birthDateError

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Create new user
    const user: User = {
      id: users.length + 1,
      login: newUser.login,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      middleName: newUser.middleName,
      fullName: `${newUser.lastName} ${newUser.firstName}${newUser.middleName ? ' ' + newUser.middleName : ''}`,
      email: newUser.email,
      birthDate: newUser.birthDate,
      role: newUser.role,
      algocoins: 0,
    }

    setUsers([...users, user])
    setShowCreateModal(false)
    setNewUser({
      login: '',
      password: '',
      firstName: '',
      lastName: '',
      middleName: '',
      role: 'Ученик',
      email: '',
      birthDate: '',
    })
    setErrors({})
  }

  const handleEditUser = () => {
    if (!selectedUser) return

    const newErrors: { [key: string]: string } = {}

    const loginError = validateLogin(editUser.login)
    if (loginError) newErrors.login = loginError

    const firstNameError = validateName(editUser.firstName, 'Имя')
    if (firstNameError) newErrors.firstName = firstNameError

    const lastNameError = validateName(editUser.lastName, 'Фамилия')
    if (lastNameError) newErrors.lastName = lastNameError

    if (editUser.middleName) {
      const middleNameError = validateName(editUser.middleName, 'Отчество')
      if (middleNameError) newErrors.middleName = middleNameError
    }

    const emailError = validateEmail(editUser.email)
    if (emailError) newErrors.email = emailError

    const birthDateError = validateBirthDate(editUser.birthDate)
    if (birthDateError) newErrors.birthDate = birthDateError

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Update user
    const updatedUsers = users.map(u =>
      u.id === selectedUser.id
        ? {
            ...u,
            login: editUser.login,
            firstName: editUser.firstName,
            lastName: editUser.lastName,
            middleName: editUser.middleName,
            fullName: `${editUser.lastName} ${editUser.firstName}${editUser.middleName ? ' ' + editUser.middleName : ''}`,
            email: editUser.email,
            birthDate: editUser.birthDate,
            role: editUser.role,
          }
        : u
    )

    setUsers(updatedUsers)
    setShowEditModal(false)
    setSelectedUser(null)
    setErrors({})
  }

  const handleDeleteUser = () => {
    if (!selectedUser) return
    setUsers(users.filter(u => u.id !== selectedUser.id))
    setShowDeleteModal(false)
    setSelectedUser(null)
  }

  const openEditModal = (user: User) => {
    setSelectedUser(user)
    setEditUser({
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName || '',
      role: user.role,
      email: user.email,
      birthDate: user.birthDate,
    })
    setErrors({})
    setShowEditModal(true)
    setShowUserMenu(null)
  }

  const openDeleteModal = (user: User) => {
    setSelectedUser(user)
    setShowDeleteModal(true)
    setShowUserMenu(null)
  }

  // Filter and sort users
  const filteredUsers = users
    .filter(u => u.role === (activeTab === 'students' ? 'Ученик' : 'Преподаватель'))
    .filter(u =>
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.login.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.fullName.localeCompare(b.fullName, 'ru')
      }
      return a.id - b.id // sort by date added (using id as proxy)
    })

  return (
    <div className="min-h-screen bg-[#f4f9fd] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm fixed h-full">
        <nav className="py-8">
          <div className="space-y-2">
            <button
              onClick={() => router.push('/profile')}
              className="w-full flex items-center gap-3 px-6 py-3 text-left text-gray-600 hover:bg-gray-50"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Профиль</span>
            </button>

            <button className="w-full flex items-center gap-3 px-6 py-3 text-left bg-gray-100 border-l-4 border-indigo-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className="font-medium">Пользователи</span>
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
            onClick={() => router.push('/auth')}
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
        <div className="max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">База пользователей</h1>
            <button
              onClick={() => {
                setNewUser({
                  login: '',
                  password: '',
                  firstName: '',
                  lastName: '',
                  middleName: '',
                  role: 'Ученик',
                  email: '',
                  birthDate: '',
                })
                setErrors({})
                setShowCreateModal(true)
              }}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 flex items-center gap-2"
            >
              <span>+ Создать пользователя</span>
            </button>
          </div>

          {/* Search and Tabs */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative w-64">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Поиск"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('students')}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeTab === 'students'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Ученики
              </button>
              <button
                onClick={() => setActiveTab('teachers')}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeTab === 'teachers'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Преподаватели
              </button>
            </div>
          </div>

          {/* Users List */}
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 grid grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">ФИО</div>
                      <div className="font-medium">{user.fullName}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Логин</div>
                      <div>{user.login}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Дата рождения</div>
                      <div>{user.birthDate}</div>
                    </div>
                    {activeTab === 'students' && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Кол-во алгокоинов</div>
                        <div>{user.algocoins}</div>
                      </div>
                    )}
                  </div>

                  <div className="relative ml-4">
                    <button
                      onClick={() => setShowUserMenu(showUserMenu === user.id ? null : user.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="5" r="2" />
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="12" cy="19" r="2" />
                      </svg>
                    </button>

                    {showUserMenu === user.id && (
                      <div className="absolute right-0 top-12 bg-white border rounded-lg shadow-lg py-2 z-10 min-w-[180px]">
                        <button
                          onClick={() => openEditModal(user)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          Редактировать
                        </button>
                        <button
                          onClick={() => openDeleteModal(user)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-red-600"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 4 0 0 1 2 2v2" />
                          </svg>
                          Удалить
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                Нет пользователей
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-end items-center gap-4 mt-6 text-sm text-gray-600">
            <span>1-5 из 28</span>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Создать пользователя</h2>
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  setErrors({})
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Логин*</label>
                  <input
                    type="text"
                    value={newUser.login}
                    onChange={(e) => setNewUser({ ...newUser, login: e.target.value })}
                    placeholder="Логин"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.login ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.login && <p className="text-red-500 text-xs mt-1">{errors.login}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-2">Пароль*</label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="Пароль"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Фамилия*</label>
                  <input
                    type="text"
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                    placeholder="Фамилия"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-2">Роль*</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Ученик">Ученик</option>
                    <option value="Преподаватель">Преподаватель</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Имя*</label>
                  <input
                    type="text"
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                    placeholder="Имя"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-2">Отчество</label>
                  <input
                    type="text"
                    value={newUser.middleName}
                    onChange={(e) => setNewUser({ ...newUser, middleName: e.target.value })}
                    placeholder="Отчество"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.middleName ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.middleName && <p className="text-red-500 text-xs mt-1">{errors.middleName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="Email"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-2">Дата рождения</label>
                  <input
                    type="text"
                    value={newUser.birthDate}
                    onChange={(e) => setNewUser({ ...newUser, birthDate: e.target.value })}
                    placeholder="ДД.ММ.ГГГГ"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.birthDate ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>}
                </div>
              </div>

              <button
                onClick={handleCreateUser}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg mt-4"
              >
                Создать
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal (NO PASSWORD FIELD) */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Редактировать пользователя</h2>
              <button
                onClick={() => {
                  setShowEditModal(false)
                  setSelectedUser(null)
                  setErrors({})
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Логин*</label>
                <input
                  type="text"
                  value={editUser.login}
                  onChange={(e) => setEditUser({ ...editUser, login: e.target.value })}
                  placeholder="Логин"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.login ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
                {errors.login && <p className="text-red-500 text-xs mt-1">{errors.login}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Фамилия*</label>
                  <input
                    type="text"
                    value={editUser.lastName}
                    onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })}
                    placeholder="Фамилия"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-2">Роль*</label>
                  <select
                    value={editUser.role}
                    onChange={(e) => setEditUser({ ...editUser, role: e.target.value as UserRole })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Ученик">Ученик</option>
                    <option value="Преподаватель">Преподаватель</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Имя*</label>
                  <input
                    type="text"
                    value={editUser.firstName}
                    onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })}
                    placeholder="Имя"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-2">Отчество</label>
                  <input
                    type="text"
                    value={editUser.middleName}
                    onChange={(e) => setEditUser({ ...editUser, middleName: e.target.value })}
                    placeholder="Отчество"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.middleName ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.middleName && <p className="text-red-500 text-xs mt-1">{errors.middleName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <input
                    type="email"
                    value={editUser.email}
                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                    placeholder="Email"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-2">Дата рождения</label>
                  <input
                    type="text"
                    value={editUser.birthDate}
                    onChange={(e) => setEditUser({ ...editUser, birthDate: e.target.value })}
                    placeholder="ДД.ММ.ГГГГ"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.birthDate ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>}
                </div>
              </div>

              <button
                onClick={handleEditUser}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg mt-4"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Удалить пользователя</h2>
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setSelectedUser(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              {selectedUser.fullName} будет удален навсегда без возможности восстановления
            </p>

            <button
              onClick={handleDeleteUser}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg"
            >
              Удалить
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
