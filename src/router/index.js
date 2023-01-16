import { createRouter, createWebHistory } from "vue-router";
import LandingView from "@/views/LandingView.vue";
import ForbiddenPage from "@/components/pages/error-pages/ForbiddenPage.vue";
import NotFoundPage from "@/components/pages/error-pages/NotFoundPage.vue";
import VerifyEmailPage from "@/components/pages/VerifyEmailPage.vue";
import EmailSentPage from "@/components/pages/EmailSentPage.vue";
import EmailVerifiedPage from "@/components/pages/EmailVerifiedPage.vue";
import ForgotPasswordPage from "@/components/pages/ForgotPasswordPage.vue";
import CheckYourEmailPage from "@/components/pages/CheckYourEmailPage.vue";
import ResetPasswordPage from "@/components/pages/ResetPasswordPage.vue";
import PasswordChangedPage from "@/components/pages/PasswordChangedPage.vue";
import NewsfeedPage from "@/components/pages/user/newsfeed/NewsfeedPage.vue";
import MoviePage from "@/components/pages/user/movies/MoviePage.vue";
import MoviesPage from "@/components/pages/user/movies/MoviesPage.vue";
import ProfilePage from "@/components/pages/user/profile/ProfilePage.vue";
import isAuthenticated from "@/router/guard.js";
import isNotAuthenticated from "@/router/unauth-guard.js";
import RedirectPage from "@/components/pages/RedirectPage.vue";
import SecondaryEmailVerified from "@/components/pages/SecondaryEmailVerified.vue";

import { useAuthStore } from "@/stores/useAuthStore.js";
import axios from "@/config/axios/index.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/forbidden",
      name: "forbidden",
      component: ForbiddenPage,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundPage,
    },
    {
      path: "/email-sent",
      name: "email-sent",
      component: EmailSentPage,
      beforeEnter: isNotAuthenticated,
    },
    {
      path: "/verify-email",
      name: "verify-email",
      component: VerifyEmailPage,
      beforeEnter: isNotAuthenticated,
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPasswordPage,
      beforeEnter: isNotAuthenticated,
    },
    {
      path: "/forgot-password-check-email",
      name: "check-email",
      component: CheckYourEmailPage,
      beforeEnter: isNotAuthenticated,
    },
    {
      path: "/reset-password/:token",
      name: "reset-password",
      component: ResetPasswordPage,
      beforeEnter: isNotAuthenticated,
    },
    {
      path: "/password-changed",
      name: "password-changed",
      component: PasswordChangedPage,
      beforeEnter: isNotAuthenticated,
    },
    {
      path: "/email/:token",
      name: "email-verified",
      component: EmailVerifiedPage,
    },
    {
      path: "/secondary-email/:token",
      name: "secondary-email-verified",
      component: SecondaryEmailVerified,
    },
    {
      path: "/",
      name: "home",
      component: LandingView,
      beforeEnter: isNotAuthenticated,
    },
    {
      path: "/redirecting",
      name: "redirect-page",
      component: RedirectPage,
    },
    {
      path: "/newsfeed",
      name: "news-feed",
      component: NewsfeedPage,
      beforeEnter: isAuthenticated,
    },
    {
      path: "/movies",
      name: "list-of-movies",
      component: MoviesPage,
      beforeEnter: isAuthenticated,
    },
    {
      path: "/movie/:id",
      name: "movie-page",
      component: MoviePage,
      beforeEnter: isAuthenticated,
    },
    {
      path: "/profile",
      name: "profile-page",
      component: ProfilePage,
      beforeEnter: isAuthenticated,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (authStore.authenticated === null) {
    try {
      await axios.get(`${import.meta.env.VITE_API_BASE_URL}user`);
      authStore.authenticated = true;
    } catch (err) {
      authStore.authenticated = false;
    } finally {
      return next();
    }
  }
  return next();
});

export default router;
