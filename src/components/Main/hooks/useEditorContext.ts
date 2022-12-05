import { useContext } from 'react';

import { EditorContext } from '../EditorContextProvider';

function useEditorContext() {
  return useContext(EditorContext);
}

export default useEditorContext;
