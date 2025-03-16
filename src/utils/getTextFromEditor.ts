/* eslint-disable @typescript-eslint/no-explicit-any */
export const getTextFromEditor = (editor: string) => {
  const description = JSON.parse(editor);
  const array = description.filter((item: { content: string | any[]; }) => item.content.length).map((item: any) => item.content[0].text);
  return array;
};