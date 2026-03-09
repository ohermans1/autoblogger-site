import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { normalizePath } from "../seo/pageCatalog";

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function isExternalHref(href) {
  return /^(?:[a-z][a-z\d+\-.]*:)?\/\//i.test(href) || /^(?:mailto|tel):/i.test(href);
}

export const SmartLink = React.forwardRef(({ to, onClick, target, className, children, ...rest }, ref) => {
  const navigate = useNavigate();
  const href = to || "/";

  const handleClick = event => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      !href ||
      target === "_blank" ||
      rest.download ||
      event.button !== 0 ||
      isModifiedEvent(event) ||
      isExternalHref(href)
    ) {
      return;
    }

    event.preventDefault();
    navigate(href);
  };

  return (
    <a ref={ref} href={href} target={target} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
});

SmartLink.displayName = "SmartLink";

export const SmartNavLink = ({ to, className, children, ...rest }) => {
  const location = useLocation();
  const currentPath = normalizePath(location.pathname);
  const targetPath = normalizePath(to);
  const isActive = currentPath === targetPath;
  const resolvedClassName = typeof className === "function" ? className({ isActive }) : className;

  return (
    <SmartLink to={to} className={resolvedClassName} aria-current={isActive ? "page" : undefined} {...rest}>
      {typeof children === "function" ? children({ isActive }) : children}
    </SmartLink>
  );
};
