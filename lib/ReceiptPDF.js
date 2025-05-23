import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 12,
  },
  bold: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginVertical: 10,
  },
  footer: {
    marginTop: 30,
    fontSize: 10,
    color: '#555',
  },
});

export default function ReceiptPDF({ name, email, plushie, qty, total, date }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Ploosh Preorder Receipt</Text>
        <Text>Date: {date}</Text>

        <View style={styles.line} />

        <View style={styles.section}>
          <Text style={styles.bold}>Bill to:</Text>
          <Text>{name}</Text>
          <Text>Email: {email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>From:</Text>
          <Text>Ploosh Inc</Text>
          <Text>123 Cuddly Lane</Text>
          <Text>Plushville, NY 10001</Text>
          <Text>support@ploosh.ai</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>Order Summary:</Text>
          <View style={styles.row}>
            <Text>Item</Text>
            <Text>Qty</Text>
            <Text>Price</Text>
            <Text>Total</Text>
          </View>
          <View style={styles.row}>
            <Text>{plushie}</Text>
            <Text>{qty}</Text>
            <Text>${total.toFixed(2)}</Text>
            <Text>${(qty * total).toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text>Subtotal:</Text>
            <Text>${total.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text>Tax:</Text>
            <Text>$0.00</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.bold}>Total:</Text>
            <Text style={styles.bold}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Thank you for your preorder! If you have any questions, contact us at support@ploosh.ai.
        </Text>
      </Page>
    </Document>
  );
}
