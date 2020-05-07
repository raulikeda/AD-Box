import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import logo from "./logo.png";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const { AccountData, ContractData, ContractForm } = newContextComponents;
//const { AccountData, ContractData } = newContextComponents;

let acc = Math.floor(Math.random() * 10);

export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  return (
    <div className="App">
      <ToastContainer />
      <div>
        <img src={logo} alt="drizzle-logo" />
        <h1>Drizzle Examples</h1>
        <p>
          Exemplo de como usar o drizzle!
        </p>
        <p>
          Baseado no box: <a href="https://www.trufflesuite.com/boxes/drizzle">https://www.trufflesuite.com/boxes/drizzle</a>
        </p>
      </div>

      <div className="section">
        <h2>Minha Carteira Ethereum</h2>
        <AccountData
          drizzle={drizzle}
          drizzleState={drizzleState}
          accountIndex={acc}
          units="ether"
          precision={3}
        />
      </div>

      <div className="section">
        <h2>Saldo da Conta no Banco</h2>
        <p>
          Exemplo de como pegar um atributo do contrato com a minha própria chave.
        </p>
        <p>
          <strong>Saldo Atual: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="Bank"
            method="clients"
            methodArgs={[drizzleState.accounts[acc]]}
          />
        </p>

      </div>
      <div className="section">
        <h2>TutorialToken</h2>
        <p>
          Here we have a form with custom, friendly labels. Also note the token
          symbol will not display a loading indicator. We've suppressed it with
          the <code>hideIndicator</code> prop because we know this variable is
          constant.
        </p>
      </div>
      <h3>Deposito (1000 wei)</h3>
      <ContractForm
        drizzle={drizzle}
        contract="Bank"
        method="deposit"
        sendArgs={{ "from": drizzleState.accounts[acc], "value": 1000 }}
      />
      <h3>Saque</h3>
      <ContractForm
        drizzle={drizzle}
        contract="Bank"
        method="withdraw"
        labels={["Quantidade Desejada"]}
      />
      <h3>Transferência</h3>
      <ContractForm
        drizzle={drizzle}
        contract="Bank"
        method="transfer"
        labels={["Conta Destino", "Quantidade Desejada"]}
      />

    </div>
  );
};
