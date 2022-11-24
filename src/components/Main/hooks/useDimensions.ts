import { useContext } from 'react';

import { SizeContext } from '../SizeContextProvider';

function useDimensions() {
  return useContext(SizeContext);
}

export default useDimensions;
