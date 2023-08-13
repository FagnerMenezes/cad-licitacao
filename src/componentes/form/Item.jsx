import { useState } from "react";
//import InputFloat from "./InputFloat";
import InputFloat from "@/componentes/form/InputFloat";

const Item = ({ data, handleSubmit }) => {
  const [item, setItem] = useState(data || {});
  //const [checkItem, setCheckItem] = useState(false);

  const handleCheckItem = (e) => {
    setItem({ ...item, winner: e.target.checked });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleOnChangeValue = (e) => {
    const dados = {
      ...item,
      unitary_value: {
        $numberDecimal: e.target.value,
      },
    };

    setItem({ ...item, ...dados });
  };

  const handleOnChangeValueReference = (e) => {
    const dados = {
      ...item,
      value_reference: {
        $numberDecimal: e.target.value,
      },
    };

    setItem({ ...item, ...dados });
  };

  const handleOnChangeValueUnitary = (e) => {
    const dados = {
      ...item,
      unitary_value: {
        $numberDecimal: e.target.value,
      },
    };

    setItem({ ...item, ...dados });
  };

  function submit(e) {
    e.preventDefault();
    // console.log(item);
    handleSubmit(item);
    setItem({});
  }

  return (
    <>
      <form>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <p>Item arrematado ?</p>
            </div>
            <div className="col-sm-1">
              <input
                type={"checkbox"}
                name="winner"
                onChange={handleCheckItem}
                checked={item.winner}
                defaultChecked={false}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-7">
              <InputFloat
                text="Código"
                type="text"
                name="cod"
                placeholder={"Código"}
                handleOnChange={(e) => handleInputChange(e)}
                required
                value={item.cod ? item.cod : ""}
              />
            </div>
            <div className="col-sm-3">
              <InputFloat
                text="Lote"
                type="text"
                name="lote"
                placeholder={"Lote"}
                required
                handleOnChange={(e) => handleInputChange(e)}
                value={item.lote ? item.lote : ""}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-7">
              <InputFloat
                text="Qtde"
                type="text"
                name="amount"
                placeholder={"Qtde"}
                required
                handleOnChange={(e) => handleInputChange(e)}
                value={item.amount || ""}
              />
            </div>
            <div className="col-sm-3">
              <InputFloat
                text="Unidade"
                type="text"
                name="unit"
                placeholder={"Unidade"}
                required
                handleOnChange={(e) => handleInputChange(e)}
                value={item.unit || ""}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <textArea
                className="form-control"
                onChange={(e) => handleInputChange(e)}
                placeholder={"Descrição"}
                name="description"
                required
              >
                {" "}
                {item.description || ""}
              </textArea>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-7">
              <InputFloat
                text="Marca"
                type="text"
                name="brand"
                placeholder={"Marca"}
                required
                handleOnChange={(e) => handleInputChange(e)}
                value={item.brand || ""}
              />
            </div>
            <div className="col-sm-3">
              <InputFloat
                text="Modelo"
                type="text"
                name="model"
                placeholder={"Modelo"}
                required
                handleOnChange={(e) => handleInputChange(e)}
                value={item.model || ""}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-7">
              <InputFloat
                text="Valor unitário"
                type="text"
                name="unitary_value"
                placeholder="Valor Unitário"
                required
                handleOnChange={(e) => handleOnChangeValueUnitary(e)}
                value={
                  item.unitary_value ? item.unitary_value.$numberDecimal : ""
                }
              />
              <InputFloat
                text="Valor de referência"
                type="text"
                name="value_reference"
                placeholder={"Valor de Referência"}
                required
                handleOnChange={(e) => handleOnChangeValueReference(e)}
                value={
                  item.value_reference
                    ? item.value_reference.$numberDecimal
                    : ""
                }
              />
            </div>
            <div className="col-sm-3">
              <InputFloat
                text="Saldo"
                type="text"
                name="item_balance"
                placeholder={"Qtde restante da ata"}
                required
                handleOnChange={(e) => handleInputChange(e)}
                value={item.item_balance}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <button
                type="submit"
                className="text-white font-bold bg-blue-600 hover:bg-blue-800 border rounded-md px-4 py-2 outline-none"
                onClick={(e) => submit(e)}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Item;
