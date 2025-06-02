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
  const [totalProperties, setTotalProperties] = useState(0);
  const { token } = useAppContext();
  const [locValue, setLocValue] = useState(""); // state to hold the location value and be passed as props to the search form
  const [budget, setBudget] = useState(""); // state to hold the budget value and be passed as props to the search form

  const [type, setType] = useState(""); // state to hold the type value and be passed as props to the search form

  //api call to fetch tenant properties
  const fetchProperties = async () => {
    if (token) {
      try {
        setIsLoading(true);
        const { data } = await axiosInstance.get(
          `/property?page=${page}&location=${locValue}&budget=${budget}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        //then we start setting the state according to the backend response
        setProperties(data.properties);
        setPage(data.currentPage);
        setTotalPage(data.totalPages);
        setTotalProperties(data.totalProperties);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [page, token, locValue, budget, type]);

  const resetFilters = () => {
    setPage(1); // Reset to the first page
    setLocValue(""); // Reset the location value
    setBudget(""); // Reset the budget value
    setType(""); // Reset the type value
  }
  return (
    <Tenantcontext.Provider
      value={{
        isLoading,
        properties,
        page,
        setPage,
        totalPage,
        totalProperties,
        setLocValue,
        resetFilters,
        setBudget,
        setType,
      }}
    >
      {children}
    </Tenantcontext.Provider>
  );
};

export default TenantProvider;
