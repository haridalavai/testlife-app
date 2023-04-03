import {
  Modal,
  useMantineTheme,
  TextInput,
  Group,
  Button,
  Stack,
  Box,
  Title,
} from "@mantine/core";
import React from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";

export interface ICreateSuitModal {
  opened: boolean;
  close: () => void;
}

const CreateSuitModal: React.FC<ICreateSuitModal> = ({ opened, close }) => {
  const theme = useMantineTheme();

  const [testSuiteName, setTestSuiteName] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleCreateSuite = async () => {
    try {
      setLoading(true);
      const resp = await axios.post(
        `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/v1/suite`,
        {
          suite_name: testSuiteName,
        }
      );
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
    setTestSuiteName("");
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
          Create Test Suite
        </Title>
        <Stack spacing={10} justify="space-between">
          <TextInput
            label="Test Suite Name"
            placeholder="Enter Test Suite Name"
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
            <Button
              variant="filled"
              loading={loading}
              onClick={handleCreateSuite}
            >
              Create
            </Button>
            <Button variant="outline" color="red" onClick={handleClose}>
              Cancel
            </Button>
          </Group>
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default CreateSuitModal;
