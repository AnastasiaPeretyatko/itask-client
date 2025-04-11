import { Grid } from '@chakra-ui/react';
import ColumnBoard from './ColumnBoard';

const Board = () => {
  return (
    <Grid
      templateColumns={'repeat(4, 1fr)'}
      width={'full'}
      gap={5}
    >
      <ColumnBoard/>
      <ColumnBoard/>
      <ColumnBoard/>
      <ColumnBoard/>

    </Grid>
  );
};

export default Board;