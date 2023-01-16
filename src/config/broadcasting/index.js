import Pusher from "pusher-js";
Pusher;
import Echo from "laravel-echo";

Pusher.Runtime.createXHR = function () {
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  return xhr;
};

let echo = (window.Echo = new Echo({
  authEndpoint: `${import.meta.env.VITE_API_BASE_URL}broadcasting/auth`,
  broadcaster: "pusher",
  key: "a4387e2f9e5aafd40e4e",
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  encrypted: true,
  withCredentials: true,
}));

export default echo;
