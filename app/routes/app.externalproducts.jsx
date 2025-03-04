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
  Box,
} from "@shopify/polaris";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import SLModal from "../components/SLModal";
import { Modal, useAppBridge, TitleBar } from "@shopify/app-bridge-react";
import { useState, useEffect } from "react";
const EXTERNAL_API_URL = "https://fakestoreapi.com/products";

export const loader = async () => {
  const response = await fetch(EXTERNAL_API_URL);
  const data = await response.json();
  return json(data);
};

const styles = {
  textWrap: {
    whiteSpace: "normal",
    wordBreak: "break-word",
    maxWidth: "140px",
  },
  loaderContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40vh",
  },
};

export default function ExternalProducts() {
  const products = useLoaderData();
  const fetcher = useFetcher();

  const [modalOpen, setModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [productsList, setProductsList] = useState(products);

  const rows = productsList.map((prod) => [
    <Thumbnail
      source={prod?.image || ""}
      alt={prod?.title || "product image"}
    ></Thumbnail>,
    <div style={styles.textWrap}>{prod.title}</div>,
    <div style={styles.textWrap}>{prod.description}</div>,
    prod.price,
    <Button>Edit</Button>,
    <Button
      onClick={() => {
        setModalOpen(true);
        setItemToDelete(prod);
      }}
    >
      Delete
    </Button>,
  ]);
  const deleteProduct = () => {
    const filteredProducts = productsList?.filter(
      (prod) => prod.id !== itemToDelete.id,
    );
    setProductsList(filteredProducts);
    setModalOpen(false);
    setItemToDelete(null);
    shopify.toast.show("Product deleted succesfully", {
      duration: 5000,
    });
  };
  return (
    <Frame>
      <Page fullWidth title={"External Products"}>
        <Layout>
          <Layout.Section>
            <SLModal
              description={`If you delete this product, it can't be undone. Do you want to delete it?`}
              title={`Delete this product`}
              open={modalOpen}
              onHide={() => {
                setModalOpen(false);
                setItemToDelete(null);
              }}
              primaryAction={{
                text: "delete",
                callback: () => {
                  deleteProduct();
                },
              }}
            ></SLModal>

            <Card>
              <Text as="h2" variant="headingMd">
                Products List
              </Text>
              {fetcher.state === "loading" ? (
                <Box fullWidth style={styles.loaderContainer}>
                  <Spinner></Spinner>
                </Box>
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
