/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, message, Select, Space } from 'antd';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { HOST } from '@/constants';

const useToggleAgent = ({ callback }: any) => {
  const [value, setValue] = useState<string>();
  const [options, setOptions] = useState([]);

  const submit = useCallback(
    (_value?: string, showTip = false) => {
      callback(_value || value);

      if (showTip) {
        message.success('切换成功');
      }
    },
    [callback, value]
  );

  const element = useMemo(() => {
    return (
      <Flex wrap justify={'center'}>
        <div className='h2'>切换智能体</div>
        <Flex justify={'center'} align={'center'}>
          <Space>
            <Select value={value} style={{ width: 120 }} onChange={setValue} options={options} />
            <Button type='primary' onClick={() => submit('', true)}>
              确定
            </Button>
          </Space>
        </Flex>
      </Flex>
    );
  }, [value, options, submit]);

  useEffect(() => {
    fetch(`${HOST}/common/all-agent-pathName`).then(async (result) => {
      const json = await result.json();
      const options = json.map((item: { name: unknown; id: unknown }) => ({ label: item.name, value: item.id }));
      const defaultValue = options[0].value;

      setOptions(options);
      setValue(defaultValue);
      submit(defaultValue);
    });
  }, []);

  return {
    element,
  };
};

export default useToggleAgent;
