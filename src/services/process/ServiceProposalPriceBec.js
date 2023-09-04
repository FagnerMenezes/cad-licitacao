import axios from "axios";

export const RegisterProposalPriceBec = async (data) => {
  //console.log(data);
  let headersList = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvIiwiYXVkIjpbImh0dHA6Ly9sb2NhbC5hcGkuZWZmZWN0aS5jb20uYnIiLCJodHRwOi8vbG9jYWxob3N0OjMwMDAiXSwic3ViIjoxNjIzODUzNjUzMDI5LCJjb21wYW55Ijo1MjQsInByb2ZpbGVzIjpbMV19.GwOlJhO4010BlRP9yduRyLkgmNj-DiuHrYqveQHdtfs",
    "Content-Type": "application/json",
  };
  //console.log(data);
  let bodyContent = JSON.stringify(data);

  let reqOptions = {
    url: "https://mdw.minha.effecti.com.br/api-integracao/v1/proposta/bec",
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };

  let response = await axios.request(reqOptions);
  console.log(response.data);
  return response.data;
};
