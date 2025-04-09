import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  IconButton, ModalCloseButton,
  ModalHeader, Text,
} from '@chakra-ui/react';
import { DotsVerticalIcon, StarIcon } from '@/components/assets/icon';
import { ArrowsAngleContract } from '@/components/assets/icon/ArrowsAngleContract';
import { ArrowsAngleExpand } from '@/components/assets/icon/ArrowsAngleExpand';
import { BodyItemProps } from '@/components/assets/ui/modal';

type Props = {
  create?: boolean,
  review?: boolean,
  courseName?: string,
  taskName?: string
} & BodyItemProps

const Header = ({
  isFullSizeWindow,
  setIsFullSizeWindow,
  create,
  review,
  courseName,
  taskName,
}: Props) => {
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
            <BreadcrumbItem color={'text.pale'}> <BreadcrumbLink>{courseName}</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbItem><BreadcrumbLink>{taskName}</BreadcrumbLink></BreadcrumbItem>
          </Breadcrumb>
        ) : null
      }
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