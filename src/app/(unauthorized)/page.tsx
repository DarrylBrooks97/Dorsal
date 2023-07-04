import SignupButton from "./components/client/SignupButton"

export default function Page() {
  return (
    <div className="flex h-72 w-full flex-col items-center justify-center space-y-3">
      <h1 className="text-center text-xl">
        <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-5xl font-semibold text-transparent">
          A simplified way
        </span>
        <br />
        to manage your aquariums
      </h1>
      <SignupButton />
    </div>
  )
}
