"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BaseCard from "@/src/components/cards/BaseCard";
import isAuth from "@/src/components/isAuth";
import { toast } from "react-toastify";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getEvents, manageEvent } from "@/services/backend";
import { CldImage } from "next-cloudinary";
import ConfirmModel from "@/src/components/models/ConfirmModel2";
import Image from "next/image";
import { DEFAULT_IMAGE } from "@/constants/fixtures";
import { formatPrice } from "@/util/helpers";
import moment from "moment";

const EventPage = ({ user }: { user: any }) => {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!params.id) return;
    (async () => {
      const result = await getEvents(params.id);
      setEvent(result);
      setLoading(false);
    })();
  }, [params.id]);

  const deleteEvent = async (eventId: string) => {
    const result = await manageEvent(eventId, "DELETE");
    toast.success("Your event was REMOVED successfuly!", {
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
    deleteEvent(event.id!);
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
      <div className="flex flex-row max-md:flex-col max-md:divide-y-2 md:divide-x-2">
        <div className="w-full pr-5">
          <div className="w-full flex flex-row justify-between items-center">
            <h1 className="text-lg font-semibold text-textDarkColor">
              {event?.title}
            </h1>
            <div>
              <div className="inline-flex items-center p-2 text-sm font-medium text-center text-textLightColor bg-inherit rounded-full hover:bg-primary hover:text-white focus:outline-none cursor-pointer">
                <Link href={`/events/edit/${event?.id}`}>
                  <Icon icon="tabler:edit" fontSize={28} />
                </Link>
              </div>
              <button
                className="inline-flex items-center p-2 text-sm font-medium text-center text-red-600 bg-inherit rounded-full hover:bg-red-600 hover:text-white focus:outline-none cursor-pointer"
                type="button"
                onClick={() => setOpen(true)}
              >
                <Icon icon="mdi:delete" fontSize={28} />
              </button>
            </div>
          </div>
          <div className="w-full">
            <div>
              <Image
                className="rounded-xl w-full h-56 object-cover bg-textLightColor"
                loader={() => event?.thumbnail}
                src={event?.thumbnail || DEFAULT_IMAGE}
                alt={`${event?.id}`}
                height={200}
                width={200}
                unoptimized
              />
            </div>
          </div>
          <p className="text-sm text-textLightColor py-5 text-justify">
            {event?.description}
          </p>
        </div>

        <div className="w-2/4 max-md:w-full">
          <div className="w-full md:px-10 max-md:pt-10 space-y-2">
            <p>
              Remaining <strong>{event?.sits}</strong> Sits
            </p>
            <p>Price: RWF {formatPrice(event?.price)}</p>
            <div className="py-5 space-y-2 w-full">
              <div>
                <strong>Address: </strong>
              </div>
              <p>
                Happening at{" "}
                <span className="font-semibold text-textLightColor">
                  {event?.location}
                </span>
              </p>
              <div>
                {event && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      event?.location
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline text-sm"
                  >
                    View on Google Maps
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  );
};

export default isAuth(EventPage);
