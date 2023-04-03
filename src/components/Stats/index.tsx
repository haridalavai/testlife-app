import { Paper, Group, Text, ThemeIcon } from "@mantine/core";
import { stat } from "fs";
import React from "react";

export interface StatsProps {
  title: string;
  value: string;
  color: string;
}

const Stats: React.FC<StatsProps> = ({ title, value, color }) => {
  return (
    <Paper withBorder p="md" radius="md" my="xs" mx="sm">
      <Group position="apart">
        <div>
          <Text c="dimmed" tt="uppercase" fw={400} fz="xs">
            {title}
          </Text>
          <Text
            fw={700}
            fz="md"
            sx={{
              color: color,
            }}
          >
            {value}
          </Text>
        </div>
      </Group>
    </Paper>
  );
};

export default Stats;
