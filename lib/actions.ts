"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";

import { writeClient } from "@/sanity/lib/write-client";
import slugify from 'react-slugify';
import { Session } from "next-auth";
import { Any } from "next-sanity";
// Ensure session.user.id exists
// -----------------------------


declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    };
  }
}
type ServerActionSuccess = { _id: string; status: "SUCCESS"; error: "" };
type ServerActionError = { status: "ERROR"; error: string };
type ServerActionResponse = ServerActionSuccess | ServerActionError;


export const createPitch = async (
  state: Any,
  form: FormData,
  pitch: string,
):Promise<ServerActionResponse>=> {
  const session = await auth();
console.log("👤 Session:", session);
    if (!session)
    {
        console.log("❌ Not signed in");
        return parseServerActionResponse({
            error: "Not signed in",
            status: "ERROR",
        })
    };

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

    const slug = slugify(title as string, {});

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type:  "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session.user.id,
      },
        pitch,
      views: 0,
    };
    console.log("📤 Startup object to save:", startup);
    const result = await writeClient.create({
      _type: "startup",
      ...startup,
    });
 console.log("✅ Sanity result:", result);
    return parseServerActionResponse<ServerActionSuccess>({
      ...result,
      error: "",
      status: "SUCCESS",
    }) 
  } catch (error) {
    console.log(error);

    return parseServerActionResponse<ServerActionError>({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};