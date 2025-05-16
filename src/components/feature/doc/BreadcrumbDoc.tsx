import { Badge, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { DocumentType } from '@/types/document.type';

type BreadcrumbDocProps = {
  currentDocument: DocumentType | null;
  isNewDoc: boolean;
};

const BreadcrumbDoc = ({ currentDocument, isNewDoc }: BreadcrumbDocProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink
          href="/doc"
          color={'text.secondary'}
        >Документы</BreadcrumbLink>
      </BreadcrumbItem>
      {currentDocument?.parent ? (
        <BreadcrumbItem>
          <BreadcrumbLink href={`/doc/${currentDocument.parent.id}`}>{currentDocument?.parent?.title || 'Без названия'} {isNewDoc ? (
            <Badge
              colorScheme="green"
              ml={1}
            >Новый</Badge>
          ) : null}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ) : null}
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">{currentDocument?.title || 'Без названия'} {isNewDoc ? (
          <Badge
            colorScheme="green"
            ml={1}
          >Новый</Badge>
        ) : null}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default BreadcrumbDoc;