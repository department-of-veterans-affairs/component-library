export type TableCell  = {
  text: string;
  href?: string;
  isRouterLink?: boolean;
} | string;

export type TableRows = TableCell[][];
