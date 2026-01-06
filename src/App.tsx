/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/refs */
import * as React from 'react';
import { Divider, Splitter } from 'antd';
import useToggleAgent from './hooks/useToggleAgent';
import Chat from './components/modal/chat';

import './App.css'

export default function App() {
  const agentPath = React.useRef('');
  const chatRef = React.useRef<any>(null);
  const [forceKey, setForceKey] = React.useState(0);

  const forceUpdate = () => {
    setForceKey(forceKey + 1)
  }

  const { element } = useToggleAgent({
    callback: (value: string) => {
      agentPath.current = value;

      chatRef.current.setInput('');
      chatRef.current.setMessages([]);
      chatRef.current.clearError();

      forceUpdate();
    },
  });

  return (
    <>
      <Splitter>
        <Splitter.Panel collapsible={{ start: true, end: true, showCollapsibleIcon: true }} max={250} min={250}>
          {element}
          <Divider></Divider>
        </Splitter.Panel>
        <Splitter.Panel collapsible={{ start: true, end: true }}>
          <Chat ref={chatRef} agentPath={agentPath} key={forceKey}/>
        </Splitter.Panel>
      </Splitter>
    </>
  );
}
