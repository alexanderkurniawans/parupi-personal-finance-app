'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Bell, Send, X, Home, BarChart3, History, Settings, Plus, MessageCircle, Utensils, Tag, ArrowLeftRight, QrCode, TrendingUp } from 'lucide-react'

// Top Header Component
function TopHeader() {
  return (
    <div className="flex items-center justify-between px-4 pt-4 pb-3">
      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-semibold text-sm">
        AK
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(0,209,102,0.6)]"></div>
          <MessageCircle size={18} className="text-zinc-400" />
        </div>
        <Bell size={18} className="text-zinc-400" />
      </div>
    </div>
  )
}

// Balance Carousel Component
function BalanceCarousel() {
  const [activeSlide, setActiveSlide] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const balances = [
    { label: 'Total Uang', amount: 'Rp 28.450.000' },
    { label: 'E-Money', amount: 'Rp 2.930.000' },
    { label: 'Bank', amount: 'Rp 18.300.000' },
    { label: 'Cash', amount: 'Rp 7.220.000' },
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
    <div className="px-4 pt-4 pb-6">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4"
        style={{ scrollBehavior: 'smooth' }}
      >
        {balances.map((balance, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-full snap-center bg-zinc-900/80 backdrop-blur-md border border-white/5 rounded-2xl p-6"
          >
            <p className="text-zinc-400 text-sm mb-2">{balance.label}</p>
            <p className="text-white text-3xl font-bold">{balance.amount}</p>
          </div>
        ))}
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {balances.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition-all ${
              idx === activeSlide ? 'bg-green-500 w-6' : 'bg-zinc-700 w-2'
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}

// Pending Queue Component
function PendingQueue() {
  const [showPending, setShowPending] = useState(true)

  if (!showPending) return null

  return (
    <div className="mx-4 mb-4 bg-zinc-900/80 backdrop-blur-md border border-white/5 rounded-xl p-4">
      <p className="text-white text-sm mb-3">Makan siang Solaria - Rp 145.000</p>
      <div className="flex gap-3">
        <button className="text-green-500 text-xs font-medium hover:text-green-400 transition">
          Selesaikan
        </button>
        <button className="text-red-500 text-xs font-medium hover:text-red-400 transition">
          Tolak
        </button>
      </div>
    </div>
  )
}

// Quick Actions Component
function QuickActions() {
  const actions = [
    { icon: TrendingUp, label: 'Statistik' },
    { icon: Tag, label: 'Kategori' },
    { icon: ArrowLeftRight, label: 'Transfer' },
    { icon: QrCode, label: 'QRIS' },
  ]

  return (
    <div className="px-4 mb-6">
      <div className="grid grid-cols-4 gap-4">
        {actions.map((action, idx) => {
          const IconComponent = action.icon
          return (
            <button
              key={idx}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-zinc-900/50 transition"
            >
              <IconComponent size={24} className="text-green-500" />
              <span className="text-xs text-zinc-400">{action.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Budget Bar Component
function BudgetBar() {
  const budgetUsed = 6413000
  const budgetTotal = 10000000
  const percentage = (budgetUsed / budgetTotal) * 100

  return (
    <div className="px-4 mb-6">
      <p className="text-sm text-zinc-400 mb-3">Sisa Anggaran: Rp3.587.000</p>
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all"
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
      amount: '-Rp 85.000',
      isExpense: true,
    },
    {
      icon: TrendingUp,
      name: 'Bonus Kerja',
      date: 'Kemarin',
      amount: '+Rp 500.000',
      isExpense: false,
    },
    {
      icon: Tag,
      name: 'Belanja Groceries',
      date: '2 hari lalu',
      amount: '-Rp 125.000',
      isExpense: true,
    },
    {
      icon: ArrowLeftRight,
      name: 'Transfer ke Rekening',
      date: '3 hari lalu',
      amount: '-Rp 1.000.000',
      isExpense: true,
    },
  ]

  return (
    <div className="px-4 pb-32">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Transaksi Terbaru</h3>
        <button className="text-xs text-green-500 hover:text-green-400 transition">
          Lihat Semua
        </button>
      </div>

      <div className="space-y-3">
        {transactions.map((txn, idx) => {
          const TxnIcon = txn.icon
          return (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-900/50 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                  <TxnIcon size={18} className="text-green-500" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{txn.name}</p>
                  <p className="text-xs text-zinc-500">{txn.date}</p>
                </div>
              </div>
              <p className={`text-sm font-semibold ${txn.isExpense ? 'text-red-500' : 'text-green-500'}`}>
                {txn.amount}
              </p>
            </div>
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
        <div className="bg-zinc-900 border-t border-zinc-800 rounded-t-3xl p-6 h-96">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-white transition"
          >
            <X size={24} />
          </button>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 pt-2">
            <button
              onClick={() => setActiveTab('chat')}
              className={`text-sm font-medium pb-2 border-b-2 transition ${
                activeTab === 'chat'
                  ? 'text-white border-green-500'
                  : 'text-zinc-500 border-transparent'
              }`}
            >
              Catat via Chat
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`text-sm font-medium pb-2 border-b-2 transition ${
                activeTab === 'manual'
                  ? 'text-white border-green-500'
                  : 'text-zinc-500 border-transparent'
              }`}
            >
              Input Manual
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'chat' ? (
            <div className="flex flex-col gap-4 h-72">
              <input
                type="text"
                placeholder="Ketik 'makan sate 25rb pake gopay'..."
                className="flex-1 bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-green-500 transition"
              />
              <button className="bg-green-500 hover:bg-green-600 text-black p-3 rounded-lg flex items-center justify-center transition">
                <Send size={20} />
              </button>
            </div>
          ) : (
            <div className="text-zinc-400 text-sm">
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
  const navItems = [
    { icon: Home, label: 'Beranda' },
    { icon: BarChart3, label: 'Statistik' },
    null, // FAB placeholder
    { icon: History, label: 'Riwayat' },
    { icon: Settings, label: 'Settings' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto">
      {/* Floating Action Button */}
      <button
        onClick={onFabClick}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,209,102,0.4)] hover:shadow-[0_0_30px_rgba(0,209,102,0.6)] transition z-30"
      >
        <Plus size={28} className="text-black" />
      </button>

      {/* Navigation Bar */}
      <nav className="bg-zinc-950/90 backdrop-blur border-t border-zinc-800 rounded-t-2xl flex items-center justify-around py-3">
        {navItems.map((item, idx) => {
          if (!item) return <div key={idx}></div>
          const IconComponent = item.icon
          return (
            <button
              key={idx}
              className="flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition py-2"
            >
              <IconComponent size={20} />
              <span className="text-xs">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

// Main App Component
export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="bg-black text-white min-h-screen flex justify-center">
      {/* Mobile Frame */}
      <div className="max-w-md mx-auto min-h-screen bg-black text-white relative overflow-hidden">
        <div className="overflow-y-auto h-screen scrollbar-hide">
          <TopHeader />
          <BalanceCarousel />
          <PendingQueue />
          <QuickActions />
          <BudgetBar />
          <RecentTransactions />
        </div>

        {/* Bottom Navigation & FAB */}
        <BottomNav onFabClick={() => setIsModalOpen(true)} />

        {/* Bottom Sheet Modal */}
        <BottomSheetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  )
}
