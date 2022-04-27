// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  // let skip = 0
  let skip = 500

  const allRequests: any = []

  for (let index = 0; index < 50; index++) {
    const request = `https://dietbox.me/pt-BR/Alimento/ListarPorNutricionista/?tabela=0&skip=${skip}&take=10&search=&_=1650580324967`
    // const request = `https://dietbox.me/pt-BR/Alimento/ListarPorNutricionista/?tabela=4&skip=${skip}&take=10&search=&_=1650580324940`
    allRequests.push(request)
    skip = skip + 10
  }

  const fetchAll = async (urls: any) => {
    const res: any = await Promise.all(urls.map((r: any) => fetch(r, {
      headers: {
        "Authorization": "8gRGVncmFuZGlzIiwidGlkIjoiZWVmNmZmYzAtNDJhYS00OGVmLWE4NDYtMzkxOTBmMDJhZDkwIiwic2NwIjoiZGlldGJveC1hcGktZXNjcml0YSBkaWV0Ym94LWFwaS1sZWl0dXJhIiwiYXpwIjoiNDUxYmViMDQtYWIzOC00MjE2LThkM2ItMmZjNGJmZGQ5NTVlIiwidmVyIjoiMS4wIiwiaWF0IjoxNjUwNTgxMDQ4fQ.VcShFxrwsOZHVRskAwLnUJ11CBjjD1aljPXeth7jo0nIA4EtNZOqqkwdC5ChfDSKmXpX32C68DKnzsWp9bvBxX7HUA21cQ48cJ3vvnFCqq5sk91c8KHHCjapNr9yhgZdU729NvNfo9EidKSz5nSk0wShCg0dBg4jW1si3Oxa8x_dzvAWK_uJ5fmGOCyoaFDOydvUbUcsqdk0Iobez4winVDaitUhKfzYzGG8pVoHNOpQpnd2E464KRwASChaMLul_XjQOpCoLCNABMRfEi0TpgpcpRVYxs3RT27v-gZE6F0VSnDghlNVO3TuSt87MRe3YwKovPCYppTN00g8A3-kmA",
        "cookie": "_gcl_au=1.1.872021407.1650566422; __zlcmid=19bkruiJ9HYKuK4; i18n.langtag=pt-BR; _timeZoneOffset=-180; 867948=1; cookieconsent_status=dismiss; _BEAMER_USER_ID_LrwrGuSN14504=383532f8-3225-430e-b84f-7951a0a46059; _BEAMER_FIRST_VISIT_LrwrGuSN14504=2022-04-21T18:44:47.764Z; _BEAMER_LAST_POST_SHOWN_LrwrGuSN14504=26095614; _BEAMER_BOOSTED_ANNOUNCEMENT_DATE_LrwrGuSN14504=2022-04-21T18:46:33.607Z; __RequestVerificationToken=nhvtqwMbSurmBifP9E_gcYCUBnrXD-fpRlMLeBRusiG16W59LOnSlMCB4KmJNu-7Sjggpgkl0KHvydBBB46xjVDBn3lwt5tFhgTtIJ1JXw01; gtPaciente2ResumoAjuda_867948=1; _tabelaDefault=9; _BEAMER_FILTER_BY_URL_LrwrGuSN14504=false; JWT=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6InhucW1MdmlzLTNIMmZVenB0YmRWT0pYNXFnMkM0eW54TDNCejEtTUZlNncifQ.eyJpc3MiOiJodHRwczovL2RpZXRib3hudXRyaWNpb25pc3Rhcy5iMmNsb2dpbi5jb20vZWVmNmZmYzAtNDJhYS00OGVmLWE4NDYtMzkxOTBmMDJhZDkwL3YyLjAvIiwiZXhwIjoxNjUwNTgxNjQ4LCJuYmYiOjE2NTA1ODEwNDgsImF1ZCI6IjQ1MWJlYjA0LWFiMzgtNDIxNi04ZDNiLTJmYzRiZmRkOTU1ZSIsInN1YiI6ImMxNjgyOTY3LWI0YWMtNDU0NC1iZDlkLWQ5MTNhNmM0ZTQxNSIsImVtYWlsIjoiZGVncmFuZGlzNDdAZ21haWwuY29tIiwiUm9sZXMiOiJOdXRyaWNpb25pc3RhIiwiZXh0ZW5zaW9uX3VzZXJJZEFwcGxpY2F0aW9uIjoiODY3OTQ4IiwiY291bnRyeSI6InB0LUJSIiwicmVmcmVzaFRva2Vuc1ZhbGlkRnJvbURhdGVUaW1lIjoxNjMyMjUwOTE3LCJuYW1lIjoiRmFicmljaW8gRGVncmFuZGlzIiwidGlkIjoiZWVmNmZmYzAtNDJhYS00OGVmLWE4NDYtMzkxOTBmMDJhZDkwIiwic2NwIjoiZGlldGJveC1hcGktZXNjcml0YSBkaWV0Ym94LWFwaS1sZWl0dXJhIiwiYXpwIjoiNDUxYmViMDQtYWIzOC00MjE2LThkM2ItMmZjNGJmZGQ5NTVlIiwidmVyIjoiMS4wIiwiaWF0IjoxNjUwNTgxMDQ4fQ.VcShFxrwsOZHVRskAwLnUJ11CBjjD1aljPXeth7jo0nIA4EtNZOqqkwdC5ChfDSKmXpX32C68DKnzsWp9bvBxX7HUA21cQ48cJ3vvnFCqq5sk91c8KHHCjapNr9yhgZdU729NvNfo9EidKSz5nSk0wShCg0dBg4jW1si3Oxa8x_dzvAWK_uJ5fmGOCyoaFDOydvUbUcsqdk0Iobez4winVDaitUhKfzYzGG8pVoHNOpQpnd2E464KRwASChaMLul_XjQOpCoLCNABMRfEi0TpgpcpRVYxs3RT27v-gZE6F0VSnDghlNVO3TuSt87MRe3YwKovPCYppTN00g8A3-kmA; .AspNet.Cookies=D3Fps5zmEaSgfFlivDEBB8YMp-e5psnQp1eQ_LnlCM_RLdnFLQ2tClln-gl87m_RdsIm-_ra1vo69U1a2_Om0cXY0sxy4EbVFj6xPMxv2sFE0yj-4xXdBCHHhMU4mScrEjIQ3Iq0oK1zU7jY37Kb-F-icIQZd2CNNSMhNcBonOEAb--XKBDkr56l7uOio908l4pGEQDMHNoyBb4z1ETROSsGpAEHDNHcWDTxif4_5q0IMKJyOuFDdqWqpPBvHLuLDfaaSQ9k5YmwFQ5wqbSI3BTn1qmKeXW8sPvkARBIkQxgvHi7ACKun-tjpegRMp5RJrvMBlVmeHSRAnEGh2SqEFMhaivqrysLnWc0dh5U_0gSRdLheTKsH5YwjcHRgqG9YaMUNRzMFUQ9xgyuNeprKsGo9BhCx-ahhwYg7vdurogTWP9RQQyHqnxEr1j1CB1RL1Vbds_4Iu6AiE9uuvrOwPoor3kyFwXT4j0ZLSLYPUQ8k7DxKwkrHwBHxWN_j2Pi_Qf14GOgXiSuZsnW3clqQcjW4TXHyoxwzaMeDmETs59g_2OylpyR4nqmxtd9eZyIsDCauyRy-6U5uNbEgZ_S5vn1FyBD3eEt2tY9HNT6nrLHilMMzXEBeUgn0HfA9lUPowtaJ-iD937-QFZj1I5d9gVLtEoifr0XkltqSQKkylyjg9Zp6orBdcrebco7yOucwZ2F8vg636L2ct55s77ibpuD1YmMtSQo3TxvrJz0CcFSJMgaUU5rbN3Cv5dy_9fLKV_WTwK4qOu1Gw7S3EnjBJWGrZ_-gw2iU_1oHcP3drtXfABaWBen5wjoMn4YlGFgEvlGmMhwptVZqy7VcedlRzukVd3Yt-KcJajCthg-JeZSB2hbI9fi-tgSogE5kUI_L2BwrGEasLe7kTxFkfvrzzShSGGwknF4nYQf7aLCRk6oGBP-E3ITOrgpJ_T53TMAFNV-jReYPe6SV58MpVIDgw"
      }
    })))
    const jsons: any = await Promise.all(res.map((r: any) => r.json()))
    const teste = (jsons?.map((j: any) => j.result))
    return teste
  }

  const q = (await fetchAll(allRequests))

  console.log(q.length)

  res.status(200).json(q)
}
