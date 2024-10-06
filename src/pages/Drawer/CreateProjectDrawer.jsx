import {
  Modal,
  Flex,
  TextInput,
  Textarea,
  Button,
  Title,
  Container,
} from "@mantine/core";
import appStrings from "../../utils/strings";

export default function CreateProjectDrawer({ open, onClose }) {
  return (
    <Modal opened={open} onClose={onClose} size ='md' title={appStrings.language.createBot.title} centered>
      
        <Flex
          gap="lg"
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
        >
          
          <TextInput
            label={appStrings.language.createBot.nameLabel}
            placeholder={appStrings.language.createBot.nameLabel}
            variant="filled"
            style={{ width: "100%" }}
            // onChange={handleInputChange}
            // value={projectName}
            required
          />
          <Textarea
            variant="filled"
            label={appStrings.language.createBot.descriptionLabel}
            placeholder={appStrings.language.createBot.descriptionLabel}
            style={{ width: "100%" ,height: "120px" }}
            autosize
            minRows={4}
            maxRows={8}
            // onChange={(event) => setDescription(event.target.value)}
            // value={description}
          />
        </Flex>
        <Flex justify="flex-end" gap="md" style={{ marginTop: "20px" }}>
          <Button variant="default" onClick={onClose}>
            {appStrings.language.btn.cancel}
          </Button>
          <Button
            // onClick={handleCreateProject}
            // loading={isLoading}
            // disabled={!projectName}
          >
            {appStrings.language.btn.create}
          </Button>
        </Flex>
      
    </Modal>
  )
}