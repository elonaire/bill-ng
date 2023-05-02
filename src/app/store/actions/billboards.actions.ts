import { createAction, props } from "@ngrx/store";
import { ActionPayloadResponse } from "src/app/@types/billboardz";

export const loadBillboardTypes = createAction('[Billboards] Load Billboard Types');

export const loadBillboardTypesSuccess = createAction('[Billboards] Load Billboard Types Success', (payload: ActionPayloadResponse) => ({ payload }));

export const loadBillboards = createAction('[Billboards] Load Billboards');

export const loadBillboardsSuccess = createAction('[Billboards] Load Billboards Success', (payload: ActionPayloadResponse) => ({ payload }));

export const createBillboard = createAction('[Billboards] Create Billboard', props<{billboard: any}>());

export const createBillboardSuccess = createAction('[Billboards] Create Billboard Success', (payload: ActionPayloadResponse) => ({ payload }));

export const updateBillboard = createAction('[Billboards] Update Billboard', props<{billboard: any}>());

export const updateBillboardSuccess = createAction('[Billboards] Update Billboard Success', (payload: ActionPayloadResponse) => ({ payload }));

export const deleteBillboard = createAction('[Billboards] Delete Billboard', props<{billboardId: any}>());

export const deleteBillboardSuccess = createAction('[Billboards] Delete Billboard Success', (payload: ActionPayloadResponse) => ({ payload }));

export const createBillboardType = createAction('[Billboards] Create Billboard Type', props<{billboardType: any}>());

export const createBillboardTypeSuccess = createAction('[Billboards] Create Billboard Type Success', (payload: ActionPayloadResponse) => ({ payload }));

export const updateBillboardType = createAction('[Billboards] Update Billboard Type', props<{billboardType: any}>());

export const updateBillboardTypeSuccess = createAction('[Billboards] Update Billboard Type Success', (payload: ActionPayloadResponse) => ({ payload }));

export const deleteBillboardType = createAction('[Billboards] Delete Billboard Type', props<{billboardTypeId: any}>());

export const deleteBillboardTypeSuccess = createAction('[Billboards] Delete Billboard Type Success', (payload: ActionPayloadResponse) => ({ payload }));
