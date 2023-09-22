import React, { lazy } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Applayout from "./Applayout";
import { useRecoilState } from "recoil";
import profileState from "../atom/profileState";
import { Suspense } from "react";

const DashboardPage = lazy(() => import("../page/DashboardPage"));
const AssetsPage = lazy(() => import("../page/AssetsPage"));
const AppsPage = lazy(() => import("../page/AppsPage"));
const SettingsPage = lazy(() => import("../page/SettingsPage"));
const SettingBasicSettingPage = lazy(() =>
  import("../page/SettingBasicSettingPage")
);
const SettingWhitelistedTradersPage = lazy(() =>
  import("../page/SettingWhitelistedTradersPage")
);
const SettingWhitelistedWalletPage = lazy(() =>
  import("../page/SettingWhitelistedWalletPage")
);
const SettingTokenListPage = lazy(() => import("../page/SettingTokenListPage"));
const SettingAppsListPage = lazy(() => import("../page/SettingAppsListPage"));
const SettingCustomListPage = lazy(() =>
  import("../page/SettingCustomListPage")
);
const OnboardingPage = lazy(() => import("../page/OnboardingPage"));
const OnboardingExistingPage = lazy(() =>
  import("../page/OnboardingExistingPage")
);
const OnboardingLayoutPage = lazy(() => import("../page/OnboardingLayoutPage"));
const OnboardingNewPage = lazy(() => import("../page/OnboardingNewPage"));

const pageConfig = [
  {
    path: "dashboard",
    element: (
      <Suspense fallback={<div />}>
        <DashboardPage />
      </Suspense>
    ),
  },
  {
    path: "assets",

    element: (
      <Suspense fallback={<div />}>
        <AssetsPage />
      </Suspense>
    ),
  },
  {
    path: "apps",
    element: (
      <Suspense fallback={<div />}>
        <AppsPage />
      </Suspense>
    ),
  },
  {
    path: "settings",
    element: (
      <Suspense fallback={<div />}>
        <SettingsPage />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="/main/settings/basic-setting" />,
      },
      {
        path: "basic-setting",

        element: (
          <Suspense fallback={<div />}>
            <SettingBasicSettingPage />
          </Suspense>
        ),
      },
      {
        path: "whitelisted-traders",
        element: (
          <Suspense fallback={<div />}>
            <SettingWhitelistedTradersPage />
          </Suspense>
        ),
      },
      {
        path: "whitelisted-wallet",
        element: (
          <Suspense fallback={<div />}>
            <SettingWhitelistedWalletPage />
          </Suspense>
        ),
      },
      {
        path: "token-list",
        element: (
          <Suspense fallback={<div />}>
            <SettingTokenListPage />
          </Suspense>
        ),
      },
      {
        path: "apps-list",

        element: (
          <Suspense fallback={<div />}>
            <SettingAppsListPage />
          </Suspense>
        ),
      },
      // {
      //   path: "custom-list",
      //   element: (
      //     <Suspense fallback={<div />}>
      //       <SettingCustomListPage />
      //     </Suspense>
      //   ),
      // },
    ],
  },
];

const AppRoute = () => {
  const [profile] = useRecoilState(profileState);
  const isNoProfile = !profile?.address;

  const router = createBrowserRouter([
    {
      path: "*",
      element: (
        <Navigate to={isNoProfile ? "/onboarding" : "/main/dashboard"} />
      ),
    },
    {
      path: "main",
      element: <Applayout />,
      children: pageConfig,
    },
    {
      path: "onboarding",
      element: (
        <Suspense fallback={<div />}>
          <OnboardingLayoutPage />
        </Suspense>
      ),
      children: [
        {
          path: "",
          element: (
            <Suspense fallback={<div />}>
              <OnboardingPage />
            </Suspense>
          ),
        },
        {
          path: "existing",
          element: (
            <Suspense fallback={<div />}>
              <OnboardingExistingPage />
            </Suspense>
          ),
        },
        {
          path: "new",
          element: (
            <Suspense fallback={<div />}>
              <OnboardingNewPage />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoute;
