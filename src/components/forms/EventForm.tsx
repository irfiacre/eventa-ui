"use client";
import React, { useEffect, useState } from "react";
import BaseInput from "../inputs/BaseInput";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CldImage, CldUploadButton, CldVideoPlayer } from "next-cloudinary";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface EventState {
  title: string;
  description: string;
  location: string;
  date: Date;
  capacity: string;
  price: string;
  thumbnail: string;
  id?: string;
}

const EventForm = ({
  onFormSubmit,
  loading,
  defaultValues,
}: {
  onFormSubmit: (obj: EventState) => void;
  loading: boolean;
  defaultValues?: any;
}) => {
  const [state, setState] = useState<EventState>({
    title: "",
    description: "",
    price: "",
    location: "",
    date: new Date(),
    capacity: "",
    thumbnail: "",
  });
  const [imageUrlArray, setImageUrlArray] = useState<Array<string>>([]);
  const [error, setError] = useState<any>({
    title: "",
    price: "",
    capacity: "",
    location: "",
    imageUpload: "",
  });

  const handleInputChange = (e: any) => {
    e.preventDefault();

    setState((prevState: any) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    setError((prevState: any) => ({ ...prevState, [e.target.id]: "" }));
  };

  const handleSubmitForm = (e: any) => {    
    e.preventDefault();
    if (state.title === "") {
      setError((prevState: any) => ({
        ...prevState,
        title: "Title is required!",
      }));
      return;
    }
    if (state.price === "") {
      setError((prevState: any) => ({
        ...prevState,
        price: "Price is required!",
      }));
      return;
    }
    if (state.location === "") {
      setError((prevState: any) => ({
        ...prevState,
        capacity: "Location is required!",
      }));
      return;
    }
    if (state.capacity === "") {
      setError((prevState: any) => ({
        ...prevState,
        capacity: "Capacity is required!",
      }));
      return;
    }
    onFormSubmit({ ...state });
  };

  useEffect(() => {
    setState({
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      price: defaultValues?.price || "",
      location: defaultValues?.location || "",
      date: defaultValues?.date || new Date(),
      capacity: defaultValues?.capacity || "",
      thumbnail: defaultValues?.thumbnail || "",
    });
  }, [defaultValues]);

  const handleSuccess = (result: any, widget: any) => {
    if (result?.info) {
      setState((prevState: any) => ({
        ...prevState,
        thumbnail: result?.info.secure_url,
      }));
    }
    setError((prevState: any) => ({
      ...prevState,
      imageUpload: "",
    }));
    widget.close({ quiet: true });
  };

  const handleError = (error: any, _widget: any) => {
    setError(error);
    setError((prevState: any) => ({
      ...prevState,
      imageUpload: error,
    }));
  };

  const handleChangeDate = (dateText: Date) => {
    setState((prevState: any) => ({
      ...prevState,
      date: dateText,
    }));
  };

  return (
    <form className="w-full">
      <div>
        <div className="w-full flex flex-row justify-between">
          <div className="w-full">
            <BaseInput
              label="Title"
              value={state.title}
              placeholder="Title for the listing"
              onInputChange={handleInputChange}
              required
              error={error.title}
            />
          </div>
        </div>
        <div className="w-full flex flex-row justify-between mb-2">
          <div
            className={`w-full p-3.5 block mb-2 ${
              error.price && "text-red-500"
            }`}
          >
            <label htmlFor="price" className="block mb-2 text-base">
              Price *
            </label>
            <input
              type="number"
              id="price"
              className={`block w-full p-2 h-14 ${
                error.price
                  ? "bg-red-50 border border-red-500 text-red-900"
                  : "bg-backgroundColor border border-borderColorLight focus:bg-white focus:border-borderColorLight"
              } text-md rounded-md  focus:outline-none disabled:bg-backgroundColor2`}
              placeholder="Enter desired price event..."
              value={state.price}
              onChange={handleInputChange}
              required
            />
            {error.capacity && (
              <p className="mt-2 text-sm text-red-500">{error.price}</p>
            )}
          </div>
          <div
            className={`w-full p-3.5 block mb-2 ${
              error.capacity && "text-red-500"
            }`}
          >
            <label htmlFor="capacity" className="block mb-2 text-base">
              Capacity *
            </label>
            <input
              type="number"
              id="capacity"
              className={`block w-full p-2 h-14 ${
                error.capacity
                  ? "bg-red-50 border border-red-500 text-red-900"
                  : "bg-backgroundColor border border-borderColorLight focus:bg-white focus:border-borderColorLight"
              } text-md rounded-md  focus:outline-none disabled:bg-backgroundColor2`}
              placeholder="Enter number of capacity in the event..."
              value={state.capacity}
              onChange={handleInputChange}
            />
            {error.capacity && (
              <p className="mt-2 text-sm text-red-500">{error.capacity}</p>
            )}
          </div>
        </div>
        <div className="w-full flex flex-row justify-between">
          <div className="w-full">
            <BaseInput
              label="location"
              value={state.location}
              placeholder="Address location"
              onInputChange={handleInputChange}
              required
              error={error.location}
            />
          </div>
          <div className="w-full p-3.5 block mb-2">
            <label htmlFor="furnished" className="mb-2 px-2 text-base">
              Date of event
            </label>
            <div className="p-2">
              <DatePicker
                selected={state.date}
                onChange={(date: any) => handleChangeDate(date)}
                className="block w-full p-2 h-14 bg-backgroundColor border border-borderColorLight focus:bg-white focus:border-borderColorLight text-md rounded-md  focus:outline-none disabled:bg-backgroundColor2"
              />
            </div>
          </div>
        </div>
        <div className="w-full p-3.5 block mb-2">
          <label htmlFor="furnished" className="mb-2 text-base">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="block w-full p-2 h-14 bg-backgroundColor border border-borderColorLight focus:bg-white focus:border-borderColorLight text-md rounded-md  focus:outline-none disabled:bg-backgroundColor2"
            placeholder="Enter description for the event..."
            value={state.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="m-3.5">
          <label className="block mb-2 text-base text-textDarkColor font-bold">
            Upload Event Images
          </label>
          <CldUploadButton
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
            className="m-1.5 flex gap-2 text-textLightColor bg-white hover:bg-primary hover:text-white hover:border-primary focus:outline-none rounded-lg text-sm text-center p-2 border border-borderColorLight"
            onError={handleError}
            onSuccess={handleSuccess}
            options={{
              clientAllowedFormats: ["image"],
              sources: ["local", "camera", "url"],
            }}
          >
            <Icon icon="line-md:cloud-upload-loop" fontSize={20} /> Upload
          </CldUploadButton>
          {error && (
            <p className="mt-2 text-xs text-red-600">{error.statusText}</p>
          )}

          {state.thumbnail && (
            <div className="py-2 space-y-2">
              <p className="text-sm text-textLightColor">Uploaded image</p>
              <div className="flex flex-row flex-wrap items-center justify-start gap-5">
                <CldImage
                  width={200}
                  height={100}
                  src={state.thumbnail}
                  alt="Uploaded image"
                  className="rounded-lg h-28 w-52 object-cover"
                />
              </div>
            </div>
          )}
        </div>

        <div className="text-textLightColor text-sm font-light p-2.5">
          <span>* Is for Required Fields</span>
        </div>
      </div>
      <div className="p-3.5">
        <button
          type="submit"
          onClick={handleSubmitForm}
          className="w-full h-16 text-white bg-primary hover:bg-primaryDark focus:outline-none  font-medium rounded-md text-md text-center py-3 disabled:bg-gray-500"
          disabled={loading}
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
