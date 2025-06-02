import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import SuspenseLoader from "../components/SuspenseLoader";
import OtherPropertyFromOwner from "../components/OtherPropertyFromOwner";
import SimilarProperty from "../components/SimilarProperty";
import DetailOfProperty from "../components/DetailOfProperty";
import { axiosInstance } from "../utils/axiosInstance";
import { useAppContext } from "../hooks/useAppContext";

const PropertyDetail = () => {
  const { propertyId } = useParams();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState({});
  const [more, setMore] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [landlord, setLandlord] = useState("");
  const { token } = useAppContext();

  const fetchPropertyDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/property/${propertyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      setProperty(data.property);
      setMore(data.moreFromProperties);
      setSimilar(data.similarPriceProperties);
      setLandlord(data.property.landlord.fullName);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPropertyDetails();
  }, [propertyId]);
  return (
    <div>
      <Nav bg={"bg-black"} />
      {loading ? (
        <SuspenseLoader />
      ) : (
        <>
          <DetailOfProperty property={property} />
          {more.length > 0 && (
            <OtherPropertyFromOwner more={more} landlord={landlord} />
          )}
          {similar.length > 0 && <SimilarProperty similar={similar} />}
        </>
      )}
      <Footer />
    </div>
  );
};

export default PropertyDetail;
