import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { PropertyTypes } from '@/feature/property/PropertyRegistry';
import { Property } from '@/types/property';
import { Task } from '@/types/task';

type TInitialState = {
  task: Task | null
}

const initialState: TInitialState = {
  task: {} as Task,
};

export const taskModule = createSlice({
  name: 'task',
  initialState,
  reducers: {
    add: (state) => {
      state.task = {
        id: uuid(),
        title: '',
        description: '',
        properties: [],
      };
    },
    addTitle: (state, { payload }: { payload: string }) => {
      if(state.task){
        state.task.title = payload;
      }
    },
    change: (state, action) => {
      state.task = action.payload;
    },
    addProperty: (state, { payload } : {payload: {type: keyof typeof PropertyTypes}}) => {
      const property = {
        id: uuid(),
        type: PropertyTypes[payload.type],
        title: PropertyTypes[payload.type],
        value: null,
      };

      if(state.task && !state.task.properties){
        state.task.properties = [{ ...property }];
        return;
      }
      state.task?.properties.push(property);
    },
    changeProperty: (state, { payload } : {payload: {property: Property}}) => {
      if(state.task && state.task?.properties.length){
        state.task.properties = state.task.properties.map((property) => {
          if(property.id === payload.property.id){
            return payload.property;
          }
          return property;
        });
      }
    },
    // changeProperty: (state, action) => {
    //   state.task?.properties[action.payload.index] = action.payload.property;
    // },
    clear: (state) => {
      state.task = null;
    },
  },
});


export const task = taskModule.actions;

export default taskModule.reducer;
