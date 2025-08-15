import { useMediaQuery } from 'react-responsive';

const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

type BreakpointKey = keyof typeof breakpoints;

export function useBreakpoint(breakpointKey: BreakpointKey) {
  const minWidth = breakpoints[breakpointKey];

  if (!minWidth) {
    throw new Error(`Breakpoint "${breakpointKey}" does not exist`);
  }

  return useMediaQuery({
    query: `(min-width: ${minWidth})`,
  });
}
