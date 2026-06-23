'use client'

import React, { useState, useRef } from 'react'
import { Bell, Send, X, Home, BarChart3, History, Settings, Plus, Utensils, Salad, Zap, Plane, TrendingUp, ShoppingCart } from 'lucide-react'

// Top Header Component (Empty - Avatar moved to BalanceCard)
function TopHeader() {
  return null
}

// Balance Card Component with Apple HIG Dark Mode Gradients
function BalanceCard() {
  const [activeSlide, setActiveSlide] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const balances = [
    { label: 'Total Uang', amount: '28.450.000', gradient: 'from-purple-800/60 to-purple-950' },
    { label: 'Bank', amount: '18.300.000', gradient: 'from-yellow-700/60 to-yellow-950' },
    { label: 'E-Money', amount: '2.930.000', gradient: 'from-blue-800/60 to-blue-950' },
    { label: 'Cash', amount: '7.220.000', gradient: 'from-green-800/60 to-green-950' },
  ]

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft
      const slideWidth = scrollRef.current.offsetWidth
      const newSlide = Math.round(scrollPosition / slideWidth)
      setActiveSlide(newSlide)
    }
  }

  return (
    <div className="bg-gradient-to-br from-[#00D166]/10 to-neutral-900/40 backdrop-blur-md border border-white/10 rounded-b-3xl p-6 shadow-[0_8px_32px_rgba(0,209,102,0.15)]">
      {/* Header with Avatar */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-neutral-400 font-semibold uppercase tracking-wide">Saldo Anda</p>
        <button
          className="w-10 h-10 rounded-full bg-[#00D166]/20 backdrop-blur-sm border border-[#00D166]/50 flex items-center justify-center text-[#00D166] font-semibold text-sm hover:bg-[#00D166]/30 active:scale-95 transition"
          aria-label="User profile"
        >
          AK
        </button>
      </div>
      
      {/* Carousel Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 -mx-2 px-2 bg-gradient-to-r from-black via-transparent to-black"
        style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
      >
        {balances.map((balance, idx) => (
          <div
            key={idx}
            className={`flex-shrink-0 w-full snap-center bg-gradient-to-br ${balance.gradient} rounded-2xl p-6 border border-white/10 transition-all duration-300 ease-out shadow-lg`}
          >
            <p className="text-xs text-white/70 mb-3 uppercase tracking-wide transition-all duration-300 ease-out">{balance.label}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-white/60 text-sm transition-all duration-300 ease-out">Rp</span>
              <p className="text-white text-4xl font-mono font-bold tabular-nums transition-all duration-300 ease-out">{balance.amount}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 mt-5">
        {balances.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all ${
              idx === activeSlide ? 'bg-[#00D166] w-6' : 'bg-neutral-600 w-1.5'
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}

// Pending Queue Component (Apple HIG Swipe-to-Confirm)
function PendingQueue() {
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const dragRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    if (Math.abs(dragX) > 60) {
      // RIGHT drag = Approve (Success)
      if (dragX > 0) confirmApprove()
      // LEFT drag = Reject (Destructive)
      else confirmReject()
    } else {
      setDragX(0)
    }
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !dragRef.current) return
    const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const newX = currentX - startX.current
    setDragX(Math.max(-100, Math.min(100, newX)))
  }

  const showNotification = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  const confirmApprove = () => {
    showNotification('Transaksi disetujui')
    setDragX(0)
  }

  const confirmReject = () => {
    showNotification('Transaksi ditolak')
    setDragX(0)
  }

  // Calculate background color and border based on drag direction
  const getBackgroundColor = () => {
    if (dragX > 30) {
      // Dragging right = green success state
      return 'bg-gradient-to-r from-green-500/30 via-neutral-900 to-neutral-900 border-green-500/60'
    } else if (dragX < -30) {
      // Dragging left = red reject state
      return 'bg-gradient-to-r from-neutral-900 via-neutral-900 to-red-500/30 border-red-500/60'
    }
    return 'bg-neutral-900 border-white/10'
  }

  const getBorderClass = () => {
    if (dragX > 30) return 'border-2 border-green-500/70'
    if (dragX < -30) return 'border-2 border-red-500/70'
    return 'border border-white/10'
  }

  return (
    <>
      <div className={`relative h-20 rounded-xl overflow-hidden backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-300 ease-out ${getBorderClass()}`}>
        {/* Draggable card with feedback background */}
        <div
          ref={dragRef}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseMove={handleDragMove}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          onTouchMove={handleDragMove}
          className={`absolute inset-0 rounded-xl p-4 cursor-grab active:cursor-grabbing select-none transition-all duration-300 ease-out ${getBackgroundColor()}`}
          style={{ transform: `translateX(${dragX}px)` }}
        >
          <div className="flex items-center justify-between h-full">
            <p className="text-sm text-white font-medium flex-1 transition-all duration-300 ease-out">Makan siang Solaria</p>
            <p className="text-sm font-mono font-semibold text-neutral-300 transition-all duration-300 ease-out">Rp 145.000</p>
          </div>
        </div>

        {/* Accessibility buttons (sr-only) */}
        <button onClick={confirmReject} className="sr-only">
          Tolak transaksi
        </button>
        <button onClick={confirmApprove} className="sr-only">
          Setujui transaksi
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-neutral-800 text-white px-4 py-2 rounded-lg text-sm font-medium z-20 animate-in fade-in duration-300">
          {toastMessage}
        </div>
      )}
    </>
  )
}

// Quick Actions Component
function QuickActions() {
  const actions = [
    { icon: TrendingUp, label: 'Statistik' },
    { icon: BarChart3, label: 'Kategori' },
    { icon: Plane, label: 'Transfer' },
    { icon: Zap, label: 'QRIS' },
  ]

  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action, idx) => {
        const IconComponent = action.icon
        return (
          <button
            key={idx}
            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-neutral-800 active:scale-95 transition"
            aria-label={action.label}
          >
            <IconComponent size={24} className="text-neutral-400" />
            <span className="text-xs text-neutral-500">{action.label}</span>
          </button>
        )
      })}
    </div>
  )
}

// Budget Bar Component
function BudgetBar() {
  const budgetUsed = 6413000
  const budgetTotal = 10000000
  const percentage = (budgetUsed / budgetTotal) * 100

  return (
    <div>
      <p className="text-xs text-neutral-500 mb-2 uppercase tracking-wide">Sisa Anggaran</p>
      <p className="text-white font-mono font-semibold tabular-nums mb-3 flex items-baseline gap-1">
        <span className="text-neutral-400 text-xs">Rp</span>
        <span className="text-lg">3.587.000</span>
      </p>
      <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#00D166] transition-all"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}

// Recent Transactions Component
function RecentTransactions() {
  const transactions = [
    {
      icon: Utensils,
      name: 'Makan Siang',
      date: 'Hari ini',
      amount: '85.000',
      isExpense: true,
      category: 'food',
    },
    {
      icon: TrendingUp,
      name: 'Bonus Kerja',
      date: 'Kemarin',
      amount: '500.000',
      isExpense: false,
      category: 'income',
    },
    {
      icon: ShoppingCart,
      name: 'Belanja Groceries',
      date: '2 hari lalu',
      amount: '125.000',
      isExpense: true,
      category: 'shopping',
    },
    {
      icon: Plane,
      name: 'Transfer ke Rekening',
      date: '3 hari lalu',
      amount: '1.000.000',
      isExpense: true,
      category: 'transfer',
    },
  ]

  const categoryColors = {
    food: 'text-amber-500',
    income: 'text-[#00D166]',
    shopping: 'text-pink-500',
    transfer: 'text-sky-500',
  }

  return (
    <div className="pb-24">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base text-white font-semibold">Transaksi Terbaru</h3>
        <button className="text-xs text-neutral-400 hover:bg-neutral-800 active:scale-95 px-3 py-1 rounded transition">
          Lihat Semua
        </button>
      </div>

      <div className="space-y-3">
        {transactions.map((txn, idx) => {
          const TxnIcon = txn.icon
          const iconColor = categoryColors[txn.category as keyof typeof categoryColors]
          return (
            <button
              key={idx}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-neutral-800 active:scale-95 transition"
              aria-label={`${txn.name}: ${txn.isExpense ? '-' : '+'}Rp ${txn.amount}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                  <TxnIcon size={18} className={iconColor} />
                </div>
                <div className="text-left">
                  <p className="text-white text-sm font-medium">{txn.name}</p>
                  <p className="text-xs text-neutral-500">{txn.date}</p>
                </div>
              </div>
              <p className={`text-sm font-mono font-semibold tabular-nums ${txn.isExpense ? 'text-neutral-300' : 'text-[#00D166]'}`}>
                {txn.isExpense ? '−' : '+'}Rp {txn.amount}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Bottom Sheet Modal Component
function BottomSheetModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('chat')

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>

      {/* Modal */}
      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto">
        <div className="bg-neutral-900 border-t border-neutral-800 rounded-t-3xl p-6 h-96">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-neutral-400 hover:bg-neutral-800 active:scale-95 rounded-full transition"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 pt-2">
            <button
              onClick={() => setActiveTab('chat')}
              className={`text-sm font-medium pb-2 border-b-2 transition ${
                activeTab === 'chat'
                  ? 'text-white border-[#00D166]'
                  : 'text-neutral-500 border-transparent hover:bg-neutral-800 active:scale-95'
              }`}
            >
              Catat via Chat
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`text-sm font-medium pb-2 border-b-2 transition ${
                activeTab === 'manual'
                  ? 'text-white border-[#00D166]'
                  : 'text-neutral-500 border-transparent hover:bg-neutral-800 active:scale-95'
              }`}
            >
              Input Manual
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'chat' ? (
            <div className="flex flex-col gap-3 h-72">
              <input
                type="text"
                placeholder="Ketik 'makan sate 25rb pake gopay'..."
                className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[#00D166] transition"
              />
              <button className="bg-[#00D166] hover:bg-green-600 text-black p-3 rounded-lg flex items-center justify-center font-medium active:scale-95 transition">
                <Send size={20} />
              </button>
            </div>
          ) : (
            <div className="text-neutral-400 text-sm">
              <p>Form input manual akan ditampilkan di sini</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// Bottom Navigation Component
function BottomNav({ onFabClick }: { onFabClick: () => void }) {
  const [activeTab, setActiveTab] = useState(0)

  const navItems = [
    { icon: Home, label: 'Beranda' },
    { icon: BarChart3, label: 'Statistik' },
    { icon: Plus, label: 'Tambah', isFab: true },
    { icon: History, label: 'Riwayat' },
    { icon: Settings, label: 'Settings' },
  ]

  return (
    <nav className="bg-neutral-950 border-t border-neutral-900 flex items-center justify-around py-3">
      {navItems.map((item, idx) => {
        const IconComponent = item.icon
        const isActive = idx === activeTab

        if (item.isFab) {
          return (
            <button
              key={idx}
              onClick={() => {
                setActiveTab(idx)
                onFabClick()
              }}
              className="w-14 h-14 bg-[#00D166] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,209,102,0.4)] hover:shadow-[0_0_30px_rgba(0,209,102,0.6)] active:scale-95 transition"
              aria-label={item.label}
            >
              <IconComponent size={28} className="text-black font-bold" />
            </button>
          )
        }

        return (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg active:scale-95 transition ${
              isActive
                ? 'text-white'
                : 'text-neutral-400 hover:bg-neutral-800'
            }`}
            aria-label={item.label}
          >
            <IconComponent size={20} />
            <span className="text-xs">{item.label}</span>
            {isActive && <div className="h-1 w-6 bg-[#00D166] rounded-full mt-1"></div>}
          </button>
        )
      })}
    </nav>
  )
}

// Main App Component
export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="bg-black text-white min-h-screen flex justify-center">
      {/* Mobile Frame */}
      <div className="max-w-md mx-auto min-h-screen bg-black text-white relative flex flex-col overflow-hidden">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="flex flex-col gap-6 px-0 py-0">
            <BalanceCard />
            <div className="flex flex-col gap-6 px-4">
              <QuickActions />
              <BudgetBar />
              <RecentTransactions />
            </div>
          </div>
        </div>

        {/* Pending Queue - Sticky positioning above Bottom Nav (Apple HIG thumb zone) */}
        <div className="sticky bottom-20 px-4 py-3 bg-black border-t border-neutral-900 z-20">
          <PendingQueue />
        </div>

        {/* Bottom Navigation */}
        <BottomNav onFabClick={() => setIsModalOpen(true)} />

        {/* Bottom Sheet Modal */}
        <BottomSheetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  )
}
