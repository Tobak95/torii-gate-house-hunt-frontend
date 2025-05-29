import { useContext } from "react";
import { Tenantcontext } from "../context/TenantContext";

export const useTenantContext = () => useContext(Tenantcontext);
