const BACKEND_BASE_URL = process.env.PROD_BACKEND_URL;

const registerUser = async (data: any) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/users/register/`, {
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
    return json;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

const getUserByEmail = async (email: string) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/users/${email}/`, {
      method: "GET",
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

const createEvent = async (data: any) => {
  try {
    // const response = await fetch(`${BACKEND_BASE_URL}/properties/`, {
    const response = await fetch(
      `https://larental.onrender.com/api/properties/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
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

const getEvents = async (userId?: string): Promise<any> => {
  // try {
  //   const response = await fetch(
  //     // `${BACKEND_BASE_URL}/properties/user/${userId}/`,
  //     userId
  //       ? `https://larental.onrender.com/api/properties/user/${userId}/`
  //       : "https://larental.onrender.com/api/properties/",
  //     {
  //       method: "GET",
  //     }
  //   );
  //   if (response.status === 404) {
  //     return null;
  //   }
  //   if (!response.ok) {
  //     console.warn(`Response status: ${response.status}`);
  //   }
  //   const json = await response.json();
  //   return json;
  // } catch (error) {
  //   console.warn(error);
  //   return null;
  // }
  return  [
    {
      id: "1a2b3c4d-1111-2222-3333-abcdefabcdef",
      title: "Kigali Jazz Night",
      description: "An evening of smooth jazz with local and international artists.",
      location: "Kigali Convention Centre",
      date: new Date("2024-07-12T19:00:00"),
      capacity: 300,
      price: 15000,
      thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "2b3c4d5e-4444-5555-6666-bcdefabcdefa",
      title: "Rwanda Tech Expo",
      description: "Showcasing the latest innovations in Rwanda's tech industry.",
      location: "Kigali Arena",
      date: new Date("2024-08-05T10:00:00"),
      capacity: 1000,
      price: 10000,
      thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "3c4d5e6f-7777-8888-9999-cdefabcdefab",
      title: "Lake Kivu Food Festival",
      description: "A celebration of Rwandan cuisine by the beautiful Lake Kivu.",
      location: "Gisenyi Beach",
      date: new Date("2024-09-02T12:00:00"),
      capacity: 500,
      price: 8000,
      thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "4d5e6f7a-aaaa-bbbb-cccc-defabcdefabc",
      title: "Mountain Gorilla Marathon",
      description: "Run through the scenic routes near Volcanoes National Park.",
      location: "Musanze",
      date: new Date("2024-10-20T07:00:00"),
      capacity: 200,
      price: 20000,
      thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "5e6f7a8b-dddd-eeee-ffff-efabcdefabcd",
      title: "Kigali Art Expo",
      description: "Experience contemporary art from Rwanda's top artists.",
      location: "Inema Arts Center",
      date: new Date("2024-11-15T15:00:00"),
      capacity: 250,
      price: 12000,
      thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      },
    ];
};

const manageEvent = async (
  property_id: string | any,
  method: string = "GET",
  data?: any
) => {
  try {
    const response = await fetch(
      // `${BACKEND_BASE_URL}/properties/user/${userId}/`,
      `https://larental.onrender.com/api/properties/${property_id}/`,
      method === "PATCH"
        ? {
          method,
          headers: { "Content-Type": "application/json" },
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

const getHostAnalytics = async (userId: string) => {
  try {
    const response = await fetch(
      `https://larental.onrender.com/api/analytics/${userId}`,
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

const make_user_a_host = async (email: any) => {
  try {
    const response = await fetch(
      // `${BACKEND_BASE_URL}/properties/user/${userId}/`,
      `https://larental.onrender.com/api/users/${email}/`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "host" }),
      }
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

const createBooking = async (data: any) => {
  try {
    // const response = await fetch(`${BACKEND_BASE_URL}/properties/`, {
    const response = await fetch(
      `https://larental.onrender.com/api/bookings/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
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
const manageBooking = async (
  booking_id: string | any,
  method: string = "GET",
  data?: any
) => {
  try {
    const response = await fetch(
      // `${BACKEND_BASE_URL}/bookings/${booking_id}/`,
      `https://larental.onrender.com/api/bookings/${booking_id}/`,
      method === "PATCH"
        ? {
          method,
          headers: { "Content-Type": "application/json" },
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

const findUserEventBooking = async (userId: string, propertyId: string) => {
  try {
    // const response = await fetch(`${BACKEND_BASE_URL}/properties/`, {
    const response = await fetch(
      `https://larental.onrender.com/api/bookings/user/${userId}/property/${propertyId}/`,
      { method: "GET" }
    );

    if (response.status === 404) {
      return null;
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.warn(error);
    return null;
  }
};
export {
  registerUser,
  getUserByEmail,
  createEvent,
  getEvents,
  manageEvent,
  getHostAnalytics,
  make_user_a_host,
  createBooking,
  manageBooking,
  findUserEventBooking,
};
