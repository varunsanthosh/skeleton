import React from "react";
import { Redirect } from "react-router-dom";
import { Maybe } from "types";

type ScrollType = {
  scroll: {
    x: number;
    y: number;
  };
};

export type routerType = {
  push: (path: string, scroll: ScrollType) => void;
};

let Router: routerType;

// checks for patterns starting with http, https and even native app launch URLs
const absoluteUrlPattern = /^([a-z]{3,}:)?\/\//;

/**
 * Jumps to a new location. Uses window.location instead of router context if
 * the provided URL was found out to be absolute URL.
 * @param  {String} [path=''] URL to jump to.
 * @return {} React component that can be inserted to render.
 */
export default function redirect(path: string = ""): Maybe<JSX.Element> {
  if (absoluteUrlPattern.test(path)) {
    window.location.href = path;
    return null;
  }
  return <Redirect push to={path} />;
}

export function init({ router }: { router: routerType }) {
  Router = router;
}

/**
 * Redirect to a path
 * @param  {String} path Pathname without leading /
 * @param  {Number} scrollPosition vertical scroll position of the page
 * @return {Object} Router instance for chaining
 */

export function localRedirect(
  path: string = "",
  scrollPosition: number = 0
): routerType {
  const slash = path[0] === "/" ? "" : "/";
  const fullPath = `${slash}${path}`;

  Router.push(fullPath, { scroll: { x: 0, y: scrollPosition } });

  return Router;
}
