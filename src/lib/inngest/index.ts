import { EventSchemas, Inngest } from "inngest"

export type ProfileUpdate = {
  name: "profile/update"
  data: {
    id: string
    name: string
    photo: string
  }
}

export type TankReminder = {
  name: "tank/reminder"
  data: {
    userId: string
    message: string
    timestamp: string
  }
}

export type TankUpdate = {
  name: "tank/update"
  data: {
    userId: string
  }
}

export type TankDelete = {
  name: "tank/delete"
  data: {
    userId: string
  }
}

export type Events = ProfileUpdate | TankReminder | TankUpdate | TankDelete

export const inngest = new Inngest({
  name: "Dorsal",
  schemas: new EventSchemas().fromUnion<Events>(),
})
