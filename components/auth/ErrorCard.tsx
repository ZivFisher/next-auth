import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "./CardWrapper";
import { appRoutes } from "@/lib/utils/enums";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Something went wrong!"
      backButtonHref={appRoutes.LOGIN}
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
