import { createContext, useState, useCallback } from "react";

const BreadCrumbContext = createContext();

export const BreadCrumbProvider = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([
    { path: "/", title: "Dashboard" },
  ]);

  const updateBreadcrumbs = useCallback((newPath, title) => {
    setBreadcrumbs((prev) => {
      // Split the path into segments
      const pathSegments = newPath.split('/').filter(Boolean);
      
      // Start with the dashboard breadcrumb
      const newBreadcrumbs = [{ path: "/", title: "Dashboard" }];
      
      // Build the path hierarchy
      let currentPath = "";
      for (let i = 0; i < pathSegments.length; i++) {
        currentPath += `/${pathSegments[i]}`;
        const segmentTitle = i === pathSegments.length - 1 ? title : pathSegments[i];
        newBreadcrumbs.push({ path: currentPath, title: segmentTitle });
      }
      
      return newBreadcrumbs;
    });
  }, []);

  const resetBreadcrumbs = useCallback(() => {
    setBreadcrumbs([{ path: "/", title: "Dashboard" }]);
  }, []);

  return (
    <BreadCrumbContext.Provider value={{ breadcrumbs, updateBreadcrumbs, resetBreadcrumbs }}>
      {children}
    </BreadCrumbContext.Provider>
  );
};

export default BreadCrumbContext;
