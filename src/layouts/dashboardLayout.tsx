import React, { useEffect, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Container,
  Box,
} from "@mantine/core";
import { NavbarComponent } from "../components/navbar";
import { HeaderComponent } from "../components/header";
import ThemeSwitcher from "@/components/themeSwitcher";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          overflow: "auto",
          padding: "0px 0px 0px 80px",
          // borderLeft: "2px solid",
        },
      }}
      navbar={
        <Box style={{}}>
          <NavbarComponent hiddenBreakpoint="sm" hidden={!opened} />
        </Box>
      }
    >
      {/* <Container size='xl'> */}
      {children}
      {/* </Container> */}

      <ThemeSwitcher />
    </AppShell>
  );
}
