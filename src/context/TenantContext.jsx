import { createContext } from "react";
import { useState, useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { axiosInstance } from "../utils/axiosInstance";

export const Tenantcontext = createContext();

const TenantProvider = ({ children }) => {
  // Here you can define any state or functions related to tenant management
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { token } = useAppContext();

  //api call to fetch tenant properties
  const fetchProperties = async () => {
    if (token) {
      try {
        const { data } = await axiosInstance.get(
          `/property?page=${page}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        //then we start setting the state according to the backend response
        setProperties(data.properties);
        setPage(data.currentPage);
        setTotalPage(data.totalPage);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [page, token]);
  return (
    <Tenantcontext.Provider
      value={{ isLoading, properties, page, setPage, totalPage }}
    >
      {children}
    </Tenantcontext.Provider>
  );
};

export default TenantProvider;
