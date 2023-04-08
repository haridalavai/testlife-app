import DashboardLayout from "@/layouts/dashboardLayout";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Stack,
  useMantineTheme,
  Title,
  Anchor,
  Breadcrumbs,
  Tabs,
  Group,
  Box,
} from "@mantine/core";
import BackButton from "@/components/BackButton";
import TestEditor from "@/components/StepEditor";
import OperationsBar from "@/components/TestOperations";
import CreateStep from "@/components/createStep";
import SuiteExecutionData from "@/components/SuitExecutionData";
import StepDataEditor from "@/components/stepDataEditor";

const Suite = () => {
  const [suite, setSuite] = useState<any>({});
  const [liveActive, setLiveActive] = useState(false);
  const [liveExecutionId, setLiveExecutionId] = useState("");
  const [browserDetails, setBrowserDetails] = useState<any>();
  const [regressionActive, setRegressionActive] = useState(false);
  const [history, setHistory] = useState<any>();

  const theme = useMantineTheme();

  useEffect(() => {
    fetchSuite();
    if (
      suite?.last_executed_status &&
      suite?.last_executed_status[0].start_time
    ) {
      setHistory(suite?.last_executed_status[0].start_time);
    } else {
      setHistory("");
    }
  }, []);

  const fetchSuite = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/v1/suite/${suiteId}`
      );
      setSuite(res.data);
      console.log(res.data);
    } catch (err: any) {}
  };

  const items = [
    { title: "Test Suites", href: "/" },
    { title: "Steps", href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const router = useRouter();
  const { suiteId } = router.query;
  return (
    <DashboardLayout>
      {/* <BackButton url='/' /> */}
      <Stack
        sx={{
          padding: "20px 20px 20px 20px",
          borderBottom: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[2]
          }`,
        }}
      >
        <Breadcrumbs>{items}</Breadcrumbs>
        <Title order={1}>{suite.suite_name}</Title>
        <OperationsBar
          suite={suite}
          liveActive={liveActive}
          setLiveActive={setLiveActive}
          browserDetails={browserDetails}
          setBrowserDetails={setBrowserDetails}
          regressionActive={regressionActive}
          setRegressionActive={setRegressionActive}
          fetchSuite={fetchSuite}
          history={history}
          setHistory={setHistory}
          liveExecutionId={liveExecutionId}
          setLiveExecutionId={setLiveExecutionId}
        />
      </Stack>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Stack
          spacing={20}
          sx={{
            padding: "20px 20px 20px 20px",
            borderBottom: `1px solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[2]
            }`,
            borderRight: `1px solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[2]
            }`,
            // backgroundColor: `${
            //   theme.colorScheme === "dark" ? theme.colors.dark[7] : "white"
            // }`,
            height: "100vh",
            width: "50%",
          }}
        >
          <TestEditor
            liveActive={liveActive}
            suite={suite}
            fetchSuite={fetchSuite}
            history={history}
            liveExecutionId={liveExecutionId}
          />
        </Stack>
        <Stack
          sx={{
            width: "50%",
          }}
        >
          {liveActive ? (
            <Box>
              <iframe
                // src={`http://143.244.142.134:3000${browserDetails?.devtoolsFrontendUrl}`}
                src={`https://${process.env.NEXT_PUBLIC_BROWSER_HOST}/devtools/inspector.html?wss=browser.axden.in/devtools/page/${browserDetails.id}`}
                style={{
                  width: "100%",
                  height: "100vh",
                  border: "none",
                }}
              />
            </Box>
          ) : (
            <Tabs
              color="teal"
              defaultValue="first"
              sx={{
                padding: "20px 20px 20px 20px",
              }}
            >
              <Tabs.List>
                <Tabs.Tab value="first">Summary</Tabs.Tab>
                <Tabs.Tab value="second">Step Editor</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="first" pt="xs">
                <SuiteExecutionData suite={suite} history={history} />
              </Tabs.Panel>

              {/* <Tabs.Panel value="second" pt="xs">
                <StepDataEditor />
              </Tabs.Panel> */}
            </Tabs>
          )}
        </Stack>
      </Box>
    </DashboardLayout>
  );
};

export default Suite;
