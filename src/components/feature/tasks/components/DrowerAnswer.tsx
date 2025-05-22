import { AddIcon } from '@chakra-ui/icons';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentCard from '../../doc/DocumentCard';
import AddDocToAnswerModal from './AddDocToAnswerModal';
import ButtonUI from '@/components/ui/ButtonUI';
import Modal from '@/components/ui/modal';
import { useNotifications } from '@/hooks/useNotifications';
import { AppDispatch, RootState } from '@/store';
import { addAnswerTaskThunk, getAnswerTaskThunk } from '@/store/task/task.thunk';
import { DocumentType } from '@/types/document.type';

type Props = {
  isDisabled?: boolean
};

const DrowerAnswer = ({ isDisabled = false }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { userTask } = useSelector((state: RootState) => state.newTask);
  const { showErrorMessage, showSuccessMessage } = useNotifications();
  const [docIds, setDocIds] = useState<DocumentType[]>(userTask?.documents || []);

  const addDocsToAnswer = () => {
    if(!docIds.length || !router.query.id) return;
    const ids = docIds.map((doc) => doc.id);
    dispatch(addAnswerTaskThunk({ documentIds: ids, taskId: router.query.id as string } ))
      .unwrap()
      .then((res) => {
        showSuccessMessage(res.message);
      })
      .catch(showErrorMessage);
  };

  useEffect(() => {
    if(router.query.id){
      dispatch(getAnswerTaskThunk({ taskId: router.query.id as string }));
    }
  }, [dispatch, router.query.id]);

  return (
    <>
      <Button
        variant={'secondary'}
        isDisabled={isDisabled}
        onClick={onOpen}
      >
        Ответить
      </Button>
      <Drawer
        size={'sm'}
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Добавить ответ на задание
          </DrawerHeader>

          <DrawerBody
            display={'flex'}
            flexDir={'column'}
            gap={4}
          >
            <VStack width={'full'}>
              {
                docIds.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    doc={doc}
                  />
                ))
              }
            </VStack>
            <Modal
              action={<ButtonUI
                width={'full'}
                variant={'primary'}
                leftIcon={<AddIcon/>}
                isDisabled={userTask?.documents?.length !== 0}
              >Добавить ответ</ButtonUI>}
              renderBody={(props) => (<AddDocToAnswerModal
                {...props}
                handleDocs={(docs) => setDocIds(docs)}
              />)}
            />
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Отмена
            </Button>
            <Button
              variant={'primary'}
              onClick={addDocsToAnswer}
              isDisabled={userTask?.documents?.length !== 0}
            >Сохранить</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrowerAnswer;