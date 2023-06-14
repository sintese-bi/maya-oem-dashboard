import { createContext, useContext, useState } from "react";

import { listBrand } from "src/utils/list-brand";

export const BrandsContext = createContext({});

export const BrandsContextProvider = ({ children }) => {
  // FORMATA BRAND CONFORME O ARRY

  const [brands, setBrands] = useState([]);
  const handlesBrands = (chi) => {
    const result = chi.map((item) => {
      const format = listBrand.find((list) => list.params === item.bl_name);

      return {
        ...format,
        blUuid: item.bl_uuid,
      };
    });

    setBrands(result);
  };

  return (
    <BrandsContext.Provider value={{ handlesBrands, brands }}>
      {children}
    </BrandsContext.Provider>
  );
};

export const useBrands = () => {
  return useContext(BrandsContext);
};
