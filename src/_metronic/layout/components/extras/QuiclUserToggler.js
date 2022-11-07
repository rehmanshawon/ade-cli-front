/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import objectPath from "object-path";
import React, { useMemo } from "react";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { UserProfileDropdown } from "./dropdowns/UserProfileDropdown";

export function QuickUserToggler() {
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      offcanvas:
        objectPath.get(uiService.config, "extras.user.layout") === "offcanvas",
    };
  }, [uiService]);

  return (
    <>
      {layoutProps.offcanvas && <UserProfileDropdown />}

      {!layoutProps.offcanvas && <UserProfileDropdown />}
    </>
  );
}
