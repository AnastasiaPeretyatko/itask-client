import { createAsyncThunk } from '@reduxjs/toolkit';
import { createDocument, deleteDocument, getDocument, getDocuments, updateDocument } from '@/services/documents.service';
import { MessageType } from '@/types/common.type';
import { DocumentType } from '@/types/document.type';
import { handleThunkError } from '@/utils/handleThunkError';

export const createDocumentThunk = createAsyncThunk<
  {data: DocumentType, message: string},
  Partial<DocumentType>,
  {
    rejectValue: { statusCode: number; message: MessageType }
    fulfilled: { data: DocumentType, message: string }
  }
>('/doc.create', async (body, { rejectWithValue, fulfillWithValue }) => {
  try {
    const { data } = await createDocument(body);
    return fulfillWithValue(data);
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const getOneDocumentThunk = createAsyncThunk<
  DocumentType,
  string,
  { rejectValue: { statusCode: number; message: MessageType } }
>('/doc.one', async (id, { rejectWithValue }) => {
  try {
    const { data } = await getDocument(id);
    return data;
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const getDocumentsThunk = createAsyncThunk<
  DocumentType[],
  undefined,
  { rejectValue: { statusCode: number; message: MessageType } }
>('/doc.all', async (_, { rejectWithValue }) => {
  try {
    const { data } = await getDocuments();
    return data;
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const updateDocumentThunk = createAsyncThunk<
  {data: DocumentType, message: string},
  Partial<DocumentType>,
  {
    rejectValue: { statusCode: number; message: MessageType }
    fulfilled: { data: DocumentType, message: string }
  }
>('/doc.update', async (body, { rejectWithValue, fulfillWithValue }) => {
  try {
    const { id, ...dto } = body;
    const { data } = await updateDocument(id as string, dto);
    return fulfillWithValue(data);
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const deleteDocumentThunk = createAsyncThunk<
  {id: string, message: string},
  string,
  {
    rejectValue: { statusCode: number; message: MessageType }
    fulfilled: { id: string, message: string }
  }
>('/doc.delete', async (id, { rejectWithValue, fulfillWithValue }) => {
  try {
    const { data } = await deleteDocument(id);
    return fulfillWithValue({ ...data, id });
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});