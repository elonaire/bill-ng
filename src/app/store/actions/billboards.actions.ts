import { createAction } from "@ngrx/store";
import { ActionPayloadResponse } from "src/app/@types/billboardz";

export const loadBillboardTypes = createAction('[Billboards] Load Billboard Types');
export const loadBillboardTypesSuccess = createAction('[Billboards] Load Billboard Types Success', (payload: ActionPayloadResponse) => ({ payload }));
export const loadBillboards = createAction('[Billboards] Load Billboards');
export const loadBillboardsSuccess = createAction('[Billboards] Load Billboards Success', (payload: ActionPayloadResponse) => ({ payload }));
