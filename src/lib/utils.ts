import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { type CreateEmailData } from "./types/resend"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
