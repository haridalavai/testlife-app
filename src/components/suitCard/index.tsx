import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  Menu,
  NavLink,
  Progress,
  rem,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import {
  IconDots,
  IconFileZip,
  IconEye,
  IconTrash,
  IconSignRightFilled,
  IconArrowRight,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DeleteDuiteModal from "../deleteSuiteModal";

export interface ISuitCard {
  suite: any;
  fetchSuites: () => void;
}

const SuitCard: React.FC<ISuitCard> = ({ suite, fetchSuites }) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const [deleteSuitModalOpen, setDeleteSuitModalOpen] = useState(false);
  const [executionProgress, setExecutionProgress] = useState([
    {
      value: 0,
      color: theme.colors.gray[6],
      label: "0",
    },
  ]);
  const [executionStatus, setExecutionStatus] = useState("unExecuted");

  const handleDeleteSuite = () => {
    setDeleteSuitModalOpen(true);
  };

  const handleDeleteSuiteClose = () => {
    setDeleteSuitModalOpen(false);
    fetchSuites();
  };

  const handleCardClick = () => {
    router.push(`/suites/${suite.id}`);
  };

  useEffect(() => {
    if (!suite?.last_executed_status[0]?.step_exec_response) return;
    const totalSteps = suite.step.length;
    const passedSteps =
      suite?.last_executed_status[0]?.step_exec_response?.filter(
        (step: any) => step.execution_status === "true"
      ).length;
    const failedSteps =
      suite.last_executed_status[0]?.step_exec_response?.filter(
        (step: any) => step.execution_status === "false"
      ).length;
    const skippedSteps = totalSteps - (passedSteps + failedSteps);
    setExecutionProgress([
      {
        value: (passedSteps / totalSteps) * 100,
        color: theme.colors.teal[6],
        label: `${passedSteps}`,
      },
      {
        value: (failedSteps / totalSteps) * 100,
        color: theme.colors.red[6],
        label: `${failedSteps}`,
      },
      {
        value: (skippedSteps / totalSteps) * 100,
        color: theme.colors.gray[6],
        label: `${skippedSteps}`,
      },
    ]);

    if (suite?.last_executed_status[0]?.execution_status === "false") {
      setExecutionStatus("false");
    } else if (suite?.last_executed_status[0]?.execution_status === "true") {
      setExecutionStatus("true");
    } else {
      setExecutionStatus("unExecuted");
    }
  }, []);

  return (
    <Card
      shadow="md"
      withBorder
      style={{
        width: "240px",
        borderColor:
          executionStatus === "false"
            ? theme.colors.red[6]
            : executionStatus === "true"
            ? theme.colors.teal[6]
            : theme.colors.gray[6],
      }}
    >
      <Card.Section
        inheritPadding
        sx={{
          padding: "10px 20px 5px 20px",
        }}
      >
        <Group align="center">
          <Title order={3}>{suite.suite_name}</Title>
        </Group>
      </Card.Section>
      {/* <Card.Section inheritPadding sx={{}}> */}
      <Box
        sx={
          {
            // display: "flex",
            // flexDirection: "row",
          }
        }
      >
        <Box w="100%">
          <Text
            sx={{
              fontWeight: "lighter",
            }}
          >
            {`${suite.step.length} Total Test Steps`}
          </Text>
        </Box>
      </Box>

      <Progress sections={executionProgress} size={20} mt={40} />

      {/* </Card.Section> */}
      <Card.Section
        inheritPadding
        sx={{
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <Group position="right">
          <ActionIcon
            size="lg"
            color="red"
            variant="outline"
            onClick={handleDeleteSuite}
          >
            <IconTrash size={20} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="teal"
            variant="light"
            onClick={handleCardClick}
          >
            <IconArrowRight size={20} />
          </ActionIcon>
        </Group>
      </Card.Section>
      <DeleteDuiteModal
        opened={deleteSuitModalOpen}
        close={() => handleDeleteSuiteClose()}
        suitId={suite.id}
        suiteName={suite.suite_name}
      />
    </Card>
  );
};

export default SuitCard;
