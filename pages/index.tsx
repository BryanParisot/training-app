import useCurrentUser from "@/hooks/useCurrentUser"
import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }
  return {
    props: {}
  } 
}


export default function Home() {
  const { data: user } = useCurrentUser()

  return (
    <>
      <div>Hello home {user?.email}</div>

      <button className="bg-white p-2 text-black" onClick={() => signOut()}>Logout</button>
    </>
  )
}
