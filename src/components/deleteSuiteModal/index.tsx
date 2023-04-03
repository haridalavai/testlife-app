import {
  Modal,
  useMantineTheme,
  TextInput,
  Group,
  Button,
  Stack,
  Box,
  Text,
  Code,
  Title,
} from "@mantine/core";
import React from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { deleteSuite } from "@/api/liveAuthoring";

export interface IDeleteDuiteModal {
  opened: boolean;
  close: () => void;
  suitId: string;
  suiteName: string;
}

const DeleteDuiteModal: React.FC<IDeleteDuiteModal> = ({
  opened,
  close,
  suitId,
  suiteName,
}) => {
  const theme = useMantineTheme();
  const [loading, setLoading] = React.useState(false);
  const [testSuiteName, setTestSuiteName] = React.useState("");

  const handleCreateSuite = async () => {
    try {
      setLoading(true);

      const resp = await deleteSuite(suitId);

      notifications.show({
        title: "Success",
        color: "green",
        message: "Test Suite Created Successfully",
      });
      handleClose();
    } catch (err: any) {
      notifications.show({
        title: "Error",
        color: "red",
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setLoading(false);
    close();
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      withCloseButton={false}
      overlayProps={{
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
    >
      <Modal.Body>
        <Title
          order={2}
          style={{
            marginBottom: 20,
          }}
        >
          Delete Test Suite
        </Title>
        <Stack spacing={10} justify="space-between">
          <Group>
            <Text>{`Enter`}</Text>
            <Code>{suiteName}</Code>
            <Text>{`to delete`}</Text>
          </Group>
          <TextInput
            placeholder={`Enter ${suiteName} to delete`}
            required
            value={testSuiteName}
            onChange={(e) => setTestSuiteName(e.currentTarget.value)}
          />

          <Group
            position="right"
            style={{
              marginTop: 40,
            }}
          >
            <Button variant="outline" color="red" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="filled"
              loading={loading}
              onClick={handleCreateSuite}
              color="red"
              disabled={testSuiteName !== suiteName}
            >
              delete
            </Button>
          </Group>
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteDuiteModal;
