const { PrismaClient } = require("@prisma/client");
const axios = require("axios");

const prisma = new PrismaClient();

async function handler(req, res) {
  try {
    

    const {
      clientPot,
      clientEstimated,
      clientFirstName,
      clientCity,
      clientGenWMaya,
      clientGenWOMaya,
      effValue,
      effPerc,
      clientModNum,
      clientNome,
      clientCNPJ,
      clientEmailempresa,
      clientCpfsocio,
      clientEnderecoCompletoSocio,
      clientEnderecoCompletoEmpresa,
      clientEmailSocio,
      clienteRepresentantelegal,
      clientNumProposta,
      clientDataProposta,
      clientEndereçoCompletoEmpresa,
      clientValorTotal,
      clientFormadePagamento,
      clientValorMensal,
      clientDataEmissãoContrato,
    } = req.body;

    console.log(clientPot, clientEstimated);

    
        const documentId = "tEYU2ZLQYgscFLaL7p8U5N";
        const apiKey = "597c4ce7e2bce349973d60f3a1c440c38975d956";

        const url = "https://api.pandadoc.com/public/v1/documents";

        const data = {
          name: "Simple API Sample Document from PandaDoc Template",
          template_uuid: "tEYU2ZLQYgscFLaL7p8U5N",
          recipients: [
            {
              email: "test@gmail.com",
              first_name: "usuario ",
              last_name: "teste",
            },
          ],
          tokens: [
            {
              name: "Client.Pot",
              value: clientPot,
            },
            {
              name: "Client.Estimated",
              value: clientEstimated,
            },
            {
              name: "Client.FirstName",
              value: clientFirstName,
            },
            {
              name: "Client.City",
              value: clientCity,
            },
            {
              name: "Client.GenWMaya",
              value: clientGenWMaya,
            },
            {
              name: "Client.GenWOMaya",
              value: clientGenWOMaya,
            },
            {
              name: "EffValue",
              value: effValue,
            },
            {
              name: "EffPerc",
              value: effPerc,
            },
            {
              name: "Client.ModNum",
              value: clientModNum,
            },
            {
              name: "Client.nome",
              value: clientNome,
            },
            {
              name: "Client.CNPJ",
              value: clientCNPJ,
            },
            {
              name: "client.emailempresa",
              value: clientEmailempresa,
            },
            {
              name: "client.cpfsocio",
              value: clientCpfsocio,
            },
            {
              name: "client.enderecocompletosocio",
              value: clientEnderecoCompletoSocio,
            },
            {
              name: "client.enderecocompletoempresa",
              value: clientEnderecoCompletoEmpresa,
            },
            {
              name: "client.emailsocio",
              value: clientEmailSocio,
            },
            {
              name: "Cliente.representantelegal",
              value: clienteRepresentantelegal,
            },
            {
              name: "client.n°proposta",
              value: clientNumProposta,
            },
            {
              name: "client.dataproposta",
              value: clientDataProposta,
            },
            {
              name: "client.endereçocompletoempresa",
              value: clientEndereçoCompletoEmpresa,
            },
            {
              name: "client.valortotal",
              value: clientValorTotal,
            },
            {
              name: "client.formadepagamento",
              value: clientFormadePagamento,
            },
            {
              name: "client.valormensal",
              value: clientValorMensal,
            },
            {
              name: "client.dataemissãocontrato",
              value: clientDataEmissãoContrato,
            },
          ],
        };

        const response = await axios.post(
          `https://api.pandadoc.com/public/v1/documents`,
          data,
          {
            headers: {
              Authorization: `API-Key ${apiKey}`,
              accept: "application/json",
              "content-type": "application/json",
            },
          }
        );

        if (response.status >= 200 && response.status < 300) {
          console.log("chegou");
          return res.status(200).json({ message: `Documento criado` });
        } else {
          return res.status(200).json({ message: `sucesso` });
        }

     
   
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Erro ao retornar os dados. ${error}` });
  }
}

module.exports = handler;
