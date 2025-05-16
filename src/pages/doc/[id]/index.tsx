import { useBoolean } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Document from '@/components/feature/doc/Document';
import AppLayout from '@/components/layout/AppLayout';
import { AppDispatch } from '@/store';
import { getOneDocumentThunk } from '@/store/documents/documents.thunk';

const DocPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useBoolean(true);

  useEffect(() => {
    if(router.query.id){
      setIsLoading.on();
      dispatch(getOneDocumentThunk(router.query.id as string))
        .finally(setIsLoading.off);
    }
  }, [dispatch, router.query.id, setIsLoading]);

  return (
    <AppLayout loading={isLoading}>
      <Document/>
    </AppLayout>
  );
};

export default DocPage;