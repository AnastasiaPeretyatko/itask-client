import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  IconButton, ModalCloseButton,
  ModalHeader, Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { DotsVerticalIcon, StarIcon } from '@/components/icon';
import { ArrowsAngleContract } from '@/components/icon/ArrowsAngleContract';
import { ArrowsAngleExpand } from '@/components/icon/ArrowsAngleExpand';
import { BodyItemProps } from '@/components/ui/modal';
import { TaskModel } from '@/types/course.type';

type Props = {
  create?: boolean,
  review?: boolean,
  courseName?: string,
  taskName?: string
  studentName?: string
  task?: TaskModel
} & BodyItemProps

const Header = ({
  isFullSizeWindow,
  setIsFullSizeWindow,
  create,
  review,
  courseName,
  taskName,
  studentName,
  task,
}: Props) => {
  const router = useRouter();

  return (
    <ModalHeader
      display={'flex'}
      flexDirection={'row'}
    >
      <ModalCloseButton
        size={'sm'}
        sx={{ 'svg': { width: '14px', height: '14px' } }}
      />
      <IconButton
        aria-label="full size"
        variant={'unstyled'}
        size={'sm'}
        sx={{ 'svg': { width: '18px', height: '18px' } }}
        icon={isFullSizeWindow ? <ArrowsAngleContract/> : <ArrowsAngleExpand/>}
        onClick={setIsFullSizeWindow}
      />
      {
        create ? (
          <Text
            fontSize={'md'}
            fontWeight={600}
            color={'text.tertiary'}
            display={'inline-block'}
            width={'100%'}
            textAlign={'center'}
          >Создать новую задачу</Text>
        ) : null
      }
      {
        review ? (
          <Breadcrumb
            width={'full'}
            fontSize={'sm'}
            fontWeight={600}
          >
            <BreadcrumbItem color={'text.pale'} >
              <BreadcrumbLink href={`/courses/${task?.assignment.courseId}`} >
                {courseName}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {studentName ? (
              <BreadcrumbItem>
                <BreadcrumbLink>{studentName}</BreadcrumbLink>
              </BreadcrumbItem>
            ) : null}
            <BreadcrumbItem>
              <BreadcrumbLink>{taskName}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        ) : null
      }
      <Button
        size={'sm'}
        variant={'secondary'}
        onClick={() => router.push(`/tasks/${task?.id}`)}
      >
        Открыть
      </Button>
      <IconButton
        size={'sm'}
        aria-label="menu"
        variant={'unstyled'}
        icon={<StarIcon/>}
        _hover={{
          color: 'yellow.600',
        }}
      />
      <IconButton
        size={'sm'}
        aria-label="menu"
        variant={'unstyled'}
        icon={<DotsVerticalIcon/>}
      />
    </ModalHeader>
  );
};

export default Header;