"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BaseCard from "@/src/components/cards/BaseCard";
import isAuth from "@/src/components/isAuth";
import { toast } from "react-toastify";
import "react-multi-carousel/lib/styles.css";
import { manageEvent } from "@/services/backend";
import ConfirmModel from "@/src/components/models/ConfirmModel";
import { DEFAULT_IMAGE } from "@/constants/fixtures";
import Image from "next/image";
import { formatPrice } from "../../util/helpers";
import BaseButton from "@/src/components/BaseButton";
import NavigationSection from "@/src/components/landingPage/Navigation";
import Footer from "@/src/components/landingPage/Footer";
import moment from "moment";

const EventPage = ({ user }: { user: any }) => {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>({
    id: "1a2b3c4d-1111-2222-3333-abcdefabcdef",
    title: "Kigali Jazz Night",
    description:
      "An evening of smooth jazz with local and international artists.",
    location: "Kigali Convention Centre",
    date: new Date("2026-07-12T19:00:00"),
    capacity: 300,
    price: 15000,
    thumbnail:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    sits: 500,
    owner: "Kigali Events",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!params.id) return;
    (async () => {
      // const result = await manageEvent(params.id);
      // setEvent(result);
      setLoading(false);
    })();
  }, [params.id]);

  if (loading)
    return (
      <BaseCard className="px-10 py-10 text-textDarkColor space-y-5">
        <div>Loading...</div>
      </BaseCard>
    );

  const handleBuyTicket = () => {
    setOpen(false);
  };

  console.log("---->", event);
  return (
    <div>
      <NavigationSection user={{}} />
      <div className="px-10 py-10 text-textDarkColor space-y-5">
        {open && (
          <ConfirmModel
            title={`Are you sure you want to delete "${event.title}"`}
            subtitle="This action is irreversible and permanent"
            loading={loading}
            handleConfirmed={handleBuyTicket}
            handleClose={() => setOpen(false)}
            isDelete
          />
        )}
        <div className="w-full">
          <div>
            <Image
              className="rounded-t-xl w-full h-96 object-cover bg-textLightColor"
              loader={() => event.thumbnail}
              src={event.thumbnail || DEFAULT_IMAGE}
              alt={`${event.id}`}
              height={200}
              width={200}
              unoptimized
            />
          </div>
        </div>
        <div className="flex flex-row max-md:flex-col max-md:divide-y-2 md:divide-x-2 max-md:w-full">
          <div className="w-full pr-5">
            <div className="w-full flex flex-row justify-between items-center max-md:flex-col">
              <h1 className="text-lg font-semibold text-textDarkColor">
                {event?.title} (by {event?.owner})
              </h1>
              <div>
                <BaseButton text="Buy Ticket" handleSubmit={handleBuyTicket} />
              </div>
            </div>
            <div className="text-textLightColor text-justify space-y-2">
              <span className="text-sm">{moment(event.date).format("MMMM D, YYYY h:mm A")}</span>
              {moment(event.date).isAfter(moment()) && (
                <span className="ml-1 text-sm">
                  ({moment(event.date).diff(moment(), "days")} days remaining)
                </span>
              )}
              <p>{event?.description}</p>
            </div>
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
                    {event.location}
                  </span>
                </p>
                <div>
                  {event && (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        event.location
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
      </div>
      <Footer />
    </div>
  );
};

export default EventPage;
