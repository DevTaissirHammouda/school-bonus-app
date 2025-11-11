'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// Types
type OrderStatus = 'Заказан' | 'Подтвержден' | 'Выдан' | 'Отменен'

interface Order {
  id: number
  giftName: string
  giftImage: string
  customerName: string
  customerFullName: string
  orderDate: string
  status: OrderStatus
}

// Mock data
const mockOrders: Order[] = [
  {
    id: 1,
    giftName: 'Фирменая худи с логотипом вуза',
    giftImage: '/gifts/a.svg',
    customerName: 'Коссе Иван Николаевич',
    customerFullName: 'Коссе Иван Николаевич',
    orderDate: '10.10.2010',
    status: 'Заказан',
  },
  {
    id: 2,
    giftName: 'Фирменая худи с логотипом вуза',
    giftImage: '/gifts/a.svg',
    customerName: 'Коссе Иван Николаевич',
    customerFullName: 'Коссе Иван Николаевич',
    orderDate: '10.10.2010',
    status: 'Заказан',
  },
  {
    id: 3,
    giftName: 'Фирменая худи с логотипом вуза',
    giftImage: '/gifts/a.svg',
    customerName: 'Коссе Иван Николаевич',
    customerFullName: 'Коссе Иван Николаевич',
    orderDate: '10.10.2010',
    status: 'Подтвержден',
  },
  {
    id: 4,
    giftName: 'Фирменая худи с логотипом вуза',
    giftImage: '/gifts/a.svg',
    customerName: 'Коссе Иван Николаевич',
    customerFullName: 'Коссе Иван Николаевич',
    orderDate: '10.10.2010',
    status: 'Подтвержден',
  },
  {
    id: 5,
    giftName: 'Фирменая худи с логотипом вуза',
    giftImage: '/gifts/a.svg',
    customerName: 'Коссе Иван Николаевич',
    customerFullName: 'Коссе Иван Николаевич',
    orderDate: '10.10.2010',
    status: 'Заказан',
  },
  {
    id: 6,
    giftName: 'Фирменая худи с логотипом вуза',
    giftImage: '/gifts/a.svg',
    customerName: 'Коссе Иван Николаевич',
    customerFullName: 'Коссе Иван Николаевич',
    orderDate: '09.10.2010',
    status: 'Выдан',
  },
  {
    id: 7,
    giftName: 'Фирменая худи с логотипом вуза',
    giftImage: '/gifts/a.svg',
    customerName: 'Коссе Иван Николаевич',
    customerFullName: 'Коссе Иван Николаевич',
    orderDate: '08.10.2010',
    status: 'Отменен',
  },
]

export default function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active')
  const [showOrderMenu, setShowOrderMenu] = useState<number | null>(null)

  // Filter orders by status
  const activeOrders = orders.filter(
    (o) => o.status === 'Заказан' || o.status === 'Подтвержден'
  )
  const completedOrders = orders.filter(
    (o) => o.status === 'Выдан' || o.status === 'Отменен'
  )

  // Sort orders by date (newest first)
  const sortOrdersByDate = (ordersList: Order[]) => {
    return [...ordersList].sort((a, b) => {
      const dateA = a.orderDate.split('.').reverse().join('')
      const dateB = b.orderDate.split('.').reverse().join('')
      return dateB.localeCompare(dateA)
    })
  }

  // Get filtered orders based on active tab
  const displayedOrders = sortOrdersByDate(
    activeTab === 'active' ? activeOrders : completedOrders
  ).filter(
    (o) =>
      o.giftName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleConfirmOrder = (orderId: number) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: 'Подтвержден' } : o))
    )
    setShowOrderMenu(null)
  }

  const handleIssueOrder = (orderId: number) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: 'Выдан' } : o)))
    setShowOrderMenu(null)
  }

  const handleCancelOrder = (orderId: number) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: 'Отменен' } : o)))
    setShowOrderMenu(null)
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Заказан':
        return 'text-blue-600'
      case 'Подтвержден':
        return 'text-green-600'
      case 'Выдан':
        return 'text-gray-600'
      case 'Отменен':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

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

            <button className="w-full flex items-center gap-3 px-6 py-3 text-left bg-gray-100 border-l-4 border-indigo-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 2v2m6-2v2M4 6h16M5 10h14v10H5V10z" />
              </svg>
              <span className="font-medium">Заказы</span>
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
          <h1 className="text-3xl font-bold mb-8">Заказы подарков</h1>

          {/* Search and Tabs */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
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
                  onClick={() => setActiveTab('active')}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    activeTab === 'active'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Актуальные
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    activeTab === 'completed'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Завершенные
                </button>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {displayedOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {/* Gift Image */}
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={order.giftImage}
                      alt={order.giftName}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Order Details */}
                  <div className="flex-1 grid grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Название подарка</div>
                      <button
                        onClick={() => router.push('/gifts')}
                        className="text-sm font-medium hover:text-indigo-600 transition-colors text-left"
                      >
                        {order.giftName}
                      </button>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500 mb-1">ФИО заказчика</div>
                      <div className="text-sm">{order.customerFullName}</div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500 mb-1">Дата заказа</div>
                      <div className="text-sm">{order.orderDate}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Статус</div>
                        <div className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </div>
                      </div>

                      {/* Actions Menu */}
                      <div className="relative">
                        <button
                          onClick={() => setShowOrderMenu(showOrderMenu === order.id ? null : order.id)}
                          className="p-2 hover:bg-gray-200 rounded-lg"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="5" r="2" />
                            <circle cx="12" cy="12" r="2" />
                            <circle cx="12" cy="19" r="2" />
                          </svg>
                        </button>

                        {showOrderMenu === order.id && (
                          <div className="absolute right-0 top-12 bg-white border rounded-lg shadow-lg py-2 z-10 min-w-[180px]">
                            {order.status !== 'Подтвержден' && order.status !== 'Выдан' && order.status !== 'Отменен' && (
                              <button
                                onClick={() => handleConfirmOrder(order.id)}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M20 6L9 17l-5-5" />
                                </svg>
                                Подтвердить
                              </button>
                            )}
                            {(order.status === 'Подтвержден' || order.status === 'Заказан') && (
                              <button
                                onClick={() => handleIssueOrder(order.id)}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                  <circle cx="8.5" cy="7" r="4" />
                                  <path d="M20 8v6M23 11h-6" />
                                </svg>
                                Выдан
                              </button>
                            )}
                            {order.status !== 'Отменен' && order.status !== 'Выдан' && (
                              <button
                                onClick={() => handleCancelOrder(order.id)}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-red-600"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                                Отменить
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {displayedOrders.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  Нет заказов
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
        </div>
      </main>
    </div>
  )
}
