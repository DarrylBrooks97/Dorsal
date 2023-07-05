import { clsx, type ClassValue } from "clsx"
import { formatDistanceToNow } from "date-fns"
import { twMerge } from "tailwind-merge"

import { type CreateEmailData } from "./types/resend"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const randIdx = (size = 100) => Math.floor(Math.random() * size)
export const randDate = () => new Date(+new Date() - Math.floor(Math.random() * 10000000000))
export const getDate = (date: string) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export const createEmail = (
  data: Omit<CreateEmailData, "from"> & { message: string; timestamp: any }
) => {
  const newData = {
    to: data.to,
    from: "",
    message: data.message,
    subject: data.subject,
    timestamp: data.timestamp,
  }

  return newData
}
