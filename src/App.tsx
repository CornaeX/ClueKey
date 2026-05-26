import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LoginPage from '@/pages/LoginPage/LoginPage'
import ExperiencePage from '@/pages/ExperiencePage/ExperiencePage'

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/experience/:studentId" element={<ExperiencePage />} />
      </Routes>
    </AnimatePresence>
  )
}
