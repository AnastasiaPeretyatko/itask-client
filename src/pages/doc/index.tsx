import AppLayout from '@/components/layout/AppLayout';
import DocumentList from '@/v1/features/DocumentList/DocumentList';
import DocumentsHeader from '@/v1/widgets/Documents/ui/DocumentsHeader';

const DocumentsPage = () => {
  return (
    <AppLayout>
      <DocumentsHeader/>
      <DocumentList/>
    </AppLayout>
  );
};

export default DocumentsPage;