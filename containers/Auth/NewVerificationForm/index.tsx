"use client";

import { newVerification } from "@/actions/newVerification";
import { FormError, FormSuccess } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
// Core types
import { useCallback, useEffect, useState, type FC } from "react";

export const NewVerificationForm: FC = () => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  if (!token) return <span>No token found!</span>;

  const onSubmit = useCallback(() => {
    newVerification(token)
      .then(data => {
        setSuccess(data.success);
        setError(data.error);

        router.push("/login");
      })
      .catch(err => {
        console.log(err);
        setError("An error occurred");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div>
      {!success && !error && <span>loading....</span>}

      <FormSuccess message={success} />
      <FormError message={error} />
    </div>
  );
};
