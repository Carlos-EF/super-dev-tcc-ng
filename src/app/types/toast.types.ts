export const TOAST_TYPES = [
    'create',
    'edit',
    'delete',
    ''
] as const;

export type ToastType = 
    typeof TOAST_TYPES[number];