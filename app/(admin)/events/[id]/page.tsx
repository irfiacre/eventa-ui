"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BaseCard from "@/src/components/cards/BaseCard";
import isAuth from "@/src/components/isAuth";
import { toast } from "react-toastify";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { manageEvent } from "@/services/backend";
import { CldImage } from "next-cloudinary";
import ConfirmModel from "@/src/components/models/ConfirmModel";

const EventPage = ({ user }: { user: any }) => {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);
  

  useEffect(() => {
    if (!params.id) return;
    (async () => {
      const result = await manageEvent(params.id);
      setEvent(result);
      setLoading(false);
    })();
  }, [params.id]);

  const deleteEvent = async (propert_id: string) => {
    const result = await manageEvent(propert_id, "DELETE");
    toast.success(`Your event was REMOVED successfuly!`, {
      hideProgressBar: true,
      closeOnClick: true,
      autoClose: 2000,
    });
    router.replace("/dashboard");
  };
  
  if (loading)
    return (
      <BaseCard className="px-10 py-10 text-textDarkColor space-y-5">
        <div>Loading...</div>
      </BaseCard>
    );
  
    const handleConfirmDelete = () => {
      deleteEvent(event.event_id!);
      setOpen(false);
    };


  return (
    <BaseCard className="px-10 py-10 text-textDarkColor space-y-5">
      {open && (
        <ConfirmModel
          title={`Are you sure you want to delete "${event.title}"`}
          subtitle="This action is irreversible and permanent"
          loading={loading}
          handleConfirmed={handleConfirmDelete}
          handleClose={() => setOpen(false)}
          isDelete
        />
      )}
      <div className=" flex flex-row max-md:flex-col max-md:divide-y-2 md:divide-x-2">
        <div className="w-full pr-5">
          <div className="w-full flex flex-row justify-between items-center">
            <h1 className="text-lg font-semibold text-textDarkColor">
              {event?.title}
            </h1>
            <div>
              <div className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-textLightColor bg-inherit rounded-full hover:bg-primary hover:text-white focus:outline-none">
                <Link href={`/properties/edit/${event?.event_id}`}>
                  <Icon icon="tabler:edit" fontSize={28} />
                </Link>
              </div>
              <button
                className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-red-600 bg-inherit rounded-full hover:bg-red-600 hover:text-white focus:outline-none"
                type="button"
                onClick={() => setOpen(true)}
              >
                <Icon icon="mdi:delete" fontSize={28} />
              </button>
            </div>
          </div>

          <p className="text-sm text-textLightColor py-5 text-justify">
            {event?.description}
          </p>
        </div>
        <div className="w-2/4">
          <div className="w-full md:px-10 max-md:pt-10 text-textLightColor">
            <h1 className="text-xl font-medium pb-5">More Details</h1>
            <p>Status: {event?.status}</p>
            <p>Price: {event?.price}</p>
            <p>Rooms: {event?.rooms}</p>
            <p>
              Address:
              {`${event?.province}, ${event?.district}, ${event?.sector}`}
            </p>
            <p>Furnished: {event?.furnished ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
      <div className="w-full">
        {event?.photo_urls[0] && (
          <div className="py-2 space-y-2">
            <span className="text-sm text-textLightColor">Event images</span>
            <div className="flex flex-row flex-wrap items-center justify-start gap-5">
              {event?.photo_urls.map((imageUrl: any) => (
                <div key={imageUrl}>
                  <CldImage
                    width={200}
                    height={100}
                    src={imageUrl}
                    alt="Uploaded image"
                    className="rounded-lg h-28 w-52 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </BaseCard>
  );
};

export default isAuth(EventPage);
