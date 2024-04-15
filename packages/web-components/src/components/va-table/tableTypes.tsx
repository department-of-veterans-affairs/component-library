export type TableCell  = {
  text: string;
  href?: string;
  isRouterLink?: boolean;
  testId?: string;
} | string;

export type TableRows = TableCell[][];
