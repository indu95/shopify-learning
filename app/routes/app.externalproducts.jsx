import {
  Card,
  Layout,
  Page,
  Text,
  Button,
  Thumbnail,
  Frame,
  Spinner,
  DataTable,
} from "@shopify/polaris";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";

const EXTERNAL_API_URL = "https://fakestoreapi.com/products";

export const loader = async () => {
  const response = await fetch(EXTERNAL_API_URL);
  const data = await response.json();
  console.log(data);
  return json(data);
};

export default function ExternalProducts() {
  const products = useLoaderData();
  const fetcher = useFetcher();
  const rows = products.map((prod) => [
    <Thumbnail
      source={prod?.image || ""}
      alt={prod?.title || "product image"}
    ></Thumbnail>,
    <div
      style={{
        whiteSpace: "normal",
        wordBreak: "break-word",
        maxWidth: "140px",
      }}
    >
      {prod.title}
    </div>,
    <div
      style={{
        whiteSpace: "normal",
        wordBreak: "break-word",
        maxWidth: "300px",
      }}
    >
      {prod.description}
    </div>,
    prod.price,
    <Button>Edit</Button>,
    <Button>Delete</Button>,
  ]);
  return (
    <Frame>
      <Page fullWidth title={"External Products"}>
        <Layout>
          <Layout.Section>
            <Card>
              <Text as="h2" variant="headingMd">
                Products List
              </Text>
              {fetcher.state === "loading" ? (
                <Spinner></Spinner>
              ) : (
                <DataTable
                  columnContentTypes={[
                    "text",
                    "text",
                    "text",
                    "text",
                    "text",
                    "text",
                  ]}
                  headings={[
                    "Image",
                    "Title",
                    "Description",
                    "Price",
                    "Edit",
                    "Delete",
                  ]}
                  rows={rows}
                  stickyHeader
                  fixedFirstColumns={1}
                  showTotalsInFooter={true}
                  verticalAlign={"top"}
                  footerContent={`Showing ${rows.length} of ${rows.length} results`}
                ></DataTable>
              )}
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}
