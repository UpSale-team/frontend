import { AppShell, Burger, Group, Textarea, Collapse, Title, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import appStrings from '../../utils/strings';
import OpeningText from '../ChatExperience/Openingtext';
import QuestionList from '../ChatExperience/QuestionList';
export default function Develop() {
    const [opened, { toggle }] = useDisclosure(false);
    

    return (
        <AppShell
            header={{ height: 100 }}
            navbar={{ width: 550, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            aside={{ width: 500, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
            padding="md"
        >

            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Textarea
                    variant="unstyled"
                    label={appStrings.language.develop.title1}
                    autosize
                    minRows={50}
                    maxRows={50}
                    placeholder={appStrings.language.develop.description}
                    labelProps={{ style: { fontSize: '18px', fontWeight: 'bold' } }}
                />
            </AppShell.Navbar>

            <AppShell.Main>
                <Title order={4}>Chat experience</Title>
                <Button
                    justify='flex-start'
                    size="md"
                    onClick={toggle}
                    variant="subtle"
                    fullWidth
                    leftSection={opened ? <IconChevronDown /> : <IconChevronRight />}
                >
                    {appStrings.language.develop.OpeningQues}
                </Button>
                <Collapse in={opened}>
                    <OpeningText />
                    <QuestionList />
                </Collapse>
            </AppShell.Main>

            <AppShell.Aside p="md">Aside</AppShell.Aside>
        </AppShell>
    );
}
