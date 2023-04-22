import { createAction } from "@reduxjs/toolkit";

export const addToDoAction = createAction("ADD_TO_DO");
export const editToDoAction = createAction("EDIT_TO_DO");
export const removeToDoAction = createAction("REMOVE_TO_DO");
