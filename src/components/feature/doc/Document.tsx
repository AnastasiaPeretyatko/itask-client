import { HStack, useBoolean, VStack } from '@chakra-ui/react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import BreadcrumbDoc from './BreadcrumbDoc';
import DocumentCard from './DocumentCard';
import embeds from '@/components/Embeds';
import IdeEditor from '@/components/codeEditor/IdeEditor';
import HeaderDoc from '@/components/feature/doc/HeaderDoc';
import Editor from '@/components/ui/Editor/Editor';
import { useNotifications } from '@/hooks/useNotifications';
import { AppDispatch, RootState } from '@/store';
import { createDocumentAction } from '@/store/documents/documents.slice';
import { updateDocumentThunk } from '@/store/documents/documents.thunk';
import { DocumentType } from '@/types/document.type';

const Document = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentDocument } = useSelector((state: RootState) => state.documents);
  const { showErrorMessage, showSuccessMessage } = useNotifications();

  const [isEdit, setIsEdit] = useBoolean(false);

  const isNewDoc = !!(currentDocument?.createdAt && moment().diff(moment(currentDocument.createdAt), 'hours') < 1);
  const embed = embeds.find((e) => e.type === currentDocument?.type);

  const onChangeDoc = (data: Partial<DocumentType>) => {
    //! Обратить внимание, при сохранении документа в редакторе, нет сохранения в сторе
    console.log({ data }, 'kek');
  };

  const handleSave = (data: Partial<DocumentType>) => {
    setIsEdit.off();
    dispatch(updateDocumentThunk({ ...currentDocument, ...data }))
      .unwrap()
      .then(showSuccessMessage)
      .catch(showErrorMessage);
  };

  if (currentDocument && currentDocument.type === 'code') {
    return (
      <IdeEditor
        doc={currentDocument}
        code={currentDocument.context}
        onChange={(context) => handleSave({ context })}
        noMargin
      />
    );
  }

  if (currentDocument && currentDocument.type !== 'document' && embed) {
    const match = embed.matcher(currentDocument?.path || '');

    if (match) {
      const Component = embed.component;

      return (
        <VStack
          width="full"
          height="full"
        >
          <Component
            isEditable={false}
            isSelected={false}
            embed={embed}
            attrs={{
              href: currentDocument.path,
              matcher: match,
            }}
          />
        </VStack>
      );
    }
  }

  return (
    <>
      <BreadcrumbDoc
        currentDocument={currentDocument}
        isNewDoc={isNewDoc}
      />
      <HeaderDoc
        isEdit={isEdit}
        setIsEdit={setIsEdit.toggle}
        onChangeTitle={onChangeDoc}
      />
      <HStack
        gap={5}
        width={'full'}
        mb={5}
      >
        {
          currentDocument?.children?.map((child) => (
            <DocumentCard
              key={child.id}
              doc={child}
            />
          ))
        }
      </HStack>
      <Editor
        editable={isEdit}
        onChange={(markdown) => {
          console.log({ markdown });
          dispatch(createDocumentAction({ context: markdown }));
        }}
        markdown={currentDocument?.context || ''}
        isLeftPadding
      />
    </>
  );
};

export default Document;