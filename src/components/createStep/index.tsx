import { executeStep, saveStep } from "@/api/liveAuthoring";
import { transformInput } from "@/utils/inputTransformer";
import { Group, TextInput, Button } from "@mantine/core";
import React from "react";

export interface CreateStepProps {
  step?: any;
  setIsNewStep?: (value: React.SetStateAction<boolean>) => void;
  fetchSuite: () => void;
  liveActive: boolean;
  executionId?: string;
}

const CreateStep: React.FC<CreateStepProps> = ({
  step,
  setIsNewStep,
  fetchSuite,
  liveActive,
  executionId,
}) => {
  const [newStep, setNewStep] = React.useState("");
  const [newStepCompiled, setNewStepCompiled] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleNewStepNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inp = transformInput(e.currentTarget.value, isValid);
    setNewStep(e.currentTarget.value);
    setIsValid(inp.isValid);
    setNewStepCompiled(inp.transformedInput);
  };

  const handlSaveStep = async () => {
    if (isValid) {
      const data = {
        ...newStepCompiled,
        suite_id: step.suite_id,
        previous_step_id: step.id
          ? step.id
          : "00000000-0000-0000-0000-000000000000",
        next_step_id: step.next_step_id
          ? step.next_step_id
          : "00000000-0000-0000-0000-000000000000",
        exec_type: "reg",
      };
      const resp = await saveStep(data);
      fetchSuite();
      if (setIsNewStep) {
        setIsNewStep(false);
      }
      if (liveActive) {
        const res = await executeStep(resp.data.id, executionId);
        fetchSuite();
      }
    }
  };

  const handleSetIsNewStep = () => {
    if (setIsNewStep) {
      setIsNewStep(false);
    }
  };

  return (
    <Group position="apart">
      <TextInput
        placeholder="Enter Step Name"
        required
        value={newStep}
        onChange={handleNewStepNameChange}
        sx={{
          width: "60%",
        }}
      />
      <Group>
        <Button variant="outline" color="red" onClick={handleSetIsNewStep}>
          Cancel
        </Button>
        <Button disabled={!isValid} onClick={handlSaveStep}>
          Save
        </Button>
      </Group>
    </Group>
  );
};

export default CreateStep;
