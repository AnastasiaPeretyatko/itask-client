import { Menu, MenuButton, MenuList, MenuItem, Box, Text, Button } from '@chakra-ui/react';
import { LANGUAGE_VERSIONS } from '@/common/const';

type Props = {
  language: string;
  onSelect: (language: string) => void;
}

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }: Props) => {
  return (
    <Box>
      {/* <Text>Language</Text> */}
      <Menu isLazy>
        <MenuButton as={Button} size={'sm'}>{language}</MenuButton>
        <MenuList>
          {
            languages.map(([lang, version]) => (
              <MenuItem
                key={lang}
                onClick={() => onSelect(lang)}
              >
                {lang}
                &nbsp;
                <Text
                  as={'span'}
                  color={'gray.500'}
                  fontSize={'sm'}
                >
                  {version}
                </Text>
              </MenuItem>
            ))
          }
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;