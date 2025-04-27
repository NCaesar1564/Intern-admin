import { Editor, EditorState, RichUtils, AtomicBlockUtils, Modifier, DefaultDraftBlockRenderMap } from 'draft-js';
import Immutable from 'immutable';
import 'draft-js/dist/Draft.css';
import Compressor from 'compressorjs';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { FaAlignCenter, FaAlignRight, FaAlignLeft } from "react-icons/fa6";

const Media = (props) => {
  const { contentState, block, imageSize } = props;
  const entityKey = block.getEntityAt(0);
  if (!entityKey) return null;
  const entity = contentState.getEntity(entityKey);
  const { src, alignment = 'left' } = entity.getData();

  let alignmentClass = '';
  if (alignment === 'center') alignmentClass = 'mx-auto';
  if (alignment === 'left') alignmentClass = 'mr-auto';
  if (alignment === 'right') alignmentClass = 'ml-auto';

  return (
    <img src={src} alt="image" className={`${alignmentClass}`}
      style={{ width: `${imageSize.width}px`, height: `${imageSize.height}px`, objectFit: 'cover', }} />
  );
};
const DraftEditor = ({ editorState, setEditorState }) => {
  const [imageSize, setImageSize] = useState({ width: 200, height: 200 });
  const [textAlign, setTextAlign] = useState('text-left');


  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };
  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };
  const toggleLink = (editorState, url) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) return editorState;
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.push(editorState, contentStateWithEntity, 'apply-entity');
    return RichUtils.toggleLink(newEditorState, selection, entityKey);
  };
  const handleResize = (direction) => {
    setImageSize((prevSize) => {
      let { width, height } = prevSize;
      if (direction === 'increase') {
        width += 20;
        height += 20;
      } else if (direction === 'decrease') {
        width = width > 20 ? width - 20 : 20;
        height = height > 20 ? height - 20 : 20;
      }
      return { width, height };
    });
  };
  const handleAlign = (direction) => {
    setTextAlign(direction);
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const blockKey = selection.getStartKey();
    const block = contentState.getBlockForKey(blockKey);
    const blockType = block.getType();
    if (blockType === 'atomic') {
      const entityKey = block.getEntityAt(0);
      if (entityKey) {
        const newContentState = contentState.mergeEntityData(entityKey, { alignment: direction });
        const newEditorState = EditorState.push(editorState, newContentState, 'apply-entity');
        setEditorState(newEditorState);
      }
    } else {
      let newType = 'unstyled';
      if (direction === 'text-center') newType = 'text-center';
      if (direction === 'text-right') newType = 'text-right';
      if (direction === 'text-left') newType = 'text-left';
      const newContentState = Modifier.setBlockType(contentState, selection, newType);
      const newEditorState = EditorState.push(editorState, newContentState, 'change-block-type');
      setEditorState(newEditorState);
    }
  };
  const blockStyleFn = (block) => {
    const type = block.getType();
    if (type === 'text-left') return 'text-left';
    if (type === 'text-center') return 'text-center';
    if (type === 'text-right') return 'text-right';
    return '';
  };
  const blockRenderMap = DefaultDraftBlockRenderMap.merge(Immutable.Map({
    'text-left': { element: 'div' },
    'text-center': { element: 'div' },
    'text-right': { element: 'div' },
  }));

  const insertImage = (file) => {
    new Compressor(file, {
      quality: 0.6,
      maxWidth: 800,
      maxHeight: 800,
      success(result) {
        const reader = new FileReader();
        reader.onload = () => {
          const contentState = editorState.getCurrentContent();
          const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', {
            id: uuidv4(),
            src: reader.result,
          });
          const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
          const newEditorState = AtomicBlockUtils.insertAtomicBlock(
            EditorState.set(editorState, { currentContent: contentStateWithEntity }),
            entityKey,
            ' '
          );
          setEditorState(newEditorState);
        };
        reader.readAsDataURL(result);
      },
      error(err) {
        console.error('Error while compressing image:', err);
      },
    });
  };

  const mediaBlockRenderer = (block) => {
    if (block.getType() === 'atomic') {
      return {
        component: (props) => <Media {...props} imageSize={imageSize} />,
        editable: false,
      };
    }
    return null;
  };

  return (
    <div className="border border-gray-300 p-4 rounded-md">
      <div className="mb-4 flex flex-wrap gap-2">
        <ButtonGroup variant="outlined">
          <Button onClick={() => toggleInlineStyle('BOLD')}>Bold</Button>
          <Button onClick={() => toggleInlineStyle('ITALIC')}>Italic</Button>
          <Button onClick={() => toggleInlineStyle('UNDERLINE')}>Underline</Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined">
          <Button onClick={() => handleResize('increase')}>+</Button>
          <Button onClick={() => handleResize('decrease')}>-</Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined">
          <Button
            onClick={() => {
              const url = prompt('Nhập URL:');
              if (url) {
                const newState = toggleLink(editorState, url);
                setEditorState(newState);
              }
            }}
          >
            Thêm Link
          </Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined">
          <Button onClick={() => handleAlign('left')}><FaAlignLeft /></Button>
          <Button onClick={() => handleAlign('center')}><FaAlignCenter /></Button>
          <Button onClick={() => handleAlign('right')}><FaAlignRight /></Button>
        </ButtonGroup>
        <input
          type="file"
          accept="image/*"
          className="border border-blue-300 rounded px-2 cursor-pointer hover:opacity-80"
          onChange={(e) => {
            const files = Array.from(e.target.files);
            if (files.length > 0) {
              files.forEach(insertImage);
            }
          }}
        />
      </div>

      <div className={`min-h-[150px] p-4 border border-gray-300 rounded bg-white ${textAlign}`}>
        <Editor
          onChange={setEditorState}
          editorState={editorState}
          blockRenderMap={blockRenderMap}
          handleKeyCommand={handleKeyCommand}
          blockRendererFn={mediaBlockRenderer}
          blockStyleFn={blockStyleFn}
        />
      </div>
    </div>
  );
};

export default DraftEditor;
