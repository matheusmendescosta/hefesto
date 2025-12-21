import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormProps = {
  name: string;
  description: string;
  price: number;
  options: { name: string; price: number; description?: string }[];
};

export const useNewService = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormProps>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      options: [],
    },
  });

  const handlerSubmitService = (data: FormProps) => {
    console.log(data);
    if (!session || !session.user) {
      return;
    }

    setIsSubmitting(true);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.user.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        price: data.price,
        options: data.options,
      }),
    })
      .then((response) => {
        if (response.ok) {
          router.push("/services");
        } else {
          setIsSubmitting(false);
        }
        response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return {
    isSubmitting,
    register,
    handleSubmit: handleSubmit(handlerSubmitService),
    control,
    errors,
  };
};
