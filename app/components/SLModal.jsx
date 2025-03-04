import { Modal, TitleBar } from "@shopify/app-bridge-react";
import { Box, Text } from "@shopify/polaris";

export default function SLModal({
  open,
  primaryAction,
  onHide,
  title,
  description,
}) {
  const { text, callback } = primaryAction;
  return (
    <Modal id="confirmation-modal" open={open} onHide={onHide}>
      <Box padding={400}>
        <Text as="h3">{description}</Text>
      </Box>

      <TitleBar title={title}>
        <button variant="primary" tone="critical" onClick={() => callback()}>
          {text || "Delete"}
        </button>
      </TitleBar>
    </Modal>
  );
}
