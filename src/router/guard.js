import { useAuthStore } from "@/stores/useAuthStore";

const isAuthenticated = () => {
  const authStore = useAuthStore();
  if (!authStore.authenticated) {
    return "/forbidden";
  }
};

export default isAuthenticated;
