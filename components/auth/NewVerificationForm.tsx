"use client";

import { BeatLoader } from "react-spinners";
import { CardWrapper } from "./CardWrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/server-actions/new-verification";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { appRoutes } from "@/lib/utils/enums";

const NewVerificationForm = () => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const searchedParams = useSearchParams();
  const token = searchedParams.get("token");

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Missing token!");
      return;
    }

    try {
      const res = await newVerification(token);
      if (res?.error) setError(res.error);
      if (res?.success) setSuccess(res.success);
    } catch (error) {
      setError("Something went wrong!");
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirm your verification"
      backButtonLabel="Back to login"
      backButtonHref={appRoutes.LOGIN}
    >
      <div className="w-full flex items-center justify-center">
        {Boolean(!error && !success) && <BeatLoader />}
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
