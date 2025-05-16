import React from 'react';
import { EmbedProps as Props } from '.';

const URL_REGEX = new RegExp('^https?://docs\.google\.com/document/d/(.*)$');

export default class GoogleDocs extends React.Component<Props> {
  static ENABLED = [URL_REGEX];

  render(): React.ReactNode {
    return (
      <iframe
        {...this.props}
        src={this.props.attrs.href}
        title="Google Docs"
        width="100%"
        height={'100%'}
      />
    );
  }
}