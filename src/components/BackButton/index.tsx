import React from "react";
import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";

export interface BackButtonProps {
  url: string;
}

const BackButton: React.FC<BackButtonProps> = ({ url }) => {
  const router = useRouter();
  return (
    <Button
      size="xs"
      compact
      // radius='xl'
      variant="light"
      color="black"
      leftIcon={
        <IconArrowLeft
          style={{
            width: "15px",
            // color: 'white',
          }}
        />
      }
      onClick={() => {
        router.push(url);
      }}
    >
      Back
    </Button>
  );
};

export default BackButton;
