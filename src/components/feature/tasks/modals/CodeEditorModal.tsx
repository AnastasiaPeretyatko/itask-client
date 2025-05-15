import { CloseButton } from '@chakra-ui/react';
import IdeEditor from '@/components/codeEditor/IdeEditor';
import { BodyItemProps } from '@/components/ui/modal';

export type CodeEditorModalProps = {
  code?: string | null
  onChange: (code: string) => void
  handleComplete?: () => void
} & BodyItemProps

const CodeEditorModal = ({ ...props }: CodeEditorModalProps) => {
  return (
    <>
      <IdeEditor {...props}/>
      <CloseButton
        position={'absolute'}
        right={2}
        top={2}
        onClick={props.onClose}
      />
    </>
  );
};

export default CodeEditorModal;