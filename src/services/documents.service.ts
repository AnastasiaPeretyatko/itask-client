import { http } from '.';
import { DocumentType } from '@/types/document.type';

export const createDocument = (data: Partial<DocumentType>) => http.post('/doc/doc.create', data);

export const getDocuments = () => http.get('/doc');

export const deleteDocument = (id: string) => http.delete(`/doc/${id}`);

export const updateDocument = (id: string, data: Partial<DocumentType>) => http.patch(`/doc/${id}`, data);

export const getDocument = (id: string) => http.get(`/doc/${id}`);

