import { Card, useMantineTheme } from "@mantine/core";
import React, { useEffect } from "react";
import CreateStep from "../createStep";
import StepConponent from "../StepComponent";

export interface TestEditorProps {
  suite: any;
  fetchSuite: () => void;
  liveActive: boolean;
  history: string;
  liveExecutionId: string;
}

const TestEditor: React.FC<TestEditorProps> = ({
  suite,
  fetchSuite,
  liveActive,
  history,
  liveExecutionId,
}) => {
  const theme = useMantineTheme();
  console.log("suite", suite);
  console.log("history", history);
  const [steps, setSteps] = React.useState<any>([]);

  return (
    <Card
      shadow="md"
      sx={{
        padding: "20px 0",
        margin: "20px 0",
        display: "flex",
        flexDirection: "column",
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.gray[9]
            : theme.colors.gray[1],
      }}
    >
      {suite?.last_executed_status !== undefined &&
      suite?.last_executed_status[0] !== undefined &&
      history !== suite?.last_executed_status[0].start_time &&
      history !== ""
        ? suite?.last_executed_status
            ?.filter((item: any) => {
              if (item?.start_time === history) {
                return item.step_exec_response;
              }
            })[0]
            .step_exec_response?.map((ste: any, index: number) => {
              return (
                <StepConponent
                  key={index}
                  step={ste}
                  fetchSuite={fetchSuite}
                  liveActive={false}
                  status={ste?.execution_status}
                  liveExecutionId={liveExecutionId}
                  isHistory={true}
                />
              );
            })
        : suite?.step?.map((ste: any, index: number) => (
            <StepConponent
              key={index}
              step={ste}
              fetchSuite={fetchSuite}
              liveActive={liveActive}
              liveExecutionId={liveExecutionId}
              status={
                suite?.last_executed_status[0]?.step_exec_response[index]
                  ?.execution_status
              }
              isHistory={false}
            />
          ))}
      {suite?.step?.length === 0 && (
        <CreateStep
          step={{
            suite_id: suite?.id,
          }}
          liveActive={liveActive}
          fetchSuite={fetchSuite}
          executionId={liveExecutionId}
        />
      )}
    </Card>
  );
};

export default TestEditor;
