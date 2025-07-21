"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BaseCard from "@/src/components/cards/BaseCard";
import isAuth from "@/src/components/isAuth";
import { toast } from "react-toastify";
import "react-multi-carousel/lib/styles.css";
import {
  createBooking,
  getEvents,
  manageBooking,
  manageEvent,
} from "@/services/backend";
import ConfirmModel from "@/src/components/models/ConfirmModel";
import { DEFAULT_IMAGE } from "@/constants/fixtures";
import Image from "next/image";
import BaseButton from "@/src/components/BaseButton";
import NavigationSection from "@/src/components/landingPage/Navigation";
import Footer from "@/src/components/landingPage/Footer";
import moment from "moment";
import { formatPrice } from "@/util/helpers";

const EventPage = ({ user }: { user: any }) => {
  const params = useParams();
  const [event, setEvent] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [booking, setBooking] = useState<any>({});
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!params.id) return;
    (async () => {
      setLoading(false);
      const result = await getEvents(params.id);
      setEvent(result);
      setLoading(false);
    })();
  }, [params.id]);

  if (loading)
    return (
      <BaseCard className="px-10 py-10 text-textDarkColor space-y-5">
        <div>Loading...</div>
      </BaseCard>
    );

  const handleBuyTicket = async () => {
    setLoading(false);
    const result = await createBooking({ eventId: event.id });
    setLoading(false);

    if (result.message) {
      setMessage(result.message);
    } else {
      setBooking(result);
      setMessage("Your Booking was made");
    }
  };

  return (
    <div>
      <NavigationSection />
      <div className="px-10 py-10 text-textDarkColor space-y-5">
        {open && (
          <ConfirmModel
            title={`Do you want to book a ticket for "${event?.title}"`}
            subtitle={message}
            loading={loading}
            handleConfirmed={handleBuyTicket}
            handleClose={() => setOpen(false)}
          />
        )}
        <div className="w-full">
          <div>
            <Image
              className="rounded-t-xl w-full h-96 object-cover bg-textLightColor"
              loader={() => event?.thumbnail}
              src={event?.thumbnail || DEFAULT_IMAGE}
              alt={`${event?.id}`}
              height={200}
              width={200}
              unoptimized
            />
          </div>
        </div>
        <div className="flex flex-row max-md:flex-col max-md:divide-y-2 md:divide-x-2 max-md:w-full">
          <div className="w-full pr-5">
            <div className="w-full flex flex-row justify-between items-center max-md:flex-col">
              <h1 className="text-lg font-semibold">
                {event?.title} (by {event?.user?.firstName}{" "}
                {event?.user?.lastName})
              </h1>
              <div>
                <BaseButton
                  text="Buy Ticket"
                  handleSubmit={() => setOpen(true)}
                />
              </div>
            </div>
            <div className="text-textLightColor text-justify space-y-2">
              <span className="text-sm">
                {moment(event?.date).format("MMMM D, YYYY h:mm A")}
              </span>
              {moment(event?.date).isAfter(moment()) && (
                <span className="ml-1 text-sm">
                  ({moment(event?.date).diff(moment(), "days")} days remaining)
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
      </div>
      <Footer />
    </div>
  );
};

export default isAuth(EventPage);
