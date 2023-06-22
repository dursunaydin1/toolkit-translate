import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnswer, getLanguages } from "../app/actions";
import Select from "react-select";
import { clearAnswer } from "../app/translateSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainPage = () => {
  const state = useSelector((store) => store);
  const dispatch = useDispatch();
  console.log(state);
  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const soruceInput = useRef();
  const targetInput = useRef();
  const [text, setText] = useState("");
  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });

  const handleClick = () => {
    if (soruceInput.current.value === "") {
      toast.error("Çevrilecek metin boş olamaz.");
      return;
    }
    dispatch(getAnswer({ text, sourceLang, targetLang }));
  };

  const clearClick = () => {
    if (soruceInput.current.value === "" && targetInput.current.value === "") {
      toast.error("Temizlenecek alanlar boş.");
      return;
    }
    soruceInput.current.value = "";
    targetInput.current.value = "";
    dispatch(clearAnswer());
  };

  const changeLang = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    soruceInput.current.value = "";
    targetInput.current.value = "";
    dispatch(clearAnswer());
  };

  return (
    <>
      <h1
        style={{
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          background: "linear-gradient(45deg, #FFD700, #FFA500)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Toolkit Thunk Çeviri +
      </h1>
      <div className="container">
        <div className="left">
          <Select
            value={sourceLang}
            onChange={(e) => setSourceLang(e)}
            isDisabled={state.isLoading}
            isLoading={state.isLoading}
            className="select"
            options={state.languages}
          />
          <textarea
            ref={soruceInput}
            placeholder="Çevirmek için yaz."
            onChange={(e) => setText(e.target.value)}
            type="text"
          ></textarea>
        </div>
        <button
          style={{
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            background: "linear-gradient(45deg, #FFD700, #FFA500)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className="change-btn"
          onClick={changeLang}
        >
          <i className="fas fa-exchange-alt"></i>
        </button>
        <div className="right">
          <Select
            value={targetLang}
            onChange={(e) => setTargetLang(e)}
            isLoading={state.isLoading}
            isDisabled={state.isLoading}
            className="select"
            options={state.languages}
          />
          <textarea
            ref={targetInput}
            value={state.answer}
            placeholder="çeviri"
            className="disabled-area"
            disabled
            type="text"
          ></textarea>
        </div>
      </div>
      <button
        style={{
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          background: "linear-gradient(45deg, #FFD700, #FFA500)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="cevir"
        onClick={handleClick}
      >
        Çevir
      </button>

      <button
        style={{
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          background: "linear-gradient(45deg, #FFD700, #FFA500)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="temiz"
        onClick={clearClick}
      >
        Temizle
      </button>
      <ToastContainer />
    </>
  );
};

export default MainPage;
