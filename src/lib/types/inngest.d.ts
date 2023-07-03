import { inngest } from "../inngest"

export type CreateFunction = typeof inngest.createFunction
export type FirstArg = Exclude<Parameters<CreateFunction>[0], string>
export type CancelEventsType = Pick<FirstArg, "cancelOn">["cancelOn"]
