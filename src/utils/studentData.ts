import type { StudentData, StudentJsonEntry, StudentsJsonDatabase } from '@/types'
import studentsDb from '@/data/students.json'

const db = studentsDb as StudentsJsonDatabase
const TOTAL_HINTS = 6

/**
 * Build the full 6-slot hint array for a student.
 * Slots present in the JSON → unlocked (show real text).
 * Slots not in the JSON → locked (show placeholder).
 */
function buildHints(entry: StudentJsonEntry): StudentData['hints'] {
  return Array.from({ length: TOTAL_HINTS }, (_, i) => {
    const slot = i + 1
    const found = entry.hints.find((h) => h.slot === slot)
    if (found) {
      return { slot, text: found.text, isUnlocked: true }
    }
    return { slot, text: '', isUnlocked: false }
  })
}

export async function fetchStudentData(studentId: string): Promise<StudentData> {
  // Simulate a short async delay (mirrors a real API call)
  await new Promise((resolve) => setTimeout(resolve, 200))

  const entry = db.students.find(
    (s) => s.id.toLowerCase() === studentId.toLowerCase(),
  )

  if (!entry) {
    // Return an empty placeholder so the UI doesn't crash on unknown IDs
    return {
      id: studentId,
      name: undefined,
      hints: Array.from({ length: TOTAL_HINTS }, (_, i) => ({
        slot: i + 1,
        text: '',
        isUnlocked: false,
      })),
    }
  }

  return {
    id: entry.id,
    name: entry.name,
    hints: buildHints(entry),
  }
}

export function validateStudentId(id: string): boolean {
  return id.trim().length >= 4
}
