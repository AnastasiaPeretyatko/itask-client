import { create } from 'zustand';
import { deleteDocument, getDocuments, updateDocument } from '../api/documents.service';
import { DocumentType } from '../types/type';
import { createDocument, getDocument } from '@/services/documents.service';

type DocumentStore = {
  documents: DocumentType[];
  doc: DocumentType | null;
  fetchDocuments: () => Promise<void>;
  setDocument: (document: Partial<DocumentType>) => Promise<{ data: DocumentType }>;
  deleteDoc: (id: string) => Promise<string>;
  isEditing: boolean;
  toggleIsEdit: () => void;
  get: (id: string) => Promise<void>;
  saveDocument: ({ title, context }: { title: string; context: string }) => Promise<{ data: DocumentType } | null>;
};

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  documents: [],
  doc: null,
  isEditing: false,
  fetchDocuments: async () => {
    try {
      const res = await getDocuments();
      set({ documents: res.data });
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    }
  },
  setDocument: async(documents: Partial<DocumentType>) => {
    try {
      const { data } = await createDocument(documents);
      set((state) => ({
        documents: [...state.documents, data.data],
      }));
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  deleteDoc: async (id: string) => {
    try {
      const { data } = await deleteDocument(id);
      set((state) => ({
        documents: state.documents.filter((doc) => doc.id !== id),
      }));
      return data.message;
    } catch (error) {
      console.error(error);
    }
  },
  toggleIsEdit: () => set((state) => ({
    isEditing: !state.isEditing,
  })),
  get: async(id: string) => {
    try {
      const res = await getDocument(id);
      set({ doc: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  saveDocument: async ({ title, context }) => {
    try {
      const doc = get().doc;
      if (!doc) {
        return null;
      }
      const { data } = await updateDocument(doc.id, { title, context });
      set({ doc: data.data });
      return data;
    } catch (error) {
      console.error(error);
    }
  },
}));