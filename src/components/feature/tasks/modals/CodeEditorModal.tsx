import IdeEditor from '@/components/codeEditor/IdeEditor';
import { BodyItemProps } from '@/components/ui/modal';

export type CodeEditorModalProps = {
  code?: string | null
  onChange: (code: string) => void
} & BodyItemProps

const CodeEditorModal = ({ ...props }: CodeEditorModalProps) => {
  return (
    <IdeEditor {...props}/>
  );
};

export default CodeEditorModal;