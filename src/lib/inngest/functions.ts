import db from "~/lib/prisma"

import { inngest } from "../inngest"
import { resend } from "../resend"
import { CancelEventsType } from "../types/inngest"
import { createEmail } from "../utils"

// Reminder cancellation events
const cancelEvents = [
  {
    event: "tank/update",
    match: "data.userId",
    timeout: "23h", // If user updates their tank, cancel the reminder
  },
  {
    event: "tank/delete",
    match: "data.userId",
  },
] satisfies CancelEventsType

export const tankReminder = inngest.createFunction(
  { name: "Tank reminder", cancelOn: cancelEvents },
  { event: "tank/reminder" },
  async ({ event, step }) => {
    const { userId: id, message, timestamp } = event.data

    // Get user information
    const user = await step.run("Get user info", async () => {
      const user = await db.user.findUnique({ where: { id }, select: { email: true } })

      if (!user) throw new Error("User not found")

      return user
    })

    // Create email
    let email = await step.run("Create Email", () => {
      const emailConfig = {
        to: user.email as string,
        subject: "Tank reminder",
        message,
        timestamp,
      }

      return createEmail({ ...emailConfig })
    })

    // Send user reminder email
    await step.run("Send update", async () => {
      return await resend.emails.send({ ...email })
    })

    const userUpdatedTank = await step.waitForEvent("tank/update", {
      match: "data.userId",
      timeout: "24h",
    })

    // If user hasn't updated their tank in a day send another reminder
    if (!userUpdatedTank) {
      email.subject = "Dorsal reminder 🚨"
      email.message = `Don't forget! Your tank still needs maintenance 🙁: ${email.message}`

      await resend.emails.send({ ...email })
    }

    return "User reminded!"
  }
)
