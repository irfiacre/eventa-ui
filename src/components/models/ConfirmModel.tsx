"use client"
import React, { useState } from "react";
import BaseCard from "../cards/BaseCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import BaseInput from "../inputs/BaseInput";

const ConfirmModel = ({
  title,
  loading,
  handleConfirmed,
  handleClose,
  message,
}: {
  title: string;
  loading: boolean;
  handleConfirmed: (numb: number) => void;
  handleClose: () => void;
  message?: string;
}) => {
  const [bookingsCount, setBookingsCount] = useState<number>(1);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity flex justify-center items-center z-50">
      <div>
        <BaseCard className="h-1/4 p-5 space-y-5">
          <div className="flex flex-col min-h-full items-end justify-center p-2.5 text-center sm:items-center sm:p-0 space-y-2">
            <div className="w-full bg-white px-4 sm:px-6">
              <div className="flex items-center justify-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 sm:mx-0 sm:size-10">
                  <Icon
                    icon="ion:ticket"
                    fontSize={28}
                    className="size-6 text-primary"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <p className="text-xl font-medium">
                    <strong className="text-primary">{title}</strong>
                  </p>
                </div>
              </div>
              <hr className="mt-2" />
            </div>
            <div className="sm:px-6">
              {loading ? (
                <p className="text-lg text-textLightColor font-light">Booking...</p>
              ) : (
                <BaseInput
                  inputType="number"
                  label="Number"
                  value={`${bookingsCount}`}
                  placeholder="number of tickets"
                  onInputChange={(e) => setBookingsCount(parseInt(e.target.value))}
                  containerStyle="flex items-center justify-center gap-5"
                />
              )}
            </div>
            <p className="text-gray-500 pb-3">{message}</p>
            
            <hr className="my-2" />

            <div className="px-6 w-full flex justify-start items-center gap-2">
              <button
                type="button"
                onClick={() => handleConfirmed(bookingsCount)}
                disabled={loading}
                className="w-full justify-center rounded-md bg-primary hover:bg-primary/80 py-3.5 text-sm font-semibold text-white disabled:bg-gray-500"
              >
                Yes
              </button>
              <button
                type="button"
                data-autofocus
                disabled={loading}
                onClick={() => handleClose()}
                className="w-2/4 justify-center rounded-md bg-white py-3.5 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:text-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  );
};

export default ConfirmModel;
