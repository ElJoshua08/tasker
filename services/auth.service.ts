"use server"
import { cookies } from "next/headers"
import { createAdminClient } from "@/lib/server/appwrite"
import { ID } from "node-appwrite"
import { addMonths } from "date-fns"


export const login = async (username: string, password: string) => {
  try {
    const {  account } = await createAdminClient()

    const session = await account.createEmailPasswordSession(username, password)

    cookies().set("auth-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: addMonths(new Date(), 4)
    });

  } catch (e) {
    console.log(e)
  }
}

export const register = async (username: string, email: string, password: string) => {
  try {
    const {  account } = await createAdminClient()

    const user = await account.create(ID.unique(), email, password, username)
    await login(user.name, password)

  } catch (e) {
    console.log(e)
  }
}