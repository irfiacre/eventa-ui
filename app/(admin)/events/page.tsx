"use client";
import React, { useEffect, useState } from "react";
import isAuth from "@/src/components/isAuth";
import EventForm from "@/src/components/forms/EventForm";
import { createEvent } from "@/services/backend";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AddEvent = ({ user }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);  

  const handleOnSubmit = async (data: any) => {
    setLoading(true);
    const propertyData = {
      ...data,
      host: user.user_id,
      furnished: data.furnished == "true",
    };

    const result = await createEvent(propertyData);
    if (result.title) {
      toast.success(`Your property "${result.title}" added successfuly!`, {
        hideProgressBar: true,
        closeOnClick: true,
        autoClose: 3000,
      });
    }
    setLoading(false);
    router.replace("/dashboard");
  };

  return (
    // <div>
      <EventForm onFormSubmit={handleOnSubmit} loading={loading} />
    // </div>
  );
};

export default isAuth(AddEvent);
