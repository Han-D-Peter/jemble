import client from "@/libs/client";

export async function getUsername(userId: string): Promise<string> {
  try {
    const user = await client.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return "";
    if (!user.name) return "";
    return user.name;
  } catch (e) {
    console.log("error", e);
    return "";
  }
}
