import React, { useEffect } from "react";
import {
  Group,
  TextInput,
  Button,
  Checkbox,
  Title,
  ActionIcon,
  Indicator,
  Box,
  Stack,
  useMantineTheme,
  createStyles,
  rem,
} from "@mantine/core";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { transformInput, transformStep } from "@/utils/inputTransformer";
import { deleteStep, saveStep } from "@/api/liveAuthoring";
import CreateStep from "../createStep";
import { notifications } from "@mantine/notifications";

export interface StepConponentProps {
  step: any;
  fetchSuite: () => void;
  liveActive: boolean;
  status: string;
  isHistory: boolean;
  liveExecutionId: string;
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginBottom: rem(30),
  },

  dropzone: {
    borderWidth: rem(1),
    paddingBottom: rem(50),
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  control: {
    position: "absolute",
    width: rem(250),
    left: `calc(50% - ${rem(50)})`,
    // top: rem(20),
    marginTop: rem(30),
  },
}));

const StepConponent: React.FC<StepConponentProps> = ({
  step,
  fetchSuite,
  liveActive,
  status,
  isHistory,
  liveExecutionId,
}) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [isNewStep, setIsNewStep] = React.useState(false);
  const [stepName, setStepName] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const inp = transformStep(step);
    console.log(inp);
    setStepName(inp);
  }, [step]);

  const handleDeleteStep = async () => {
    setLoading(true);
    try {
      const res = await deleteStep(step.id);
      notifications.show({
        title: "Success",
        color: "teal",
        message: "Step deleted successfully",
      });
    } catch (e: any) {
      console.log(e);
      notifications.show({
        title: "Error",
        color: "red",
        message: e.message,
      });
    } finally {
      setLoading(false);
      fetchSuite();
    }
  };

  return (
    <>
      <Box
        sx={{
          padding: "20px",
          margin: "10px 0px",
          backgroundColor: hovered
            ? theme.colorScheme === "dark"
              ? theme.colors.gray[7]
              : theme.colors.gray[3]
            : theme.colorScheme === "dark"
            ? theme.colors.gray[8]
            : "white",
          borderRadius: "5px",
          border: hovered ? `1px solid ${theme.colors.gray[5]}` : "none",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Stack>
          <Group position="apart">
            <Group>
              <Checkbox
                checked={checked}
                onChange={(e) => {
                  setChecked(e.currentTarget.checked);
                }}
              />
              <Indicator
                radius="md"
                color={
                  status === "true"
                    ? theme.colors.green[5]
                    : status === "false"
                    ? theme.colors.red[5]
                    : theme.colors.gray[5]
                }
              >
                <></>
              </Indicator>
              <Title order={6}>{stepName}</Title>
            </Group>
          </Group>

          {hovered && !isNewStep && (
            <Box className={classes.control}>
              <Button
                size="xs"
                compact={true}
                onClick={() => setIsNewStep(true)}
                style={{ marginRight: "10px" }}
              >
                <IconPlus size={16} />
              </Button>
              <Button
                size="xs"
                color="red"
                compact={true}
                onClick={handleDeleteStep}
                loading={loading}
              >
                <IconTrash size={16} />
              </Button>
            </Box>
          )}
        </Stack>
      </Box>
      {isNewStep && (
        <CreateStep
          fetchSuite={fetchSuite}
          step={step}
          setIsNewStep={setIsNewStep}
          liveActive={liveActive}
          executionId={liveExecutionId}
        />
      )}
    </>
  );
};

export default StepConponent;
