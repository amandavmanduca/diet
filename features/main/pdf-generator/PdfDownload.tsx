import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from ".";


const PdfDownload = ({ data }: any) => {
    return (
        <PDFDownloadLink document={<MyDocument data={data} />} fileName="dieta" style={{ marginTop: '10px' }}>
            {({loading}) => (loading ? null : 'Baixar PDF')}
        </PDFDownloadLink>
    )
}

export default PdfDownload;