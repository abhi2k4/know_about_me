import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "@studio-freight/react-lenis";

/** Smooth-scrolls to a home-page section, navigating home first when on another route. */
export function useGoToSection() {
  const lenis = useLenis();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (id: string) => {
      if (pathname !== "/") {
        navigate(id === "home" ? "/" : `/#${id}`);
        return;
      }
      const target = id === "home" ? 0 : document.getElementById(id);
      if (target === null) return;
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.4 });
      } else if (target === 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis, navigate, pathname]
  );
}
