import { CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Heading, HStack, Input, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateDocumentMenu from './CreateDocumentMenu';
import DeleteDocModal from './DeleteDocModal';
import { AiOutlineSave } from '@/components/icon';
import ButtonUI from '@/components/ui/ButtonUI';
import Modal from '@/components/ui/modal';
import { useNotifications } from '@/hooks/useNotifications';
import { AppDispatch, RootState } from '@/store';
import { clearChangeDocumentAction, createDocumentAction } from '@/store/documents/documents.slice';
import { updateDocumentThunk } from '@/store/documents/documents.thunk';
import { DocumentType } from '@/types/document.type';

type HeaderDocProps = {
  isEdit: boolean;
  setIsEdit: () => void;
  onChangeTitle?: (data: Partial<DocumentType>) => void;
}

const HeaderDoc = ({ isEdit, setIsEdit, onChangeTitle }: HeaderDocProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { currentDocument, changeDocument } = useSelector((state: RootState) => state.documents);
  const { showErrorMessage, showSuccessMessage } = useNotifications();

  const onSaveDoc = () => {
    if(!changeDocument) return;
    dispatch(updateDocumentThunk(changeDocument))
      .unwrap()
      .then((res) => {
        showSuccessMessage(res.message);
        setIsEdit();
      })
      .catch(showErrorMessage);
  };

  const onCancel = () => {
    dispatch(clearChangeDocumentAction());
    setIsEdit();
  };

  const title = useMemo(() => {
    return changeDocument?.title || currentDocument?.title || 'Без названия';
  }, [changeDocument?.title, currentDocument?.title]);

  console.log(user?.id, currentDocument?.creatorId);

  return (
    <VStack
      width={'full'}
      justify={'space-between'}
      py={5}
      align={'start'}
    >
      <HStack>
        <ButtonUI
          size="sm"
          variant={'secondary'}
          leftIcon={<EditIcon/>}
          display={user?.id !== currentDocument?.creatorId && !isEdit ? 'none' : 'flex'}
          onClick={() => {
            if(!isEdit) dispatch(createDocumentAction({}));
            setIsEdit();
          }}
          tooltip="Редактировать"
        >Редактировать</ButtonUI>
        <CreateDocumentMenu parentId={currentDocument?.id}/>
        <ButtonUI
          size="sm"
          variant={'secondary'}
          leftIcon={<CloseIcon boxSize={3}/>}
          display={isEdit ? 'flex' : 'none'}
          onClick={onCancel}
          tooltip="Отменить изменения"
        >Отменить</ButtonUI>
        <Modal
          size="lg"
          action={<ButtonUI
            size="sm"
            variant={'secondary'}
            leftIcon={<DeleteIcon/>}
            tooltip="Удалить"
          />}
          renderBody={({ onClose }) => (<DeleteDocModal
            id={currentDocument?.id || ''}
            onClose={() => onClose?.()}
          />)}
        />
        <ButtonUI
          size="sm"
          variant={'primary'}
          leftIcon={<AiOutlineSave boxSize={5}/>}
          display={isEdit ? 'flex' : 'none'}
          tooltip="Сохранить"
          onClick={onSaveDoc}
        />
      </HStack>
      { isEdit
        ? (
          <Input
            variant={'title'}
            onChange={(e) => onChangeTitle?.({ title: e.target.value })}
            value={changeDocument?.title || 'Новый документ'}
          />
        )
        : (
          <Heading
            size={'lg'}
            fontWeight={700}
            fontSize={'40px'}
            my={'6px'}
          >{title || 'Новый документ'}</Heading>
        ) }
    </VStack>
  );
};

export default HeaderDoc;