export const TOAST_TYPES = [
    'create',
    'edit',
    'delete',
    'error',
    ''
] as const;

export type ToastType = 
    typeof TOAST_TYPES[number];