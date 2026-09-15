"use server";

export type SubscribeState = { status: "idle" | "success" | "error"; message?: string };

export async function subscribe(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Enter an email address like name@example.com." };
  }
  // TODO: call your email provider here.
  return { status: "success" };
}
