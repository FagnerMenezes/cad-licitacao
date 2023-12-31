import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";
const Proposta = {
  gerarProposta: function (data) {
    pdfMake.vfs ==
      {
        "Roboto-Italic.ttf": "AAEAAAASAQAABAAgR0RFRrRCsIIAA....",
        "Roboto-Medium.ttf": "AAEAAAASAQAABAAgR0RFRrRCsIIAA....",
        "Roboto-MediumItalic.ttf": "AAEAAAASAQAABAAgR0RFRrR....",
        "Roboto-Regular.ttf": "AAEAAAASAQAABAAgR0RFRrRCsIIAA....",
      };

    const fonts = {
      Roboto: {
        normal:
          "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
        bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
        italics:
          "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
        bolditalics:
          "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
      },
    };

    const logoEmpresa = [
      {
        text: "ER",
        style: {
          fontSize: 60,
          bold: true,
          italics: true,
          alignment: "center",
          margin: [0, 10, 0, 0],
        },
      },
    ];
    const dadosEmpresa = [
      {
        text: "ER COMERCIAL MATERIAIS PARA SOLDA LTDA ME",
        style: "styles_header",
      },
      {
        text: "CNPJ 15.135.292/0001-47",
        style: "styles_header",
      },
      {
        text: "RUA CARLOS MARIA STEIMBERG, 166, VILA RÉ SÃO PAULO - SP",
        style: "styles_header",
      },
      {
        text: "TEL 112957-4061 - CEL 11954581488",
        style: "styles_header",
      },
      {
        text: "E-mail licitacoes1@eduar.com.br",
        style: "styles_header",
      },
    ];

    const titleProposta = [
      {
        text: "----------------------------------------------------------------------------------------------------------------------------------------------------------------",
        with: "700px",
        // margin: [0, 0, 0, 0],
      },
      {
        text: "PROPOSTA",
        fontSize: 16,
        alignment: "center",
        bold: true,
      },
    ];

    const textHeader = [
      {
        text: `Ao órgão ${data.government[0].code_government} - ${data.government[0].name} Pregão Eletrônico N° ${data.process_data.bidding_notice}. Apresentamos nossa proposta de preços.`,
        style: {
          margin: [0, 10, 0, 0],
        },
      },
      {
        text: `${data.reference_term?.initial_data}`,
        style: {
          margin: [0, 10, 0, 0],
        },
      },
    ];

    const itens = data.reference_term.itens
      .filter((dados) => (dados.winner === "true") | (dados.winner === true))
      .map((item) => {
        return [
          { text: item.cod, style: "rows" },
          { text: item.description, style: "rows" },
          { text: item.amount, style: "rows" },
          { text: item.unitary, style: "rows" },
          { text: item.brand, style: "rows" },
          { text: item.model, style: "rows" },
          {
            text: parseFloat(item.unitary_value.$numberDecimal).toLocaleString(
              "pt-BR",
              {
                style: "currency",
                currency: "BRL",
              }
            ),
            style: "rows",
          },
          {
            text: parseFloat(
              item.unitary_value.$numberDecimal * item.amount
            ).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }),
            style: "rows",
          },
        ];
      });

    const observacoes = [
      { text: "  " },
      {
        text: "Observações",
        style: {
          fontSize: 14,
          bold: true,
          margin: [0, 20, 0, 20],
          alignment: "justify",
        },
      },
      { text: "------------------------------------" },
      {
        text: `${data.reference_term.comments}`,
        style: {
          fontSize: 6,
          alignment: "justify",
        },
      },
      { text: "  " },
    ];

    const dadosBancarios = [
      {
        text: "Dados Comerciais:",
        style: {
          fontSize: 14,
          bold: true,
          margin: [0, 20, 0, 20],
        },
      },
      { text: "------------------------------------" },
      { text: "  " },
      {
        columns: [
          {
            width: 90,
            text: "Banco",
            style: {
              fontSize: 10,
              bold: true,
            },
          },
          {
            text: `Banco: 001 Banco do Brasil`,
            style: {
              fontSize: 8,
            },
          },
        ],
      },
      {
        columns: [
          {
            width: 90,
            text: "AG ",
            style: {
              fontSize: 10,
              bold: true,
            },
          },
          {
            text: `2730-9`,
            style: { fontSize: 8 },
          },
        ],
      },
      {
        columns: [
          { width: 90, text: "C/C ", style: { fontSize: 10, bold: true } },
          { text: "117.688-9", fontSize: 8 },
        ],
      },
    ];

    const dadosComercias = [
      {
        columns: [
          {
            width: 90,
            text: "prazo para entrega",
            style: {
              fontSize: 10,
              bold: true,
            },
          },
          {
            text: `será de até ${data.reference_term.deadline} a partir do recebimento da Nota de Empenho`,
            style: {
              fontSize: 8,
            },
          },
        ],
      },
      {
        columns: [
          {
            width: 90,
            text: "Validade da proposta ",
            style: {
              fontSize: 10,
              bold: true,
            },
          },
          {
            text: `${data.reference_term.validity}`,
            style: {
              fontSize: 8,
            },
          },
        ],
      },
      {
        columns: [
          {
            width: 90,
            text: "Garantia",
            style: {
              fontSize: 10,
              bold: true,
            },
          },
          {
            text: `${data.reference_term.guarantee}`,
            style: {
              fontSize: 8,
            },
          },
        ],
      },
      {
        columns: [
          { width: 90, text: "Frete", style: { fontSize: 10, bold: true } },
          {
            text: "CIF",
            style: { fontSize: 8 },
          },
        ],
      },
    ];
    const dataD = new Date();
    const mes = [
      "janeiro",
      "fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    const dataDay = [
      {
        text: `São Paulo, ${dataD.getDate()} de ${
          mes[dataD.getMonth()]
        }  de ${dataD.getFullYear()}`,
        style: {
          margin: [20, 30, 0, 0],
          fontSize: 8,
        },
      },
    ];
    const assinatura = [
      {
        text: "--------------------------",
        margin: [20, 75, 20, 0],
        alignment: "center",
      },
      {
        text: "Assinatura",
        style: {
          fontSize: 12,
          bold: true,
          italics: true,
          alignment: "center",
          margin: [20, 80, 20, 0],
        },
      },
    ];

    const totalGeral = data.reference_term.itens
      .filter((dados) => (dados.winner === "true") | (dados.winner === true))
      .map(
        (item) => parseFloat(item.unitary_value.$numberDecimal) * item.amount
      )
      .reduce((acc, item) => acc + item);

    const details = [
      titleProposta,
      textHeader,
      {
        layout: "lightHorizontalLines",
        table: {
          headerRows: 1,
          widths: [20, "*", 20, 20, 50, 50, 60, 50],
          body: [
            [
              { text: "ITEM", style: "columnsHeader" },
              { text: "DESCRIÇÃO", style: "columnsHeader" },
              { text: "QTDE", style: "columnsHeader" },
              { text: "UND", style: "columnsHeader" },
              { text: "MARCA", style: "columnsHeader" },
              { text: "MODELO", style: "columnsHeader" },
              { text: "VALOR UNIT.", style: "columnsHeader" },
              { text: "TOTAL", style: "columnsHeader" },
            ],
            ...itens,
            [
              "",
              "",
              "",
              "",
              {
                text: "TOTAL:",
                style: "totalGeral",
                colSpan: 2,
              },
              "",
              {
                text: totalGeral.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }),
                style: "totalGeral",
                colSpan: 2,
              },
              "",
            ],
          ],
          style: "tableStyle",
        },
      },
      observacoes,
      dadosBancarios,
      dadosComercias,
      dataDay,
      assinatura,
    ];

    const foot = [];
    const docDefinition = {
      pageSize: "A4",
      pageMargins: [40, 90, 20, 5], //40-180-20-5
      header: [
        {
          columns: [logoEmpresa, dadosEmpresa],
        },
      ],
      watermark: {
        text: "ER",
        color: "blue",
        opacity: 0.1,
        bold: true,
        italics: true,
      },
      content: [details],
      footer: [foot],
      styles: {
        tableStyle: {
          margin: [0, 10, 0, 0],
        },
        rows: {
          fontSize: 6,
          alignment: "justify",
        },
        columnsHeader: {
          fontSize: 8,
          color: "white",
          fillColor: "#656eee",
        },
        totalGeral: {
          fontSize: 8,
          bold: true,
        },
        styles_header: {
          fontSize: 10,
          bold: true,
          margin: [0, 5, 0, 0],
        },
        txtHeader: {
          fontsize: 8,
          color: "#3443ca",
          // margin: [30, 30, 0, 30],
        },
      },
    };
    pdfMake.createPdf(docDefinition, null, fonts).download();
  },
};

export default Proposta;
