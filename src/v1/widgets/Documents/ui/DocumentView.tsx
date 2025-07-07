import { VStack } from '@chakra-ui/react';
import { useChangeDocStore } from '@/v1/entites/Document/module/changeDoc.store';
import { useDocumentStore } from '@/v1/entites/Document/module/store';
import DocumentMetaTooltip from '@/v1/features/DocumentMetaTooltip/DocumentMetaTooltip';
import DocumentTitle from '@/v1/features/DocumentTitle/DocumentTitle';
import Editor from '@/v1/shared/ui/Editor/Editor';

const DocumentView = () => {
  const doc = useDocumentStore((state) => state.doc);
  const isEditing = useDocumentStore((state) => state.isEditing);
  const context = useChangeDocStore((state) => state.context);
  const changeContent = useChangeDocStore((state) => state.changeContext);

  return (
    <VStack
      width={'full'}
      overflowX={'hidden'}
      align={'start'}
      pt={6}
      gap={2}
      pl={'54px'}
    >
      <DocumentTitle/>
      <DocumentMetaTooltip/>
      <Editor
        markdown={isEditing ? context : doc?.context || ''}
        onChange={changeContent}
        editable={isEditing}
        // isLeftPadding
      />
    </VStack>
  );
};

export default DocumentView;