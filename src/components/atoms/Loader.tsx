import { Center } from "@chakra-ui/react"
import Spinner from "src/components/Spinner"

export function Loader() {
  return (
    <Center w="100vw" h="100vh">
      <Spinner />
    </Center>
  )
}
