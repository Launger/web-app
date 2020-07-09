import React, { Suspense, lazy } from "react";
import { Redirect } from "react-router-dom";
import { useStore } from "react-hookstore";

import ClockSpinner from "Components/ClockSpinner/ClockSpinner";

const ImportedPage = lazy(() => import(/* webpackChunkName: "[request]" */ "./importPage"));
const BufferPage = lazy(() => import(/* webpackChunkName: "[request]" */ "./Buffer/BufferPage"));

const IndexPage = () => {
  const [loggedIn] = useStore("loggedIn");
  const visits = Number(localStorage.getItem("visits"));

  document.title = "Be more productive";

  // If return visitor, go to Buffer Page
  // Else IndexPage or BrowsePage depending on loggedIn.
  if (visits > 0) {
    return (
      <Suspense fallback={<ClockSpinner />}>
        <BufferPage />
      </Suspense>
    );
  } else if (!loggedIn) {
    return (
      <Suspense fallback={<ClockSpinner />}>
        <ImportedPage />
      </Suspense>
    );
  } else return <Redirect to="/browse" />;
};

export default IndexPage;
