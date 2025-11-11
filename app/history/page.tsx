'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Types
interface HistoryRecord {
  id: number
  studentName: string
  teacherName: string
  group: string
  date: string
  algocoins: number
}

// Mock data
const mockHistory: HistoryRecord[] = [
  {
    id: 1,
    studentName: 'Коссе Иван Николаевич',
    teacherName: 'Коссе Иван Николаевич',
    group: 'Вечерния суббота',
    date: '10.10.2010',
    algocoins: 5,
  },
  {
    id: 2,
    studentName: 'Коссе Иван Николаевич',
    teacherName: 'Коссе Иван Николаевич',
    group: 'Вечерния суббота',
    date: '10.10.2010',
    algocoins: 5,
  },
  {
    id: 3,
    studentName: 'Коссе Иван Николаевич',
    teacherName: 'Коссе Иван Николаевич',
    group: 'Вечерния суббота',
    date: '10.10.2010',
    algocoins: 5,
  },
  {
    id: 4,
    studentName: 'Коссе Иван Николаевич',
    teacherName: 'Петров Петр Петрович',
    group: 'Группа пятница',
    date: '10.10.2010',
    algocoins: 5,
  },
  {
    id: 5,
    studentName: 'Коссе Иван Николаевич',
    teacherName: 'Сидоров Сидор Сидорович',
    group: 'Группа 1',
    date: '10.10.2010',
    algocoins: 5,
  },
  {
    id: 6,
    studentName: 'Иванов Иван Иванович',
    teacherName: 'Коссе Иван Николаевич',
    group: 'Группа утро',
    date: '09.10.2010',
    algocoins: 3,
  },
  {
    id: 7,
    studentName: 'Петрова Мария Ивановна',
    teacherName: 'Коссе Иван Николаевич',
    group: 'Вечерния четверг',
    date: '08.10.2010',
    algocoins: 7,
  },
]

const mockGroups = ['Вечерния суббота', 'Группа пятница', 'Группа 1', 'Группа утро', 'Вечерния четверг', 'Группа А', 'Группа Б']
const mockTeachers = [
  'Коссе Иван Николаевич',
  'Петров Петр Петрович',
  'Сидоров Сидор Сидорович',
  'Иванова Анна Петровна',
  'Смирнов Алексей Иванович',
  'Кузнецова Елена Сергеевна',
]

export default function HistoryPage() {
  const router = useRouter()
  const [records, setRecords] = useState<HistoryRecord[]>(mockHistory)
  const [showFilterModal, setShowFilterModal] = useState(false)
  
  // Filter states - all checked by default on page load
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])
  const [showAllGroups, setShowAllGroups] = useState(false)
  const [showAllTeachers, setShowAllTeachers] = useState(false)

  // Initialize all filters as checked on component mount
  useEffect(() => {
    setSelectedGroups(mockGroups)
    setSelectedTeachers(mockTeachers)
  }, [])

  const toggleGroup = (group: string) => {
    setSelectedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    )
  }

  const toggleTeacher = (teacher: string) => {
    setSelectedTeachers((prev) =>
      prev.includes(teacher) ? prev.filter((t) => t !== teacher) : [...prev, teacher]
    )
  }

  const applyFilter = () => {
    // Filter is applied but modal stays open
    // User must click X to close
  }

  const displayedGroups = showAllGroups ? mockGroups : mockGroups.slice(0, 5)
  const displayedTeachers = showAllTeachers ? mockTeachers : mockTeachers.slice(0, 5)

  // Filter records based on selected groups and teachers
  const filteredRecords = records.filter(
    (record) =>
      selectedGroups.includes(record.group) && selectedTeachers.includes(record.teacherName)
  )

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

            <button
              onClick={() => router.push('/orders')}
              className="w-full flex items-center gap-3 px-6 py-3 text-left text-gray-600 hover:bg-gray-50"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 2v2m6-2v2M4 6h16M5 10h14v10H5V10z" />
              </svg>
              <span>Заказы</span>
            </button>

            <button className="w-full flex items-center gap-3 px-6 py-3 text-left bg-gray-100 border-l-4 border-indigo-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="font-medium">История</span>
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
          <h1 className="text-3xl font-bold mb-8">История зачислений</h1>

          {/* History List */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowFilterModal(true)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M7 12h10M11 18h2" />
                </svg>
                Фильтр
              </button>
            </div>

            {/* Records List */}
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex-1 grid grid-cols-5 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">ФИО ученика</div>
                      <div className="text-sm">{record.studentName}</div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500 mb-1">ФИО преподавателя</div>
                      <div className="text-sm">{record.teacherName}</div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500 mb-1">Группа</div>
                      <div className="text-sm">{record.group}</div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500 mb-1">Дата зачисления</div>
                      <div className="text-sm">{record.date}</div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500 mb-1">Кол-во алгокоинов</div>
                      <div className="text-sm font-medium">{record.algocoins}</div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredRecords.length === 0 && (
                <div className="text-center py-12 text-gray-400">Нет записей</div>
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
        </div>
      </main>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Фильтр</h2>
              <button
                onClick={() => setShowFilterModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Groups Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Группа</h3>
              <div className="space-y-2">
                {displayedGroups.map((group) => (
                  <label key={group} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedGroups.includes(group)}
                      onChange={() => toggleGroup(group)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm">{group}</span>
                  </label>
                ))}
                {mockGroups.length > 5 && (
                  <button
                    onClick={() => setShowAllGroups(!showAllGroups)}
                    className="text-sm text-indigo-600 hover:text-indigo-700 mt-2"
                  >
                    {showAllGroups ? 'Показать меньше' : 'Просмотреть больше'}
                  </button>
                )}
              </div>
            </div>

            {/* Teachers Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Преподаватель</h3>
              <div className="space-y-2">
                {displayedTeachers.map((teacher) => (
                  <label key={teacher} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTeachers.includes(teacher)}
                      onChange={() => toggleTeacher(teacher)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm">{teacher}</span>
                  </label>
                ))}
                {mockTeachers.length > 5 && (
                  <button
                    onClick={() => setShowAllTeachers(!showAllTeachers)}
                    className="text-sm text-indigo-600 hover:text-indigo-700 mt-2"
                  >
                    {showAllTeachers ? 'Показать меньше' : 'Просмотреть больше'}
                  </button>
                )}
              </div>
            </div>

            {/* Apply Filter Button */}
            <button
              onClick={applyFilter}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700"
            >
              Сохранить фильтр
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
