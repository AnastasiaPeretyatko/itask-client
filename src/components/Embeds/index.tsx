import { Image } from '@chakra-ui/react';
import React from 'react';
import GoogleDocs from './GoogleDocs';
import GoogleSlide from './GoogleSlide';

export type EmbedDescription = {
  icon: React.FC<unknown>;
  matcher: (url: string) => boolean | [] | RegExpMatchArray;
  component: typeof React.Component | React.FC<unknown>;
  link: string;
  type: string;
  title: string;

}

export type EmbedProps = {
  isSelected: boolean;
  isEditable: boolean;
  embed: EmbedDescription;
  attrs: {
    href: string;
    matcher: RegExpMatchArray;
  }
}

export function matcher(Component: React.ComponentType<EmbedProps>) {
  return (url: string): boolean | [] | RegExpMatchArray => {
    // @ts-expect-error not aware of static
    const regexes = Component.ENABLED;

    for(const regex of regexes) {
      const result = url.match(regex);

      if(result){
        return result;
      }
    }

    return false;
  };
}

const embeds: EmbedDescription[] = [
  {
    title: 'Google Slide',
    icon: () =>(<Image
      src="/googleSlide.png"
      width={4}
    />),
    component: GoogleSlide,
    matcher: matcher(GoogleSlide),
    type: 'googleSlide',
    link: 'https://docs.google.com/slides/...',
  },
  {
    title: 'Google Docs',
    icon: () =>(<Image
      src="/googleDocs.png"
      width={4}
    />),
    component: GoogleDocs,
    matcher: matcher(GoogleDocs),
    type: 'googleDocs',
    link: 'https://docs.google.com/document/...',
  },
];

export default embeds;