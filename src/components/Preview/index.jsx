import { Box, Textarea, Button, ScrollArea, Text } from '@mantine/core';
import { useState } from 'react';

export default function Aside() {
    const [chatHistory, setChatHistory] = useState([]);
    const [input, setInput] = useState('');

    const handleSendMessage = () => {
        if (input.trim() === '') return;

        setChatHistory([...chatHistory, { user: input, bot: 'This is a response from the bot.' }]);
        setInput(''); // Reset input after sending
    };

    return (
        <Box p="md" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Text weight={500} mb="md">Chatbot</Text>
            <ScrollArea style={{ flex: 1, marginBottom: '1rem' }}>
                {chatHistory.map((chat, index) => (
                    <Box key={index} mb="md">
                        <Text align="right" color="blue">{chat.user}</Text>
                        <Text align="left" color="green">{chat.bot}</Text>
                    </Box>
                ))}
            </ScrollArea>
            <Textarea
                value={input}
                onChange={(event) => setInput(event.currentTarget.value)}
                placeholder="Type your message..."
                minRows={2}
                maxRows={4}
                style={{ marginBottom: '1rem' }}
            />
            <Button onClick={handleSendMessage} color="blue">Send</Button>
        </Box>
    );
}
