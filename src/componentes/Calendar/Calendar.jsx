import { React, useCallback, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { FaTimes } from "react-icons/fa";
//import axios from "axios";
import styled from "styled-components";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import api from "../../services/api";

const ContainerCalendar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-top: 10px;
  padding: 15px;
  background-color: white;
  width: 100%;
  height: 100%;
  #calendar {
    width: 80%;
  }
`;

var data = new Date();
const datas = {
  begin: new Date(data.getFullYear(), 0, 1).toISOString().split("T")[0],
  end: new Date(data.getFullYear(), 11, 31).toISOString().split("T")[0],
};
const Calendar = () => {
  const [eventos, setEventos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [processo, setProcesso] = useState([]);
  const [process, setProcess] = useState({});

  const dataSet = useCallback(async () => {
    const response = await api.get(
      `processos?start=${datas.begin}&end=${datas.end}&skip=0&limit=500`
    );
    setProcesso(response.data.process);
    return response;
  }, []);
  const fetchAndSetEventos = async () => {
    const result = await dataSet(); // Assuming dataSet is a function that returns a Promise
    const dataSet_ = result.data.process.map((item) => {
      const { portal, modality, bidding_notice, date_finish, status } =
        item.process_data;

      const backgroundColor =
        status === "Proposta enviada"
          ? "green"
          : status === "Cancelado"
          ? "orange"
          : "red";

      return {
        id: item._id,
        groupId: portal,
        title: `${modality}: ${bidding_notice}`,
        start: new Date(date_finish).toISOString().split("T")[0],
        end: new Date(date_finish).toISOString().split("T")[0],
        backgroundColor,
        borderColor: "white",
      };
    });

    setEventos(dataSet_);
  };

  useEffect(() => {
    fetchAndSetEventos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openModalProcess(param) {
    const findItem = processo.find((item) => item._id === param);
    const { portal, modality, bidding_notice, date_finish, status, object } =
      findItem.process_data;
    const { name: governmentName } = findItem.government.find((data) =>
      data.manager.includes("true")
    );
    setProcess({
      portal,
      modality,
      bidding_notice,
      date_finish,
      status,
      object,
      governmentName,
    });
    setShowModal(true);
  }

  return (
    <>
      <ContainerCalendar>
        <div id="calendar">
          <FullCalendar
            initialDate={
              new Date(data.getFullYear(), new Date().getMonth(), 1)
                .toISOString()
                .split("T")[0]
            }
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            locale="pt-br"
            events={eventos}
            eventClick={(e) => openModalProcess(e.event.id)}
            themeSystem="bootstrap5"
            timeZone="America/Sao_Paulo"
            display="background"
            navLinks="true" // can click day/week names to navigate views
            businessHours="true" // display business hours
            editable="true"
            selectable="true"
            monthMode="true"
            eventColor="blue"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "today,dayGridWeek,dayGridMonth",
            }}
          />
        </div>
      </ContainerCalendar>
      <Modal
        show={showModal}
        cancel={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader>
          <ModalTitle>DADOS DO PROCESSO</ModalTitle>
          <FaTimes onClick={(e) => setShowModal(false)} />
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <strong>ÓRGÃO:</strong>{" "}
              </div>
              <div className="col-sm-8">{process.governmentName}</div>
              <div className="col-sm-4">
                <strong>DATA DISPUTA:</strong>{" "}
              </div>
              <div className="col-sm-8">
                {new Date(process.date_finish).toLocaleDateString()}
              </div>
              <div className="col-sm-4">
                <strong>EDITAL:</strong>{" "}
              </div>
              <div className="col-sm-8">{process.bidding_notice}</div>
              <div className="col-sm-4">
                <strong>PORTAL:</strong>{" "}
              </div>
              <div className="col-sm-8">{process.portal}</div>
              <div className="col-sm-4">
                <strong>OBJETO:</strong>{" "}
              </div>
              <div className="col-sm-8">{process.object}</div>
              <div className="col-sm-4">
                <strong>MODALIDADE:</strong>{" "}
              </div>
              <div className="col-sm-8">{process.modality}</div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Calendar;
