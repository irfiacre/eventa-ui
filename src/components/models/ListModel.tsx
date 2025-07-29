import React, { useEffect, useState } from "react";
import BaseCard from "../cards/BaseCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import { manageBooking, getBookings } from "@/services/backend";
import { redirect } from "next/navigation";
import isAuth from "../isAuth";

const ConfirmModel = ({
  title,
  handleClose,
}: {
  title: string;
  handleClose: () => void;
}) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(1);

  
  useEffect(() => {
    (async () => {
      setLoading(false);
      const result = await getBookings();
      if (result.message) {
        redirect("/auth");
      }
      setBookings(result);
      setLoading(false);
    })();
  }, [refresh]);

  const handleChangeStatus = async (id: string, status: string) => {
    setLoading(true);
    await manageBooking(id, "PUT", { status });
    setRefresh((prevState: number) => prevState + 1);
    setLoading(false);
  };  

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity flex justify-center items-center z-50">
      <div className="h-4/5 w-4/5">
        <BaseCard className="p-5 space-y-5 h-full w-full">
          <div className="p-2.5 text-center sm:items-center sm:p-0">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 sm:mx-0 sm:size-10">
                  <Icon
                    icon="tabler:list"
                    fontSize={28}
                    className="size-6 text-primary"
                  />
                </div>
                <div>
                  <p className="text-center sm:mt-0 sm:ml-4 sm:text-left text-2xl">
                    {title}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6">
              {bookings.map((booking: any) => (
                <div
                  key={booking.id}
                  className="my-3 text-center sm:mt-0 sm:text-left w-full bg-white border border-backgroundColor2 p-3 rounded-xl flex flex-row justify-between items-center"
                >
                  <span className="font-semibold text-black capitalize">
                    {booking.event.title}
                  </span>
                  <span className="font-normal text-gray-500 capitalize">
                    {" "}
                    {booking.status}{" "}
                  </span>
                  <div className="space-x-5">
                    <button
                      className="inline-flex items-center p-2 text-sm font-medium text-center bg-primary/10  text-primary rounded-full hover:bg-primary hover:text-white focus:outline-none disabled:bg-black/10 disabled:text-black"
                      type="button"
                      disabled={booking.status !== "pending"}
                      onClick={() =>
                        handleChangeStatus(booking.id, "confirmed")
                      }
                    >
                      <Icon icon="tabler:check" fontSize={20} />
                    </button>
                    <button
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-red-600 bg-inherit rounded-full hover:bg-red-600 hover:text-white focus:outline-none disabled:text-gray-700"
                      type="button"
                      disabled={booking.status === "cancelled"}
                      onClick={() =>
                        handleChangeStatus(booking.id, "cancelled")
                      }
                    >
                      <Icon icon="emojione-monotone:cross-mark" fontSize={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                data-autofocus
                disabled={loading}
                onClick={() => handleClose()}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto disabled:text-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  );
};

export default isAuth(ConfirmModel);
