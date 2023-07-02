import styles from "./CheckoutPage.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { validationSchema } from "../utils/validationSchema";
import { FormTypes } from "../types/types";
import formStore from "../store/formStore";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

type SetFieldValue = (
  field: string,
  value: any,
  shouldValidate?: boolean
) => void;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [showCardFields, setShowCardFields] = useState(false);

  const handleFormSubmit = async (
    values: FormTypes,
    { setSubmitting }: any
  ) => {
    try {
      // Se o envio do formulário for bem-su.cedido
      if (Object.keys(formStore.errors).length === 0) {
        formStore.resetForm();
        toast.success("Veículo comprado com sucesso!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        // Se houver mensagens de erro, exiba-as ao usuário
        formStore.setError("Preencha os dados corretamente.");
        toast.error(formStore.errors);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const fetchAddressData = async (
    cep: string,
    setFieldValue: SetFieldValue
  ) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      setFieldValue("endereco", data.logradouro || "");
      setFieldValue("cidade", data.localidade || "");
      setFieldValue("bairro", data.bairro || "");
      setFieldValue("uf", data.uf || "");
      setFieldValue("complemento", data.complemento || "");
    } catch (err) {
      toast.error("cep invalido");
    }
  };

  return (
    <div className={styles.checkout}>
      <ToastContainer position="top-center" />
      <Formik
        initialValues={formStore.formData}
        onSubmit={handleFormSubmit}
        validationSchema={validationSchema}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className={styles.form}>
            <h2>Informe suas credenciais</h2>
            <label htmlFor="name">Nome</label>
            <Field name="nome" type="text" placeholder="Nome" />
            <ErrorMessage className="error" name="nome" component="div" />
            <label>Email</label>
            <Field name="email" type="email" placeholder="Email" />
            <ErrorMessage className="error" name="email" component="div" />
            <label>Telefone</label>
            <Field name="telefone" type="text" placeholder="Ex: 045991213808" />
            <ErrorMessage className="error" name="telefone" component="div" />
            <label>Cpf/Cnpj</label>
            <Field
              name="cpfCnpj"
              type="text"
              placeholder="Ex: 01039118285/66254540000100"
            />
            <ErrorMessage className="error" name="cpfCnpj" component="div" />
            <label>Cep</label>
            <Field
              name="cep"
              type="text"
              placeholder="Ex: 85807480"
              onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                fetchAddressData(e.target.value, setFieldValue)
              }
            />
            <ErrorMessage className="error" name="cep" component="div" />
            <label>Endereço</label>
            <Field
              name="endereco"
              type="text"
              placeholder="Ex: Rua das Palmeiras"
            />
            <ErrorMessage className="error" name="endereco" component="div" />

            <label>Complemento</label>
            <Field
              name="complemento"
              type="text"
              placeholder="Ex: de 4099/4100 a 5149/5150"
            />
            <ErrorMessage
              className="error"
              name="complemento"
              component="div"
            />
            <label>Cidade</label>
            <Field name="cidade" type="text" placeholder="Ex: Cascavel" />
            <ErrorMessage className="error" name="cidade" component="div" />
            <label>Bairro</label>
            <Field name="bairro" type="text" placeholder="Ex: Coqueiral" />
            <ErrorMessage className="error" name="bairro" component="div" />
            <label>UF</label>
            <Field name="uf" type="text" placeholder="Ex: PR" />
            <ErrorMessage className="error" name="uf" component="div" />

            {/* cartao */}
            <Field
              className={styles.select}
              name="pagamento"
              as="select"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const selectedOption = e.target.value;
                setShowCardFields(selectedOption === "cartao");
                setFieldValue("pagamento", selectedOption);
              }}
            >
              <option value="">Selecione...</option>
              <option value="boleto">Boleto</option>
              <option value="cartao">Cartão de Crédito</option>
            </Field>
            <ErrorMessage className="error" name="pagamento" component="div" />
            {showCardFields && (
              <>
                <label>Número do Cartão</label>
                <Field
                  name="numeroCartao"
                  type="text"
                  placeholder="Ex: 1234567812345678"
                />
                <ErrorMessage
                  className="error"
                  name="numeroCartao"
                  component="div"
                />
                <label>Validade do Cartão</label>
                <Field
                  name="validadeCartao"
                  type="text"
                  placeholder="Ex: 10/25"
                />
                <ErrorMessage
                  className="error"
                  name="validadeCartao"
                  component="div"
                />
                <label>Nome Impresso no Cartão</label>
                <Field
                  name="nomeImpresso"
                  type="text"
                  placeholder="Ex: Leonardo Peres"
                />
                <ErrorMessage
                  className="error"
                  name="nomeImpresso"
                  component="div"
                />
                <label>CVV</label>
                <Field name="cvv" type="text" placeholder="Ex: 123" />
                <ErrorMessage className="error" name="cvv" component="div" />
              </>
            )}
            <button className="btn" type="submit">
              {isSubmitting ? "Enviando..." : "Finalizar Compra"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CheckoutPage;
