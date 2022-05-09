import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ClientData, Food, Meal } from '../../utils/types';

// Create styles
const styles = StyleSheet.create({
  document: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  page: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    width: '100%',
    height: '100%',
  },
  section: {
    padding: '20px',
    width: '100%',
    backgroundColor: '#FAFAFA',
    borderRadius: '10px',
    marginBottom: '10px',
    // flexGrow: 1
  },
  clientSection: {
    padding: 10,
    width: '100%',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    borderBottom: '1px solid gray',
  },
  footer: {
    marginTop: '20px',
    alignSelf: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '12px',
    marginBottom: '5px',
    textTransform: 'uppercase',
    color: 'rgb(105, 105, 105)',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '12px',
    marginBottom: '3px',
    color: '#505050',
  },
  text: {
    fontSize: '12px',
    color: 'rgb(105, 105, 105)',
  },
  info: {
    fontSize: '9px',
    color: 'rgb(105, 105, 105)',
  },
  mealsTitle: {
    width: '100%',
    textAlign: 'center',
    marginBottom: '10px',
    color: '#696969',
  },
  date: {
    marginTop: '7px',
    fontSize: '10px',
    color: 'rgb(105, 105, 105)',
  }
});

type Props = {
  data: {
    client: ClientData,
    meals: Meal[]
  }
}

const date = new Date().toLocaleDateString()

const MyDocument = ({ data }: Props) => (
  <Document>
    <Page size="A4" style={styles.document}>
      <View style={styles.page}>
        <View style={styles.clientSection}>
          <Text style={styles.title}>{data?.client?.client_name}</Text>
          <Text style={styles.text}>{data?.client?.weight_kg} kg</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <Text style={styles.mealsTitle}>Refeições</Text>
        {data?.meals?.map((m: Meal) => (
          <View key={m.id} style={styles.section}>
            <Text style={styles.subtitle}>{m.name.toUpperCase()} - {m.time}h</Text>
            {m.foods?.map((f: Food) => (
              <View key={f.id}>
                <Text style={styles.text}>{f.chosen_qty}g - {f.description}</Text>
              </View>
            ))}
        </View>
        ))}
        <View style={styles.footer}>
          <Text style={styles.text}>Sistema para Uso Educacional</Text>
          <Text style={styles.text}>Nutricionista Fabrício Degrandis</Text>
          <Text style={styles.info}>Nutrição Esportiva</Text>
          <Text style={styles.info}>2022</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default MyDocument;