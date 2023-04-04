import React, { useEffect } from "react";
import {
  Group,
  Checkbox,
  Button,
  Box,
  ActionIcon,
  Stack,
  useMantineTheme,
  Select,
  Title,
} from "@mantine/core";
import {
  IconClipboardCopy,
  IconTrash,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import {
  executionStatus,
  runRegression,
  startLiveAuthoring,
  stopLiveAuthoring,
} from "@/api/liveAuthoring";
import { DateTimePicker } from "@mantine/dates";
import { getDateInFormat } from "@/utils/dateUtils";

export interface OperationsBarProps {
  suite: any;
  liveActive: boolean;
  setLiveActive: (val: boolean) => void;
  browserDetails: any;
  setBrowserDetails: (val: any) => void;
  regressionActive: boolean;
  setRegressionActive: (val: boolean) => void;
  fetchSuite: () => void;
  history: string;
  setHistory: (val: string) => void;
  liveExecutionId: string;
  setLiveExecutionId: (val: string) => void;
}

const OperationsBar: React.FC<OperationsBarProps> = ({
  suite,
  liveActive,
  setLiveActive,
  browserDetails,
  setBrowserDetails,
  regressionActive,
  setRegressionActive,
  fetchSuite,
  history,
  setHistory,
  liveExecutionId,
  setLiveExecutionId,
}) => {
  const theme = useMantineTheme();

  const [loading, setLoading] = React.useState(false);

  const handleRegresionTest = async (inLive: boolean) => {
    let status = "unExecuted";
    setRegressionActive(true);
    const suiteId = suite?.id;
    let execType = liveActive ? "live" : "reg";
    execType = inLive ? "live" : execType;
    const resp = await runRegression(suite?.id, execType);
    setLiveExecutionId(resp.data.execution_id);
    getStatus(resp.data.execution_id);
  };

  const getStatus = async (execution_id: string) => {
    console.log("execution_id", execution_id);
    const execStatus = await executionStatus(execution_id);
    fetchSuite();

    if (execStatus.data.execution_status !== "unExecuted") {
      setRegressionActive(false);
      fetchSuite();
      return;
    }
    setTimeout(() => getStatus(execution_id), 1000);
  };

  // useEffect(() => {
  //   // if (regressionActive) {
  //   getStatus();
  //   // }
  // }, [regressionActive]);

  const handleLiveAuthoring = async () => {
    if (!liveActive) {
      try {
        setLoading(true);
        const resp = await startLiveAuthoring(suite?.id);
        setBrowserDetails(resp.data);
        handleRegresionTest(true);
        fetchSuite();
        // setLiveExecutionId(suite?.last_executed_status[0]?.id);
        setLiveActive(true);
        setLoading(false);
      } catch (err: any) {
        notifications.show({
          title: "Error",
          color: "red",
          message: err.message,
        });

        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const resp = await stopLiveAuthoring(suite?.id);
        setLiveExecutionId("");
        setBrowserDetails({});
        setLiveActive(false);
        setLoading(false);
      } catch (err: any) {
        notifications.show({
          title: "Error",
          color: "red",
          message: err.message,
        });

        setLoading(false);
      }
    }
  };
  const calcData = () => {
    const a =
      suite?.last_executed_status?.map((item: any) => {
        return {
          label: getDateInFormat(new Date(item?.start_time)),
          value: item?.start_time,
        };
      }) || [];
    console.log("a", a);
    const data = [
      {
        label: "Current",
        value: "",
      },
      ...a,
    ];
    console.log("data", data);
    return data;
  };
  return (
    <Box>
      <Group position="apart">
        <Box>
          <Group>
            <Checkbox />
            <ActionIcon>
              <IconClipboardCopy />
            </ActionIcon>
            {/* <ActionIcon>
              <IconTrash />
            </ActionIcon> */}
            <Select
              maw={320}
              mx="auto"
              placeholder="Select Histroy"
              // value={getDateInFormat(new Date(history))}
              // defaultValue={""}
              data={calcData() || []}
              onChange={(e: any) => {
                console.log("e", e);
                setHistory(e);
              }}
              transitionProps={{
                transition: "pop-top-left",
                duration: 80,
                timingFunction: "ease",
              }}
              withinPortal
            />
          </Group>
        </Box>

        <Group>
          <Title order={6}>{suite?.step?.length} steps</Title>
          <Button
            size="xs"
            // compact
            // radius="xl"
            variant="filled"
            leftIcon={
              <IconPlayerPlayFilled
                style={{
                  width: "15px",
                  // color: 'white',
                }}
              />
            }
            onClick={() => handleRegresionTest(false)}
            disabled={regressionActive}
            loading={regressionActive}
          >
            Run
          </Button>
          <Button
            size="xs"
            // compact
            // radius="xl"
            variant="outline"
            color={liveActive ? "red" : "teal"}
            onClick={handleLiveAuthoring}
            loading={loading}
            leftIcon={
              <IconPlayerPlayFilled
                style={{
                  width: "15px",
                  // color: 'white',
                }}
              />
            }
          >
            {liveActive ? "Stop Live Authoring" : "Start Live Authoring"}
          </Button>
        </Group>
      </Group>
    </Box>
  );
};

export default OperationsBar;
