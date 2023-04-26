import { createAction } from "@ngrx/store";
import { ActionPayloadResponse } from "src/app/@types/billboardz";

export const loadBillboardTypes = createAction('[Billboards] Load Billboard Types');
export const loadBillboardTypesSuccess = createAction('[Billboards] Load Billboard Types Success', (payload: ActionPayloadResponse) => ({ payload }));
