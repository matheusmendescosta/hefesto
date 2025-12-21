import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormProps = {
  name: string;
  price: number;
  stock: number;
  options: { name: string; price: number }[];
};

export const useNewProduct = () => {
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
      price: 0,
      stock: 0,
      options: [],
    },
  });

  const handlerSubmitTag = (data: FormProps) => {
    if (!session || !session.user) {
      return;
    }

    setIsSubmitting(true);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.user.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        price: data.price,
        stock: data.stock,
        options: data.options,
      }),
    })
      .then((response) => {
        if (response.ok) {
          router.push("/products");
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
    handleSubmit: handleSubmit(handlerSubmitTag),
    control,
    errors,
  };
};
