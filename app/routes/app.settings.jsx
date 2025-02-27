import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  Divider,
  TextField,
  useBreakpoints,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
export async function loader() {
  // provides data to the component
  let settings = {
    name: "sample test app",
    desc: "This is an sample app created to learn shopify developement...",
  };

  return json(settings);
}

export async function action({ request }) {
  // updates persistent data
  let settings = await request.formData();
  settings = Object.fromEntries(settings);
  return json(settings);
}

export default function Settings() {
  const { smUp } = useBreakpoints();
  const settings = useLoaderData();
  const [formSaved, setFormSaved] = useState(settings);
  return (
    <Page>
      <TitleBar title="Settings" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "3fr 4fr 2fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                App settings
              </Text>
              <Text as="p" variant="bodyMd">
                Update app settings here...
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="POST">
              <BlockStack gap="400">
                <TextField
                  label="app name"
                  value={formSaved.name}
                  name={"name"}
                  onChange={(value) =>
                    setFormSaved({ ...formSaved, name: value })
                  }
                />
                <TextField
                  label="description"
                  value={formSaved.desc}
                  name={"description"}
                  onChange={(value) =>
                    setFormSaved({ ...formSaved, desc: value })
                  }
                />
                <Button submit={true}>Save</Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
        {smUp ? <Divider /> : null}
      </BlockStack>
    </Page>
  );
}
