import { resend } from "../resend"

export type CreateEmailData = Parameters<typeof resend.emails.create>[0]
