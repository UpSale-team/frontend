import style from "./style.module.css";
import { Button, Group, Menu, Text, Modal, Tabs, Box } from '@mantine/core';
import { useState } from 'react';

export default function Header() {
  const [opened, setOpened] = useState(false);
  const [model, setModel] = useState('Gemeni');
  const [activeTab, setActiveTab] = useState('Develop');

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        width: '100%',
        borderBottom: '1px solid #eaeaea',  // Adds a subtle border at the bottom for separation
      }}
    >
      {/* Dropdown to select model */}
      <Menu>
        <Menu.Target>
          <Button variant="outline" size="sm">{model}</Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={() => setModel('Gemeni')}>Gemeni</Menu.Item>
          <Menu.Item onClick={() => setModel('gpt4o')}>gpt4o</Menu.Item>
        </Menu.Dropdown>
      </Menu>

      {/* Tabs for Develop and Analysis */}
      <Group position="center" spacing="lg" style={{ flexGrow: 1, justifyContent: 'center' }}>
        <Tabs value={activeTab} onTabChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="Develop" style={{ padding: '10px 20px', fontWeight: activeTab === 'Develop' ? 'bold' : 'normal' }}>Develop</Tabs.Tab>
            <Tabs.Tab value="Analysis" style={{ padding: '10px 20px', fontWeight: activeTab === 'Analysis' ? 'bold' : 'normal' }}>Analysis</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Group>

      {/* Publish button */}
      <Button color="blue" size="sm" onClick={() => setOpened(true)}>Publish</Button>

      {/* Modal for publishing */}
      <Modal opened={opened} onClose={() => setOpened(false)} title="Publish Options" centered>
        <Text>Some questions and details here...</Text>
        <Group position="right" mt="md">
          <Button variant="outline">Skip and Publish</Button>
          <Button color="blue">Confirm</Button>
        </Group>
      </Modal>
    </Box>
  );
}
