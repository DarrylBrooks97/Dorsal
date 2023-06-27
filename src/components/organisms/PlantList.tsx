import { useEffect, useState } from "react"
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { UserPlant } from "@prisma/client"
import { useSession } from "next-auth/react"
import { inferQueryResponse } from "pages/api/trpc/[trpc]"
import { LiveStockCard } from "src/components/molecules"
import { trpc } from "src/utils/trpc"

export type FetchedTankData = inferQueryResponse<"user.tanks.byId">
interface FishListProps {
  id: string
}

export function PlantList({ id }: FishListProps) {
  const toast = useToast()
  const { data: tankData } = trpc.useQuery(["user.tanks.byId", { id }])
  const invalidate = trpc.useContext()
  const [selectedPlant, setSelectedPlant] = useState<UserPlant>({} as UserPlant)
  const [filteredPlants, setFilteredPlants] = useState<UserPlant[] | undefined>([])
  const { isOpen: deleteIsOpen, onToggle: deleteOnToggle } = useDisclosure()
  const updater = trpc.useMutation(["user.deletePlant"], {
    onMutate: async (deletedPlant: any) => {
      await invalidate.cancelQuery(["user.tanks.byId", { id }])

      const freshPlants = tankData?.plants.filter(({ id }) => id !== deletedPlant.id)

      invalidate.setQueryData(["user.tanks.byId", { id }], {
        tank: tankData?.tank as FetchedTankData["tank"],
        plants: [...(freshPlants as FetchedTankData["plants"])],
        fish: tankData?.fish as FetchedTankData["fish"],
      })

      return {
        deletedPlant,
      }
    },
    onSettled(_newData, error) {
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      }
      invalidate.invalidateQueries(["user.tanks.byId", { id }])
    },
  })

  useEffect(() => {
    setFilteredPlants(tankData?.plants)
  }, [tankData])

  return (
    <Stack spacing={3} w="calc(100vw - 3rem)">
      <Input
        placeholder="Search Plants"
        bg="white"
        onChange={(e) => {
          setFilteredPlants(
            tankData!.plants.filter((p) =>
              p.name.toLowerCase().includes(e.target.value.toLocaleLowerCase())
            )
          )
        }}
      />
      {filteredPlants?.map((plant, idx) => (
        <LiveStockCard<UserPlant>
          data={plant}
          idx={idx}
          key={plant.id}
          deleteToggle={deleteOnToggle}
          setState={setSelectedPlant}
        />
      ))}
      <Modal isOpen={deleteIsOpen} onClose={deleteOnToggle}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Plant ?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this plant?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" variant="outline" mr={3} onClick={() => deleteOnToggle()}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                updater.mutate({
                  id: selectedPlant?.id as string,
                })
                deleteOnToggle()
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  )
}
