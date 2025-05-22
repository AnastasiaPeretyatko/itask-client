import { createSlice } from '@reduxjs/toolkit';
import { createDocumentThunk, deleteDocumentThunk, getDocumentsThunk, getOneDocumentThunk, updateDocumentThunk } from './documents.thunk';
import { DocumentType } from '@/types/document.type';

type TInitialState = {
  documents: DocumentType[];
  isLoading: boolean;
  currentDocument: DocumentType | null;
  changeDocument: DocumentType | null
}

const initialState: TInitialState = {
  documents: [],
  isLoading: false,
  currentDocument: null,
  changeDocument: null,
};

export const documents = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    createDocumentAction: (state, { payload }) => {
      if(!state.changeDocument) {
        state.changeDocument = state.currentDocument;
      }
      state.changeDocument = { ...state.currentDocument, ...payload };
    },
    clearChangeDocumentAction: (state) => {
      state.changeDocument = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDocumentThunk.fulfilled, (state, { payload }) => {
        state.currentDocument = payload.data;
      })
      .addCase(getOneDocumentThunk.fulfilled, (state, { payload }) => {
        state.currentDocument = payload;
      })
      .addCase(getDocumentsThunk.fulfilled, (state, { payload }) => {
        state.documents = payload;
      })
      .addCase(updateDocumentThunk.fulfilled, (state, { payload }) => {
        state.currentDocument = payload.data;
      })
      .addCase(deleteDocumentThunk.fulfilled, (state, { payload }) => {
        state.currentDocument = null;
        state.documents = state.documents.filter((document) => document.id !== payload.id);
      });
  },
});

export const { createDocumentAction, clearChangeDocumentAction } = documents.actions;

export default documents.reducer;
