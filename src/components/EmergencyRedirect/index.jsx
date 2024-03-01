import React, { useEffect } from "react";

function EmergencyRedirect() {
  useEffect(() => {
    const path = window.location.pathname;
    const redirects = {
      "/emergency": "https://fundraisers.alihsan.org.au/emergency",
      "/winter-appeal": "https://fundraisers.alihsan.org.au/winter-appeal",
    };

    if (redirects[path]) {
      window.location.href = redirects[path];
    }
  }, []);

  return null;
}

export default EmergencyRedirect;
