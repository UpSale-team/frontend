
import { Button , Flex, Title } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import CreateProjectDrawer from '../Drawer/CreateProjectDrawer';
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import appStrings from '../../utils/strings';
import ProjectCard from '../../components/ProjectCard';

export default function HomePage() {
    const [isNewProjectOpen, newProjectToggle] = useDisclosure(false);
    return (
            <Flex direction="column" gap={30}>
            <Flex direction="column" gap={30}>
                <Title order={1}>
                    Welcome
                    
                </Title>
            </Flex>
            <Flex>
            <Button
              leftSection={<IconPlus size="1rem" />}
              onClick={newProjectToggle.open}
            >
              {appStrings.language.home.createBtn}
            </Button>
            <CreateProjectDrawer
            open={isNewProjectOpen}
            onClose={newProjectToggle.close}
      />
          </Flex>
          <ProjectCard/> 
          </Flex>

    
    );
}
