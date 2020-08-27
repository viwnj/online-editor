import React from 'react';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import qs from 'qs';
import { ThunkDispatch } from 'redux-thunk';
import { withRouter, RouteComponentProps } from 'react-router';
import { History } from 'history';
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-dracula';

import { RootState } from '../../redux/reducers';
import { File, FileStateObj } from '../../redux/app/types';
import EditorHeader from '../../components/EditorHeader';
import Filetree, { FileNode } from '../../misc/FiletreeClass';
import { setFile } from '../../redux/app/actions';
import { Container } from './styles';
import api from '../../services/api';
import { toast } from 'react-toastify';

const languages: Array<string> = [
  'javascript',
  'java',
  'python',
  'xml',
  'ruby',
  'sass',
  'markdown',
  'mysql',
  'json',
  'html',
  'handlebars',
  'golang',
  'csharp',
  'elixir',
  'typescript',
  'css',
];

languages.forEach(lang => {
  require(`brace/mode/${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

interface MatchParams {
  file: string;
}

interface IProps extends RouteComponentProps<MatchParams> {
  history: History<History.UnknownFacade>;
  filetree: Filetree;
  setFile: (fileId: number, fileStateObj: FileStateObj) => void;
}

// For syntax highlighting
// Add more modes as needed
const modes: { [key: string]: string } = {
  java: 'java',
  js: 'javascript',
  cpp: 'c_cpp',
  c: 'c_cpp',
  h: 'c_cpp',
  hpp: 'c_cpp',
  go: 'golang',
  css: 'css',
};

const Editor: React.FC<IProps> = ({ history, filetree, setFile }) => {
  const contentRef = React.useRef('');
  const originalFileRef = React.useRef<FileNode | undefined>();
  const [editorContent, setEditorContent] = React.useState('');

  const setFileContent = React.useCallback(async (): Promise<void> => {
    const queryParams = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
    }) as { file: string };

    try {
      const fileNode = filetree.findByPath(queryParams.file);
      if (!fileNode) return;
      if (fileNode.state.content) {
        if (fileNode.state.id !== originalFileRef.current?.state.id) {
          setEditorContent(fileNode.state.content);
        }
        // No need to make a request to get the content if the content is already there...
        originalFileRef.current = fileNode; // Keep a reference to the original file
        if (!editorContent) setEditorContent(fileNode.state.content);
        return;
      }

      const res: { data: File } = await api.get(`/files/${fileNode.state.id}`);
      const { content } = res.data;
      fileNode.setContent(content);
      originalFileRef.current = fileNode; // Keep a reference to the original file
      setEditorContent(content);
    } catch {
      toast.error('An error occurred trying to retrieve the file content');
    }
  }, [editorContent, filetree, history.location.search]);

  React.useEffect(() => {
    setFileContent();
  }, [history.location.search, setFileContent]);

  React.useEffect(() => {
    if (originalFileRef.current) {
      if (editorContent !== originalFileRef.current.state.content) {
        setFile(originalFileRef.current.state.id, {
          unsaved: true,
        });
      } else {
        setFile(originalFileRef.current.state.id, {
          unsaved: false,
        });
      }
    }
  }, [editorContent, setFile]);

  const onChange = (value: string) => {
    setEditorContent(value);
    // also saving the content in a reference because I can't access the state value from the save function...
    // but..it works with a ref?
    contentRef.current = value;
  };

  const onSave = async () => {
    const file = originalFileRef.current;
    if (file && originalFileRef.current) {
      try {
        await api.put(`/files/${originalFileRef.current.state.id}`);
        setFile(originalFileRef.current.state.id, {
          unsaved: false,
          content: contentRef.current,
          modified: true,
        });
      } catch {
        toast.error('Failed to save file, try again later :(');
      }
    }
  };

  const mode = originalFileRef.current?.state.extension || 'java';

  return (
    <Container>
      <EditorHeader />
      <AceEditor
        onChange={onChange}
        fontSize={16}
        width="100%"
        height="100%"
        value={editorContent}
        mode={modes[mode]}
        theme="dracula"
        name="code-editor"
        commands={[
          {
            name: 'save',
            bindKey: { win: 'CTRL+S', mac: 'Command+S' },
            exec: onSave,
          },
        ]}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
        editorProps={{ $blockScrolling: true }}
      />
    </Container>
  );
};

const mapStateToProps = (state: RootState) => ({
  files: state.AppReducer.files,
  filetree: state.AppReducer.filetree,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, any, any>) => ({
  setFile: (fileId: number, fileStateObj: FileStateObj) =>
    dispatch(setFile(fileId, fileStateObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Editor));
