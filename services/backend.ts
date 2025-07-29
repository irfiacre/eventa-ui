import { getToken } from "@/util/helpers";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const registerUser = async (data: any) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      console.warn(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return { status: response.status, result: json };
  } catch (error) {
    console.warn(error);
    return null;
  }
};

const loginUser = async (data: any) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      console.warn(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return { status: response.status, result };
  } catch (error) {
    console.warn(error);
    return null;
  }
};

const createEvent = async (data: any) => {
  try {
    const TOKEN = getToken();
    const response = await fetch(`${BACKEND_BASE_URL}/events/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(data),
    });
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      console.warn(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

const getEvents = async (eventId?: string | any) => {
  try {
    const response = await fetch(
      eventId
        ? `${BACKEND_BASE_URL}/events/${eventId}/`
        : `${BACKEND_BASE_URL}/events/`,
      { method: "GET" }
    );
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      console.warn(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

const manageEvent = async (
  eventId: string | undefined,
  method: string = "PUT",
  data?: any
) => {
  try {
    const TOKEN = getToken();
    const response = await fetch(
      `${BACKEND_BASE_URL}/events/${eventId}/`,
      method === "PUT"
        ? {
            method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(data),
          }
        : { method }
    );

    if (response.status === 404) return null;
    if (!response.ok) console.warn(`Response status: ${response.status}`);

    const json = await response.json();
    return json;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

const createBooking = async (data: any) => {
  try {
    const TOKEN = getToken();
    const response = await fetch(`${BACKEND_BASE_URL}/bookings/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(data),
    });
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      console.warn(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

const getEventBookings = async (eventId: string | undefined) => {
  try {
    const TOKEN = getToken();
    const response = await fetch(
      `${BACKEND_BASE_URL}/events/${eventId}/bookings`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    if (response.status === 404) return null;
    if (!response.ok) console.warn(`Response status: ${response.status}`);

    const json = await response.json();
    return json;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

const getBookings = async (bookingId?: string) => {
  try {
    const TOKEN = getToken();
    const response = await fetch(
      bookingId
        ? `${BACKEND_BASE_URL}/bookings/${bookingId}/`
        : `${BACKEND_BASE_URL}/bookings/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    if (response.status === 404) return null;
    if (!response.ok) console.warn(`Response status: ${response.status}`);

    const json = await response.json();
    return json;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

const manageBooking = async (
  bookingId: string,
  method: string = "PUT",
  data?: any
) => {
  try {
    const TOKEN = getToken();
    const response = await fetch(
      `${BACKEND_BASE_URL}/bookings/${bookingId}/`,
      method === "PUT"
        ? {
            method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(data),
          }
        : { method }
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      console.warn(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.warn(error);
    return null;
  }
};
const getUserAnalytics = async () => {
  try {
    const TOKEN = getToken();
    const response = await fetch(`${BACKEND_BASE_URL}/analytics/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    if (response.status === 404) {
      return {};
    }
    if (!response.ok) {
      console.warn(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.warn(error);
    return {};
  }
};

export {
  registerUser,
  loginUser,
  createEvent,
  getEvents,
  manageEvent,
  createBooking,
  getBookings,
  manageBooking,
  getEventBookings,
  getUserAnalytics,
};
