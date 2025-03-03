import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
} from "@shopify/polaris";
import { json } from "@remix-run/node";
import { TitleBar } from "@shopify/app-bridge-react";

export default function Pricing() {
  return (
    <Page>
      <TitleBar title="Pricing the products" />
      <Layout>
        <Layout.Section>
          <Card>store products list coming soon!!</Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
