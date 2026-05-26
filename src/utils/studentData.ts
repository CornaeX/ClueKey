import type { StudentData } from '@/types'

// Mock student database — replace with real API call
const MOCK_HINTS = [
  { id: 'h1', label: 'คำใบ้ 1', daysLeft: 3, isUnlocked: true },
  { id: 'h2', label: 'คำใบ้ 2', daysLeft: 7, isUnlocked: true },
  { id: 'h3', label: 'คำใบ้ 3', daysLeft: 14, isUnlocked: false },
  { id: 'h4', label: 'คำใบ้ 4', daysLeft: 21, isUnlocked: false },
  { id: 'h5', label: 'คำใบ้ 5', daysLeft: 30, isUnlocked: false },
  { id: 'h6', label: 'คำใบ้ 6', daysLeft: 60, isUnlocked: false },
]

export async function fetchStudentData(studentId: string): Promise<StudentData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    id: studentId,
    name: `Student ${studentId}`,
    hints: MOCK_HINTS,
    imageUrl: undefined, // replace with actual student image URL
    contactInfo: 'your_ig_handle',
  }
}

export function validateStudentId(id: string): boolean {
  return id.trim().length >= 4
}
