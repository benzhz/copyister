import React, { useState, useEffect } from "react";
import AddLogModal from "./components/AddLogModal";
import "./content.module.less";
 
import HighlightSvg from './components/HighlightSvg';
import CloseButtonSvg from './components/CloseButtonSvg';
import { createPortal } from 'react-dom';
import { notification } from 'antd';
import './antd-diy.css';

const Content = () => {
  // State to control the visibility of the add log modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  // Store the values in the add log modal
  const [addLogModalValue, setAddLogModalValue] = useState([]);
  // Track all highlights
  const [highlights, setHighlights] = useState([]); 

  // Use the notification hook from antd to get the api and context holder
  const [api, contextHolder] = notification.useNotification();
  /**
   * Open a notification with an icon
   * @param {string} type - The type of the notification, such as'success', 'error', etc.
   * @param {string} message - The description message of the notification
   */
  const openNotificationWithIcon = (type,message) => {
    api[type]({
      message: 'messages',
      description:message,
      placement: 'bottomRight',
    });
  };

  /**
   * Handle the keydown event
   * When Ctrl + Shift + C are pressed simultaneously, prevent the default behavior and show the add log modal
   * @param {KeyboardEvent} event - The keyboard event object
   */
  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.shiftKey && event.key === 'C') {
      event.preventDefault();
      showAddLogModal()
    }
  }

  /**
   * Show the add log modal
   * Set the isModalVisible state to true
   */
  const showAddLogModal = () => {
    setIsModalVisible(true);
  };

  /**
   * Close the add log modal
   * Set the isModalVisible state to false, and clear the highlights and modal values
   */
  const closeAddLogModal = () => {
    setIsModalVisible(false);
    setHighlights([]);
    setAddLogModalValue([]);
  };

  /**
   * Save the selected text to the clipboard
   * If no text is selected, show an error notification; otherwise, copy all selected text to the clipboard
   * Show a success notification after successful copying, clear the highlights and modal values, and close the modal
   * Show an error notification if the copying fails
   */
  const onSave = async () => {
    if (!addLogModalValue.length) {
      openNotificationWithIcon('error', "Please select text first");
      return;
    }
    const allText = highlights.map(item => item.selectedText).join('');
    try {
      await navigator.clipboard.writeText(allText);
      console.log('All selected text copied to clipboard:', allText);
      openNotificationWithIcon('success', 'Copy successful!');
      setHighlights([]);
      setAddLogModalValue([]);
    } catch (err) {
      console.error('Copy failed: ', err);
      openNotificationWithIcon('error', "Copy failed");
    }
    setIsModalVisible(false);
    
  };

    // copy clientRects
    const copyRects = (clientRects) =>{
      let res = [];
      for(var i = 0 ;i<clientRects.length;i++){
            var rect = clientRects[i];
            res[i] = copyRect(rect);
           }
      return res;
    };
    const copyRect = (rect) =>{
     
            var res  = 
          { bottom:rect.bottom,
            height:rect.height,
            left: rect.left, 
            right: rect.right,
            top: rect.top,
            width: rect.width,
            x: rect.x,
            y: rect.y
                };
      return res;
    };

  /**
   * Handle the mouseup event
   * When the modal is visible and the click is not on a path element, check if there is selected text
   * If there is, add a highlight and remove the selection range
   * @param {MouseEvent} event - The mouse event object
   */
  const handleMouseUp = (event) => {
    if (!isModalVisible) return;
    if (event.target.tagName === 'path') return;

    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = selection.toString().trim();

      if (selectedText) {
        addHighlight(range, selectedText);
        selection.removeAllRanges();
      }
    }
  };

  /**
   * Side effect handling when the component mounts and unmounts
   * Add keydown and mouseup event listeners when mounting
   * Remove these event listeners when unmounting
   */
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleKeyDown, handleMouseUp]);
  /**
   * Add a highlight effect
   * Generate a unique highlight identifier, add the highlight information to the highlights state
   * Also add the selected text information to the addLogModalValue state
   * @param {Range} range - The selected text range
   * @param {string} selectedText - The selected text content
   */
  const addHighlight = (range, selectedText) => {
    const highlightId = Date.now(); // Use a timestamp as a unique identifier    
    const clientRects = copyRects(range.getClientRects());
    const parentElement =  findParentEle(range);
    const parentClientRects = copyRect(parentElement.getBoundingClientRect());
    setHighlights(prev => [...prev, { id: highlightId, range,clientRects, parentElement,parentClientRects,selectedText }]);
    setAddLogModalValue(prevValue => [...prevValue, { id: highlightId, text: selectedText }]);
  };


  // Find the nearest positionable parent element or fallback to the body
  const findParentEle = (range)=>{
    const parentElement = range.startContainer.parentNode || document.body; 
    while (parentElement && parentElement!== document.body) {
      if (parentElement.style.position!== 'relative') {
          parentElement.style.position = 'relative';
      }
      break;
    }
    return parentElement;
  }

  /**
   * Remove a highlight effect
   * Filter out the highlight to be removed based on the passed-in highlight identifier
   * Also remove the corresponding entry from the addLogModalValue
   * @param {number} idToRemove - The identifier of the highlight to be removed
   */
  const removeHighlight = (idToRemove) => {
    // Filter out the highlight to be removed
    setHighlights(highlights.filter(({ id }) => id !== idToRemove));
    
    // Also remove the corresponding entry from addLogModalValue
    setAddLogModalValue(addLogModalValue.filter(item => item.id !== idToRemove));
  };

  /**
   * Highlight style component
   * Generate a highlight SVG and a close button SVG based on the highlight information, and render them into the specified parent element through createPortal
   * @param {Object} props - Component properties
   * @param {Object} props.highlight - The highlight information object
   */
  const HighlightSelectionComponent = ({ highlight }) => {
    const clientRects = highlight.clientRects;
    const parentClientRects = highlight.parentClientRects;
    const parentElement = highlight.parentElement;
    return createPortal(
      <>
        <HighlightSvg clientRects={clientRects} parentRect={parentClientRects} />
        <CloseButtonSvg
          clientRects={clientRects}
          parentRect={parentClientRects}
          onClose={() => 
            {
              removeHighlight(highlight.id);}}
        />
      </>,
      parentElement // Render into the found parent element
    );
  };

  return (
    <>
          {contextHolder}
    <div className="CRX-antd-diy">
      {isModalVisible && (
        <AddLogModal
          value={addLogModalValue}
          onSave={onSave}
          onCancel={closeAddLogModal}
        />
      )}
      {highlights.map(highlight => (
        <HighlightSelectionComponent key={highlight.id} highlight={highlight} />
      ))}
    </div>
    </>
  );
};

export default Content;
