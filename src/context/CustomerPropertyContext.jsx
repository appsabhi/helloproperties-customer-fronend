import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchProperties } from "../services/propertyService";

const CustomerPropertyContext = createContext({
  properties: [],
  loading: true,
  error: null,
  refetchProperties: () => {},
});

export const CustomerPropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await fetchProperties();
    if (res.success) {
      setProperties(res.properties);
      setError(null);
    } else {
      setProperties([]);
      setError(res.error || "Failed to load properties from database");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  return (
    <CustomerPropertyContext.Provider
      value={{
        properties,
        loading,
        error,
        refetchProperties: loadProperties,
      }}
    >
      {children}
    </CustomerPropertyContext.Provider>
  );
};

export const useCustomerProperties = () => useContext(CustomerPropertyContext);

export default CustomerPropertyContext;

