import { inngest } from "~/lib/inngest"
import { tankReminder } from "~/lib/inngest/functions"
import { serve } from "inngest/next"

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve(inngest, [tankReminder])
