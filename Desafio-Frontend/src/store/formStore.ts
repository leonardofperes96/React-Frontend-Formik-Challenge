import { makeAutoObservable } from "mobx";
import { FormData } from "../types/types";

class FormStore {
  formData: FormData = {
    nome: "",
    email: "",
    telefone: "",
    cpfCnpj: "",
    cep: "",
    endereco: "",
    complemento: "",
    cidade: "",
    bairro: "",
    uf: "",
    pagamento: "",
    numeroCartao: "",
    validadeCartao: "",
    nomeImpresso: "",
    cvv: "",
  };
  showCardFields = false;
  errors = "";

  constructor() {
    makeAutoObservable(this);
  }

  setFieldValue(field: keyof FormData, value: string) {
    this.formData[field] = value;
  }

  setError = (errorMessage: string) => {
    this.errors = errorMessage;
  };

  resetForm = () => {
    this.formData = {
      nome: "",
      email: "",
      telefone: "",
      cpfCnpj: "",
      cep: "",
      endereco: "",
      complemento: "",
      cidade: "",
      bairro: "",
      uf: "",
      pagamento: "",
      numeroCartao: "",
      validadeCartao: "",
      nomeImpresso: "",
      cvv: "",
    };
    this.errors = "";
  };
}

const formStore = new FormStore();

export default formStore;
