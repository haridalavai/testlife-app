import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import DashboardLayout from "@/layouts/dashboardLayout";
import {
  Button,
  Title,
  Container,
  Stack,
  Grid,
  Group,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import CreateSuitModal from "@/components/CreateSuitModal";
import SuitCard from "@/components/suitCard";
import DeleteDuiteModal from "@/components/deleteSuiteModal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [suites, setSuites] = useState([]);
  const [createSuitModalOpen, setCreateSuitModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSuites();
  }, []);

  const handleCreateSuite = () => {
    setCreateSuitModalOpen(true);
  };

  const handleCreateSuiteClose = () => {
    setCreateSuitModalOpen(false);
    fetchSuites();
  };

  const fetchSuites = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/v1/suites`
      );
      setSuites(res.data);
    } catch (err: any) {
      notifications.show({
        title: "Error",
        color: "red",
        message: err.message,
      });
    }
  };

  return (
    <DashboardLayout>
      <Container size="xl">
        <Stack
          spacing={40}
          sx={{
            margin: "20px 100px",
          }}
        >
          <Title order={1}>Test Suites</Title>
          <Group position="apart">
            <TextInput
              placeholder="Search"
              withAsterisk
              onChange={(e) => {
                setSearch(e.currentTarget.value);
              }}
            />
            <Button onClick={handleCreateSuite}>Create Suite</Button>
          </Group>
          <Grid
            style={{
              alignItems: "stretch",
            }}
          >
            {suites
              .filter((suite: any) => {
                return suite.suite_name
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((suite: any) => (
                <Grid.Col key={suite.id} sm={5} md={4} lg={3}>
                  <SuitCard suite={suite} fetchSuites={fetchSuites} />
                </Grid.Col>
              ))}
          </Grid>
        </Stack>
        <CreateSuitModal
          opened={createSuitModalOpen}
          close={() => handleCreateSuiteClose()}
        />
      </Container>
    </DashboardLayout>
  );
}
