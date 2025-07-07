import { useBoolean } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useDocumentStore } from '@/v1/entites/Document/module/store';
import DocumentHeader from '@/v1/widgets/Documents/ui/DocumentHeader';
import DocumentView from '@/v1/widgets/Documents/ui/DocumentView';

const DocPage = () => {
  const router = useRouter();
  const document = useDocumentStore();

  const [isLoading, setIsLoading] = useBoolean(true);

  useEffect(() => {
    if(router.query.id){
      setIsLoading.on();
      document.get(router.query.id as string);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id, setIsLoading]);

  return (
    <AppLayout loading={isLoading}>
      <DocumentHeader/>
      <DocumentView/>
    </AppLayout>
  );
};

export default DocPage;