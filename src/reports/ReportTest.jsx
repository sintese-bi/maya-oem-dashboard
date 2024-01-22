import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Polygon,
  Image,
} from "@react-pdf/renderer";

export const Report = () => {
  return (
    <Document>
      <Page size="A4">
        <Text>Hello World!</Text>
      </Page>
    </Document>
  );
};
