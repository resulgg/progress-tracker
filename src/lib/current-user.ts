import { auth } from "@/auth";

const currentUser = async () => {
  const session = await auth();
  return session?.user;
};
export default currentUser;
