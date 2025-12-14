import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormProps = {
  email: string;
  password: string;
};

export const useSignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormProps>();

  const submitSignIn = async (data: FormProps) => {
    setIsSubmitting(true);

    await signOut({ redirect: false });

    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (response?.ok) {
      router.push("/dashboard");
    } else {
      setError("root", { message: "Invalid credentials" });
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    register,
    handleSubmit: handleSubmit(submitSignIn),
    errors,
  };
};
