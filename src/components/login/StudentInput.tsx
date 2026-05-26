import { forwardRef } from 'react'
import { motion } from 'framer-motion'

interface StudentInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  placeholder?: string
}

const StudentInput = forwardRef<HTMLInputElement, StudentInputProps>(
  ({ value, onChange, disabled = false, placeholder = 'Student ID' }, ref) => {
    return (
      <motion.input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={20}
        className="
          flex-1 min-w-0 px-5 py-3
          bg-transparent
          font-myCustom
          text-[#D4879C]
          placeholder:text-[#D4879C]/40
          focus:outline-none
          tracking-widest
          text-[16px] md:text-[16px]
          [text-shadow:0_1px_2px_rgba(0,0,0,0.12),0_0_8px_rgba(212,135,156,0.25)]
        "
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.15 }}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
    )
  }
)

StudentInput.displayName = 'StudentInput'
export default StudentInput
