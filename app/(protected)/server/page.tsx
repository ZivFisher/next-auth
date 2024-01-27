import UserInfo from "@/components/auth/UserInfo";
import { currentUser } from "@/lib/utils/consts/auth";

const ServerPage = async () => {
  const user = await currentUser();
  return <UserInfo user={user} label="Server component" />;
};

export default ServerPage;
