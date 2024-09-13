import { useState, useRef, useEffect } from 'react';

const AutoResizeTextarea = () => {
    const [value, setValue] = useState('');
    const textareaRef = useRef(null);

    // 调整高度的函数
    const adjustHeight = () => {
        const textarea = textareaRef.current as HTMLTextAreaElement | null;

        if (textarea) {
            // 使用 textarea
        } else {
            console.error('Textarea reference is null');
        }
        if (textarea) { // 确保 textarea 不为空
            // 先重置高度
            textarea.style.height = 'auto';
            // 设置为内容的高度
            textarea.style.height = `${textarea.scrollHeight}px`; // 使用模板字符串以确保单位正确附加
        }
    };

    // 假设这是完整的函数定义
    function handleChange(event: React.FormEvent<HTMLTextAreaElement>) {
        // 处理事件逻辑
        const target = event.target as HTMLTextAreaElement;
        const value = target.value;
        console.log('Value changed:', value);
    }

    // 在每次渲染后，更新 textarea 的高度
    useEffect(() => {
        adjustHeight();
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            placeholder="Type something..."
            style={{
                width: '100%',
                minHeight: '100px',
                resize: 'none', // 禁止手动拖动调整大小
                overflow: 'hidden',
            }}
        />
    );
};

export default AutoResizeTextarea;