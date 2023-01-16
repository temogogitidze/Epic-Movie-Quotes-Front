import { useAuthStore } from "@/stores/useAuthStore";

const isNotAuthenticated = () => {
  const authStore = useAuthStore();
  if (authStore.authenticated) {
    authStore.isNotAuthenticated = false;
    return "/forbidden";
  }
};

export default isNotAuthenticated;
