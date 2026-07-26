import { headers } from "next/headers";
import { Webhook } from "svix";

import {
  createUser,
  updateUser,
  deleteUser,
} from "@/lib/db/repositories/user.repository";

export async function POST(req: Request) {
 

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

 

  if (!WEBHOOK_SECRET) {
    throw new Error("Missing CLERK_WEBHOOK_SECRET");
  }

  try {
    const headerPayload = await headers();

    const svixId = headerPayload.get("svix-id");
    const svixTimestamp = headerPayload.get("svix-timestamp");
    const svixSignature = headerPayload.get("svix-signature");

   

    if (!svixId || !svixTimestamp || !svixSignature) {


      return new Response("Missing Svix headers", {
        status: 400,
      });
    }

    const payload = await req.text();

   

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: any;

    try {
     

      evt = wh.verify(payload, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      });


    } catch (error) {
      console.error("❌ Webhook Verification Failed");
      console.error(error);

      return new Response("Invalid Signature", {
        status: 400,
      });
    }

    const eventType = evt.type;
    const data = evt.data;

   

    switch (eventType) {
      case "user.created":
       

        await createUser({
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          imageUrl: data.image_url,
        });

       
        break;

      case "user.updated":
       
        await updateUser({
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          imageUrl: data.image_url,
        });

        
        break;

      case "user.deleted":
       

        if (data.id) {
          await deleteUser(data.id);
        }

        
        break;

      default:
       
    }

    

    return new Response("Webhook processed", {
      status: 200,
    });
  } catch (error) {
   
    console.error(error);
   

    return new Response("Database Error", {
      status: 500,
    });
  }
}