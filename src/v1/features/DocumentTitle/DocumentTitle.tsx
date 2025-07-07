import { Heading, Input } from '@chakra-ui/react';
import { useChangeDocStore } from '@/v1/entites/Document/module/changeDoc.store';
import { useDocumentStore } from '@/v1/entites/Document/module/store';

const DocumentTitle = () => {
  const doc = useDocumentStore((state) => state.doc);
  const isEditing = useDocumentStore((state) => state.isEditing);
  const value = useChangeDocStore((state) => state.title);
  const changeTitle = useChangeDocStore((state) => state.changeTitle);

  if (isEditing) {
    return (
      <Input
        width={'full'}
        variant="title"
        placeholder="Название документа"
        value={value}
        onChange={(e) => changeTitle(e.target.value)}
        autoFocus
      />
    );
  }

  return (
    <Heading
      size={'lg'}
      textAlign={'start'}
      fontSize={'4xl'}
      py={2}
    >{doc?.title || 'Без названия'}</Heading>
  );
};

export default DocumentTitle;