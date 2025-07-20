"use client";
import { getEvents,manageEvent } from "@/services/backend";
import EventForm from "@/src/components/forms/EventForm";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditEventPage = () => {
  const params = useParams();
  const [event, setProperty] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await getEvents(params.id);
      setProperty(result);
    })();
  }, [params.id]);

  const handleUpdateEvent = async (data: any) => {
    setLoading(true);
    const result = await manageEvent(params?.id, "PUT", data);
    if (result.title) {
      toast.success(`Your event "${result.title}" updated successfuly!`, {
        hideProgressBar: true,
        closeOnClick: true,
        autoClose: 3000,
      });
    }
    setLoading(false);
  };

  return (
    <div>
      {!event.id ? (
        <div className="text-textLightColor text-base font-light text-center p-10 -ml-10">
          <span>Loading Data...</span>
        </div>
      ) : (
        <div>
          <EventForm
            onFormSubmit={handleUpdateEvent}
            loading={loading}
            defaultValues={event}
          />
        </div>
      )}
    </div>
  );
};

export default EditEventPage;
