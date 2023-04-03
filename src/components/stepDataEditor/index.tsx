import { Button, Group, Select, Stack, Text, TextInput } from "@mantine/core";
import React from "react";

const StepDataEditor = () => {
  return (
    <Stack>
      <Select
        placeholder="Step Command"
        data={[
          { label: "Option 1", value: "option-1" },
          { label: "Option 2", value: "option-2" },
          { label: "Option 3", value: "option-3" },
        ]}
      />
      <TextInput placeholder="value" />
      <TextInput placeholder="target" />
      <Group position="right">
        <Button>Save</Button>
      </Group>
    </Stack>
  );
};

export default StepDataEditor;
