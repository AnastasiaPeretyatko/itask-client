import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, HStack } from '@chakra-ui/react';
import { useDocumentStore } from '@/v1/entites/Document/module/store';
import DocumentCreateMenu from '@/v1/features/DocumentCreateMenu/DocumentCreateMenu';
import DocumentDeleteButton from '@/v1/features/DocumentDelete/DocumentDeleteButton';
import DocumentEditButton from '@/v1/features/DocumentEditButton/DocumentEditButton';
import DocumentSaveButton from '@/v1/features/DocumentSaveButton/DocumentSaveButton';

const DocumentHeader = () => {
  const doc = useDocumentStore((state) => state.doc);

  return (
    <HStack width={'100%'}>
      <Breadcrumb flex={1}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/doc">Документы</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            isCurrentPage
          >{doc?.title || 'Без названия'}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <DocumentEditButton/>
      <DocumentSaveButton/>
      <DocumentCreateMenu/>
      <DocumentDeleteButton/>
    </HStack>
  );
};

export default DocumentHeader;