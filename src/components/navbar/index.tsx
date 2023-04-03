import { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  Group,
  ActionIcon,
  useMantineColorScheme,
  Avatar,
  useMantineTheme,
} from "@mantine/core";
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
  IconMoonStars,
  IconSun,
  IconPlus,
} from "@tabler/icons-react";
import { navbarConfig } from "./navbarConfig";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  link: {
    width: 40,
    height: 40,
    // borderRadius: theme.radius.sm,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: any;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right">
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}
export function NavbarComponent({ hidden, hiddenBreakpoint }: any) {
  const router = useRouter();
  const [active, setActive] = useState(router.pathname);
  const [switchOrgModalOpen, setswitchOrgModalOpen] = useState<boolean>(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const links = navbarConfig.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={link.route === active}
      onClick={() => router.push(link.route)}
    />
  ));

  return (
    <>
      <Navbar
        width={{ base: 80 }}
        p="md"
        // hidden={hidden}
        hiddenBreakpoint={hiddenBreakpoint}
        style={{
          borderLeft: `6px solid ${theme.colors.teal[4]}`,
        }}
      >
        <Navbar.Section grow mt={50}>
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {links}
          </Stack>
        </Navbar.Section>
        <Navbar.Section>
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
            spacing={0}
          >
            <NavbarLink
              icon={IconLogout}
              label="Logout"
              // onClick={handleSignOut}
            />
            <NavbarLink
              icon={IconSwitchHorizontal}
              label="Switch Organization"
              // onClick={handleSwitchOrg}
            />
          </Stack>
        </Navbar.Section>
      </Navbar>
    </>
  );
}
