import { headers } from "next/headers";
import { Webhook } from "svix";

import {
  createUser,
  updateUser,
  deleteUser,
} from "@/lib/db/repositories/user.repository";

export async function POST(req: Request) {
  console.log("======================================");
  console.log("🔥 Clerk Webhook Received");
  console.log("======================================");

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  console.log("Webhook Secret Exists:", !!WEBHOOK_SECRET);

  if (!WEBHOOK_SECRET) {
    console.error("❌ Missing CLERK_WEBHOOK_SECRET");
    throw new Error("Missing CLERK_WEBHOOK_SECRET");
  }

  try {
    const headerPayload = await headers();

    const svixId = headerPayload.get("svix-id");
    const svixTimestamp = headerPayload.get("svix-timestamp");
    const svixSignature = headerPayload.get("svix-signature");

    console.log("Headers Received:");
    console.log("svix-id:", svixId);
    console.log("svix-timestamp:", svixTimestamp);
    console.log("svix-signature exists:", !!svixSignature);

    if (!svixId || !svixTimestamp || !svixSignature) {
      console.error("❌ Missing Svix Headers");

      return new Response("Missing Svix headers", {
        status: 400,
      });
    }

    const payload = await req.text();

    console.log("Payload Length:", payload.length);

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: any;

    try {
      console.log("🔐 Verifying webhook signature...");

      evt = wh.verify(payload, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      });

      console.log("✅ Signature Verified Successfully");
    } catch (error) {
      console.error("❌ Webhook Verification Failed");
      console.error(error);

      return new Response("Invalid Signature", {
        status: 400,
      });
    }

    const eventType = evt.type;
    const data = evt.data;

    console.log("Event Type:", eventType);
    console.log("User ID:", data.id);

    switch (eventType) {
      case "user.created":
        console.log("➡ Creating User...");

        await createUser({
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          imageUrl: data.image_url,
        });

        console.log("✅ User Created Successfully");
        break;

      case "user.updated":
        console.log("➡ Updating User...");

        await updateUser({
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          imageUrl: data.image_url,
        });

        console.log("✅ User Updated Successfully");
        break;

      case "user.deleted":
        console.log("➡ Deleting User...");

        if (data.id) {
          await deleteUser(data.id);
        }

        console.log("✅ User Deleted Successfully");
        break;

      default:
        console.log("ℹ Ignored Event:", eventType);
    }

    console.log("🎉 Webhook Completed Successfully");
    console.log("======================================");

    return new Response("Webhook processed", {
      status: 200,
    });
  } catch (error) {
    console.error("======================================");
    console.error("❌ DATABASE / SERVER ERROR");
    console.error(error);
    console.error("======================================");

    return new Response("Database Error", {
      status: 500,
    });
  }
}