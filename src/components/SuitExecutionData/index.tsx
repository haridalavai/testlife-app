import { getDateInFormat, getFormattedDate } from "@/utils/dateUtils";
import { Box, Group, useMantineTheme, Center, Text } from "@mantine/core";
import React, { useEffect } from "react";
import Stats from "../Stats";

export interface SuiteExecutionDataProps {
  suite: any;
  history: string;
}

const SuiteExecutionData: React.FC<SuiteExecutionDataProps> = ({
  suite,
  history,
}) => {
  const theme = useMantineTheme();
  const [historySuite, setHistorySuite] = React.useState<any>([]);
  const [failedStep, setFailedStep] = React.useState<any>(null);
  useEffect(() => {
    setFailedStep(null);
    if (!suite?.last_executed_status) return;
    if (history === "") {
      setHistorySuite(suite?.last_executed_status[0]);
    } else if (suite?.last_executed_status?.length > 0) {
      let hs = suite?.last_executed_status?.filter((item: any) => {
        if (item?.start_time === history) {
          return item;
        }
      });

      console.log("hsh", hs);
      setHistorySuite(hs[0]);
    }
    if (historySuite?.execution_status === "false") {
      let failedStep = historySuite?.step_exec_response.filter((item: any) => {
        if (item?.execution_status === "false") {
          return item;
        }
      });
      setFailedStep(failedStep[0]);
    }
  }, [
    history,
    historySuite?.execution_status,
    historySuite?.step_exec_response,
    suite,
  ]);
  return (
    <Box>
      {suite?.last_executed_status?.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <Stats
            title="Execution Status"
            value={
              historySuite?.execution_status === "true"
                ? "Passed"
                : historySuite?.execution_status === "false"
                ? "Failed"
                : "In Progress"
            }
            color={
              historySuite?.execution_status === "true"
                ? theme.colors.teal[6]
                : historySuite?.execution_status === "false"
                ? theme.colors.red[6]
                : theme.colors.gray[6]
            }
          />
          <Stats
            title="Executed On"
            value={getFormattedDate(new Date(historySuite?.start_time))}
            color={theme.colors.gray[6]}
          />
          <Stats
            title="Execution Time"
            value={historySuite?.time_took_to_execute?.toFixed(2) + " mins"}
            color={theme.colors.gray[6]}
          />
          {failedStep && (
            <Stats
              title="Execution Failure Reason"
              value={failedStep?.step_err}
              color={theme.colors.gray[6]}
            />
          )}
        </Box>
      ) : (
        <Center>
          <Text>No Executions Found</Text>
        </Center>
      )}
    </Box>
  );
};

export default SuiteExecutionData;
