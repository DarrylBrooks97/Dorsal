import { Dispatch, SetStateAction } from "react"
import { Box, Heading, HStack, Stack, StackProps } from "@chakra-ui/react"
import { UserFish } from "@prisma/client"
import { TrashIcon } from "@radix-ui/react-icons"
import { motion } from "framer-motion"
import { NextImage } from "src/components/atoms"

interface CardProps<T> {
  data: T
  idx: number
  setState: Dispatch<SetStateAction<T>>
  deleteToggle: () => void
}
type DisplayLiveStockData = Pick<UserFish, "id" | "name" | "image_url">

const MotionHStack = motion<StackProps>(HStack)

export const LiveStockCard = <T extends DisplayLiveStockData>({
  data,
  idx,
  setState,
  deleteToggle,
}: CardProps<T>): JSX.Element => {
  return (
    <MotionHStack
      key={data.id}
      w="full"
      spacing={3}
      pos="relative"
      bg="rgba(255,255,255,0.4)"
      rounded="15px"
      initial="initial"
      animate="open"
      variants={{
        initial: {
          y: -5,
          opacity: 0,
        },
        open: {
          y: 0,
          opacity: 1,
          transition: {
            delay: idx * 0.2,
          },
        },
      }}
    >
      <Box
        overflow="hidden"
        position="relative"
        w="full"
        p="calc(100vw / 3)"
        bg="blue"
        rounded="15px"
      >
        <NextImage
          layout="fill"
          alt={data.name}
          src={
            data.image_url ??
            "https://images.unsplash.com/photo-1619611384968-e45fbd60bc5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
          }
        />
        <Stack w="full" pos="absolute" left="0" bottom="2" flexDir="row" justify="center">
          <Box>
            <Heading>{data.name}</Heading>
          </Box>
        </Stack>
        <Box pos="absolute" rounded="15px" bottom="2" right="2">
          <TrashIcon
            color="red"
            width="30px"
            height="30px"
            onClick={() => {
              setState(data)
              deleteToggle()
            }}
          />
        </Box>
      </Box>
    </MotionHStack>
  )
}
