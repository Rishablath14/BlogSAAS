"use client"
import { requireUserDB } from "@/utils/requireUser";
import { User } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react"
const AppContext = createContext({});
const AppContextProvider = ({children}:{children:React.ReactNode}) => {
  const [userInfo, setUserInfo] = useState<User&any|null>(null);
  useEffect(() => {
    const getUser = async () => {
      const user = await requireUserDB();
      setUserInfo(user);
    }
    getUser();
  },[])

  return (
    <AppContext.Provider value={{userInfo}}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider

export const useUserInfo = () => useContext(AppContext);