import {
  getAuth,
  confirmPasswordReset,
  verifyPasswordResetCode,
} from "firebase/auth";
import {
  useLocation,
  Navigate,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import NotFound from "./NotFound";
import ResetPassword from "./ResetPassword";
import React, { useState, useEffect } from "react";

const AuthAction = () => {
  let ui = null;
  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();
  let navigate = useNavigate();
  let error = false;
  // Get the action to complete.
  const mode = searchParams.get("mode");

  // Get the one-time code from the query parameter.
  const actionCode = searchParams.get("oobCode");

  // (Optional) Get the continue URL from the query parameter if available.
  const continueUrl = searchParams.get("continueUrl");

  const auth = getAuth();
  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador

    if (error) {
      navigate("/signin", { replace: true });
    }
  }, []);
  // Handle the user management action.
  switch (mode) {
    case "resetPassword":
      // Display reset password handler and UI.
      handleResetPassword(auth, actionCode, continueUrl);
      break;
    case "recoverEmail":
      // Display email recovery handler and UI.
      // handleRecoverEmail(auth, actionCode);
      break;
    case "verifyEmail":
      // Display email verification handler and UI.
      //  handleVerifyEmail(auth, actionCode, continueUrl);
      break;
    default:
      error = true;
    // Error: invalid mode.
  }

  function handleResetPassword(auth, actionCode, continueUrl) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.
    ui = (
      <ResetPassword
        auth={auth}
        actionCode={actionCode}
        continueUrl={continueUrl}
      />
    );
  }
  return ui;
};
export default AuthAction;
