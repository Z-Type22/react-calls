import { useCurrentUser } from "@/app/providers/user/UserProvider";

export const Home = () => {
  const { currentUser } = useCurrentUser();

  return (
    <>
      <h1>{currentUser?.username}</h1>
      <img src={currentUser?.avatar} alt="" />
    </>
  )
}
