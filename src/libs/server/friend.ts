import client from "../client";

export async function acceptRequestFriend(myId: string, friendId: string) {
  try {
    await client.user.update({
      where: {
        id: myId,
      },
      data: {
        following: {
          connect: {
            id: friendId,
          },
        },
      },
    });
    await client.user.update({
      where: {
        id: friendId,
      },
      data: {
        following: {
          connect: {
            id: myId,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(id: string) {
  try {
    const user = await client.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
