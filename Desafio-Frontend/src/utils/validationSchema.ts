import * as Yup from "yup";

const telefoneRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const cepRegex = /^[0-9]{8}$/;

const cpfCnpjRegex =
  /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;

export const validationSchema = Yup.object({
  nome: Yup.string().required("O nome escolhido é invalido."),
  email: Yup.string()
    .email("E-mail inválido.")
    .required("E-mail é obrigatório"),
  telefone: Yup.string().matches(telefoneRegex).required("Telefone inválido."),
  cpfCnpj: Yup.string()
    .matches(cpfCnpjRegex)
    .required("CPF/CNPJ fornecido é inválido."),
  cep: Yup.string().matches(cepRegex).required("CEP é inválido"),
  endereco: Yup.string().required("Endereço é inválido"),
  complemento: Yup.string().required("Complemento é inválido"),
  cidade: Yup.string().required("Cidade é inválido"),
  bairro: Yup.string().required("Bairro é inválido"),
  uf: Yup.string().required("UF é inválido"),
  pagamento: Yup.string().required("Campo inválido"),
  numeroCartao: Yup.string()
    .matches(/^\d{16}$/)
    .test({
      name: "numeroCartao",
      test: function (value) {
        const { pagamento } = this.parent;
        if (pagamento === "cartao") {
          return !!value;
        }
        return true;
      },
      message: "Campo obrigatório",
    }),
  validadeCartao: Yup.string()
    .matches(/^\d{2}\/\d{2}$/)
    .test({
      name: "validadeCartao",
      test: function (value) {
        const { pagamento } = this.parent;
        if (pagamento === "cartao") {
          return !!value;
        }
        return true;
      },
      message: "Campo inválido."
    }),
  nomeImpresso: Yup.string()
    .matches(/^(?:\b[a-zA-Z]+\b\s+){1,2}\b[a-zA-Z]+\b$/)
    .test({
      name: "nomeImpresso",
      test: function (value) {
        const { pagamento } = this.parent;
        if (pagamento === "cartao") {
          return !!value;
        }
        return true;
      },
      message: "Campo obrigatório",
    }),
  cvv: Yup.string()
    .matches(/^\d{3}$/)
    .test({
      name: "cvv",
      test: function (value) {
        const { pagamento } = this.parent;
        if (pagamento === "cartao") {
          return !!value;
        }
        return true;
      },
      message: "Campo obrigatório",
    }),
});
