export const SORT_TYPES = [
    'asc',
    'desc',
] as const;

export type SortType = 
    typeof SORT_TYPES[number];