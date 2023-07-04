import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string(),
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string(),
  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: z.string(),
})

export const CONSTANTS = envSchema.parse(process.env)

export const envURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://next-dorsal.vercel.app"

export const headerOptions = [
  {
    name: "Overview",
    subHeading: "A brief overview of your tanks",
    image:
      "https://images.unsplash.com/photo-1552863045-991883e6f59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
  },
  {
    name: "Aquariums",
    subHeading: "Your aquariums",
    image:
      "https://images.unsplash.com/photo-1512391806023-e43a4e65899f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    name: "Live Stock",
    subHeading: "All of your live stock",
    image:
      "https://images.unsplash.com/photo-1516683037151-9a17603a8dc7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=699&q=80",
  },
  {
    name: "Community",
    subHeading: "Find out what other users are doing",
    image:
      "https://images.unsplash.com/photo-1516970739312-08b075784b71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80",
  },
]

export const TankTabOptions: { label: string }[] = [
  {
    label: "Overview",
  },
  {
    label: "Reminders",
  },
  {
    label: "Fish",
  },
  {
    label: "Plants",
  },
]
