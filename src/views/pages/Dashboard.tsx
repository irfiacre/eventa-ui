import AnalyticsCard from "@/src/components/cards/AnalyticsCard";
import React, { useEffect, useState } from "react";
import Events from "@/src/components/tables/Events";
import {
  // getAnalytics,
  getEvents,
  manageEvent,
} from "@/services/backend";
import { toast } from "react-toastify";
import { formatPrice } from "@/util/helpers";
import Head from "next/head";

const DashboardPage = ({ userInfo }: { userInfo: any }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<Array<any>>([]);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [analytics, setAnalytics] = useState<Array<any>>([]);

  useEffect(() => {
    // if (userInfo) {
      (async () => {
        setLoading(true);
        const eventsResult = await getEvents(
          // userInfo.user_id
        );        
        setEvents(eventsResult);
        const analyticsResult: any = {}
        // await getAnalytics(userInfo.id);
        setAnalytics([
          {
            title: "Events",
            count: 4
          },
          {
            title: "Bookings",
            count:  3,
          },
          {
            title: "Earnings",
            count: formatPrice(10000),
          },
        ]);
        setLoading(false);
      })();
    // }
  }, [refetch, userInfo]);

  const deleteEvent = async (id: string) => {
    const result = await manageEvent(id, "DELETE");
    toast.success(`Your event was REMOVED successfuly!`, {
      hideProgressBar: true,
      closeOnClick: true,
      autoClose: 2000,
    });
    setRefetch(true);
  };

  return (
    <div className="flex flex-col gap-5 space-y-2.5">
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex flex-row flex-wrap justify-start max-md:justify-start items-center gap-5 py-1.5">
        {analytics.map((item) => (
          <div className="w-1/4 py-1.5 max-sm:w-32" key={item.title}>
            <AnalyticsCard title={item.title} count={item.count} />
          </div>
        ))}
      </div>
      <div>
        <h1 className="text-primary text-2xl capitalize pb-4">
          My Events
        </h1>
        <Events
          data={events}
          loading={loading}
          deleteEvent={deleteEvent}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
