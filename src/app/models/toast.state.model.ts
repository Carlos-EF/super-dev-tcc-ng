import { ToastType } from "../types/toast.types";

export interface ToastState {
    visible: boolean;
    type: ToastType;
    entity: string
}