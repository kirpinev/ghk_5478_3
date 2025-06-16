import { ButtonMobile } from "@alfalab/core-components/button/mobile";

import { Typography } from "@alfalab/core-components/typography";

import { LS, LSKeys } from "./ls";
import { appSt } from "./style.css";
import { ThxLayout } from "./thx/ThxLayout";
import { Gap } from "@alfalab/core-components/gap";
import { ChangeEvent, useEffect, useState } from "react";
import { AmountInput } from "@alfalab/core-components/amount-input";
import { SliderInput } from "@alfalab/core-components/slider-input";
import { Divider } from "@alfalab/core-components/divider";
import { Switch } from "@alfalab/core-components/switch";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";
import image5 from "./assets/image5.png";
import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";

// function calculateMonthlyPayment(
//   annualRate: number,
//   periodsPerYear: number,
//   totalPeriods: number,
//   loanAmount: number,
// ) {
//   const monthlyRate = annualRate / periodsPerYear;
//
//   return (
//     (monthlyRate * loanAmount) / (1 - Math.pow(1 + monthlyRate, -totalPeriods))
//   );
// }

export const App = () => {
  // const [loading, setLoading] = useState(false);
  const [thx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [amount, setAmount] = useState(16_000);
  const [amount1, setAmount1] = useState(16_000);
  const [years1, setYears1] = useState(1);
  const [stringYears1, setStringYears1] = useState("На 1 год");

  const [isAutoChecked, setIsAutoChecked] = useState(true);
  const [isRealEstate, setIsRealEstate] = useState(true);
  const [step, setStep] = useState(0);

  const handleSumSliderChange = ({ value }: { value: number }) => {
    setAmount(value);
  };

  const handleYears1SliderChange = ({ value }: { value: number }) => {
    setYears1(value);

    if (value === 1) {
      setStringYears1("На 1 год");
    } else if (value > 1 && value < 5) {
      setStringYears1(`На ${value} года`);
    } else {
      setStringYears1(`На ${value} лет`);
    }
  };

  const handleSum1SliderChange = ({ value }: { value: number }) => {
    setAmount1(value);
  };

  const handleSumInputChange = (
    _: ChangeEvent<HTMLInputElement>,
    { value }: { value: number | string },
  ) => {
    setAmount(Number(value) / 100);
  };

  const handleSum1InputChange = (
    _: ChangeEvent<HTMLInputElement>,
    { value }: { value: number | string },
  ) => {
    setAmount1(Number(value) / 100);
  };

  const handleYears1InputChange = (
    _: ChangeEvent<HTMLInputElement>,
    { value }: { value: number | string },
  ) => {
    setYears1(Number(value) / 100);
  };

  const formatPipsValue = (value: number) =>
    `${value.toLocaleString("ru-RU")} ₽`;

  const formatPipsYearsValue = (value: number) => {
    return `${value.toLocaleString("ru-RU")} ${value <= 1 ? "год" : "лет"}`;
  };

  const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));

  // const submit = () => {
  //   setLoading(true);
  //   Promise.resolve().then(() => {
  //     setLoading(false);
  //     setThx(true);
  //     LS.setItem(LSKeys.ShowThx, true);
  //   });
  // };

  useEffect(() => {
    if (step === 1 || thx) {
      document.body.style.backgroundColor = "white";
    } else {
      document.body.style.backgroundColor = "#F3F4F5";
    }
  }, [step]);

  if (thx) {
    return <ThxLayout />;
  }

  return (
    <>
      {step === 0 && (
        <div
          className={appSt.container}
          style={{ backgroundColor: "white", height: "100vh" }}
        >
          <img src={image1} alt="" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography.TitleResponsive
              font="system"
              tag="h3"
              view="medium"
              className={appSt.productsTitle}
              style={{ textAlign: "center" }}
            >
              Сколько вы готовы платить в месяц?
            </Typography.TitleResponsive>
            <Typography.Text
              tag="p"
              view="primary-medium"
              color="secondary"
              defaultMargins={false}
              style={{ textAlign: "center" }}
            >
              Укажите максимальную сумму, которую готовы вносить за кредит
            </Typography.Text>
          </div>

          <Gap size={24} />

          <SliderInput
            block={true}
            value={amount * 100}
            sliderValue={amount}
            onInputChange={handleSumInputChange}
            onSliderChange={handleSumSliderChange}
            onBlur={() => setAmount((prev) => clamp(prev, 10_000, 250_000))}
            min={10_000}
            max={250_000}
            range={{ min: 10_000, max: 250_000 }}
            pips={{
              mode: "values",
              values: [10_000, 250_000],
              format: { to: formatPipsValue },
            }}
            step={1}
            Input={AmountInput}
            labelView="outer"
            size={48}
          />
          <Gap size={96} />
        </div>
      )}

      {step === 1 && (
        <div
          className={appSt.container}
          style={{ backgroundColor: "white", height: "100vh" }}
        >
          <img src={image2} alt="" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography.TitleResponsive
              font="system"
              tag="h3"
              view="medium"
              className={appSt.productsTitle}
              style={{ textAlign: "center" }}
            >
              Есть ли у вас собственность?
            </Typography.TitleResponsive>
            <Typography.Text
              tag="p"
              view="primary-medium"
              color="secondary"
              defaultMargins={false}
              style={{ textAlign: "center" }}
            >
              Важно чтобы это было в вашей собственности
            </Typography.Text>
          </div>

          <Gap size={24} />

          <div className={appSt.sumCard}>
            <Switch
              id="auto"
              block={true}
              reversed={true}
              checked={isAutoChecked}
              label="Автомобиль есть  "
              onChange={() => setIsAutoChecked((prevState) => !prevState)}
            />
          </div>
          <Divider className={appSt.divider} />
          <div
            className={appSt.sumCard}
            style={{
              borderBottomLeftRadius: "1rem",
              borderBottomRightRadius: "1rem",
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              marginTop: "-1px",
            }}
          >
            <Switch
              id="auto"
              block={true}
              reversed={true}
              checked={isRealEstate}
              label="Недвижимость есть"
              onChange={() => setIsRealEstate((prevState) => !prevState)}
            />
          </div>
          <Gap size={96} />
        </div>
      )}

      {step === 2 && (
        <div
          className={appSt.container}
          style={{ backgroundColor: "white", height: "100vh" }}
        >
          <img src={image3} alt="" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography.TitleResponsive
              font="system"
              tag="h3"
              view="medium"
              className={appSt.productsTitle}
              style={{ textAlign: "center" }}
            >
              На какую сумму вы хотите взять кредит?
            </Typography.TitleResponsive>
            <Typography.Text
              tag="p"
              view="primary-medium"
              color="secondary"
              defaultMargins={false}
              style={{ textAlign: "center" }}
            >
              Главное уложиться в доступный диапазон
            </Typography.Text>
          </div>

          <Gap size={24} />

          <SliderInput
            block={true}
            value={amount1 * 100}
            sliderValue={amount1}
            onInputChange={handleSum1InputChange}
            onSliderChange={handleSum1SliderChange}
            onBlur={() => setAmount1((prev) => clamp(prev, 10_000, 1_700_000))}
            min={10_000}
            max={1_700_000}
            range={{ min: 10_000, max: 1_700_000 }}
            pips={{
              mode: "values",
              values: [10_000, 1_700_000],
              format: { to: formatPipsValue },
            }}
            step={1}
            Input={AmountInput}
            labelView="outer"
            size={48}
          />
          <Gap size={96} />
        </div>
      )}

      {step === 3 && (
        <div
          className={appSt.container}
          style={{ backgroundColor: "white", height: "100vh" }}
        >
          <img src={image4} alt="" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography.TitleResponsive
              font="system"
              tag="h3"
              view="medium"
              className={appSt.productsTitle}
              style={{ textAlign: "center" }}
            >
              На какой срок?
            </Typography.TitleResponsive>
            <Typography.Text
              tag="p"
              view="primary-medium"
              color="secondary"
              defaultMargins={false}
              style={{ textAlign: "center" }}
            >
              Укажите максимальную сумму, которую готовы вносить за кредит
            </Typography.Text>
          </div>

          <Gap size={24} />

          <SliderInput
            block={true}
            value={stringYears1}
            sliderValue={years1}
            onInputChange={handleYears1InputChange}
            onSliderChange={handleYears1SliderChange}
            onBlur={() => setYears1((prev) => clamp(prev, 1, 20))}
            min={1}
            max={20}
            range={{ min: 1, max: 20 }}
            pips={{
              mode: "values",
              values: [1, 20],
              format: { to: formatPipsYearsValue },
            }}
            step={1}
            labelView="outer"
            size={48}
          />
          <Gap size={96} />
        </div>
      )}

      {step === 4 && (
        <div
          className={appSt.container}
          style={{
            padding: 0,
          }}
        >
          <div
            style={{
              backgroundColor: "#F3F4F5",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Gap size={32} />
            <Typography.Text
              tag="p"
              view="primary-medium"
              color="secondary"
              defaultMargins={false}
              style={{ textAlign: "center" }}
            >
              Кредит наличными
            </Typography.Text>
            <Typography.TitleResponsive
              font="system"
              tag="h3"
              view="medium"
              className={appSt.productsTitle}
              style={{ textAlign: "center" }}
            >
              На своих условиях
            </Typography.TitleResponsive>
            <img
              src={image5}
              alt=""
              height={133}
              style={{ marginTop: "-45px" }}
            />
          </div>

          <div
            className={appSt.sumContainer}
            style={{
              padding: "16px",
              borderRadius: "16px",
              marginTop: "-16px",
            }}
          >
            <div className={appSt.card}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography.Text
                    tag="p"
                    view="primary-large"
                    weight="bold"
                    defaultMargins={false}
                  >
                    20 000 ₽/мес
                  </Typography.Text>
                  <Typography.Text
                    tag="p"
                    view="primary-small"
                    defaultMargins={false}
                  >
                    1 700 000 ₽
                  </Typography.Text>
                  <Typography.Text
                    tag="p"
                    view="primary-small"
                    defaultMargins={false}
                  >
                    {years1} {years1 === 1 && "год"}{" "}
                    {years1 > 1 && years1 <= 4 && "года"} {years1 > 5 && "лет"}
                  </Typography.Text>
                  <Typography.Text
                    tag="p"
                    view="primary-small"
                    defaultMargins={false}
                  >
                    Без залога
                  </Typography.Text>
                </div>
                <div
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "#EF3124",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    alignSelf: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <Typography.Text
                    tag="p"
                    view="primary-small"
                    defaultMargins={false}
                    style={{ color: "white", fontSize: "11px" }}
                  >
                    Альфа-Выгодно
                  </Typography.Text>
                </div>
              </div>
              <ButtonMobile block={true} size="xs">
                Выбрать
              </ButtonMobile>
            </div>
            <Gap size={16} />
            <Typography.TitleResponsive
              font="system"
              tag="h3"
              view="small"
              className={appSt.productsTitle}
            >
              Может подойти
            </Typography.TitleResponsive>
            <Gap size={16} />
            <div className={appSt.card}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography.Text
                    tag="p"
                    view="primary-large"
                    weight="bold"
                    defaultMargins={false}
                  >
                    22 000 ₽/мес
                  </Typography.Text>
                  <Typography.Text
                    tag="p"
                    view="primary-small"
                    defaultMargins={false}
                  >
                    2 000 000 ₽
                  </Typography.Text>
                  <Typography.Text
                    tag="p"
                    view="primary-small"
                    defaultMargins={false}
                  >
                    {years1} {years1 === 1 && "год"}{" "}
                    {years1 > 1 && years1 <= 4 && "года"} {years1 > 5 && "лет"}
                  </Typography.Text>
                  <Typography.Text
                    tag="p"
                    view="primary-small"
                    defaultMargins={false}
                  >
                    Без залога
                  </Typography.Text>
                </div>
              </div>
              <ButtonMobile block={true} size="xs">
                Выбрать
              </ButtonMobile>
            </div>
            <Gap size={16} />
            <div className={appSt.card}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography.Text
                    tag="p"
                    view="primary-large"
                    weight="bold"
                    defaultMargins={false}
                  >
                    18 000 ₽/мес
                  </Typography.Text>
                  <Typography.Text
                    tag="p"
                    view="primary-small"
                    defaultMargins={false}
                  >
                    1 700 000 ₽
                  </Typography.Text>
                  <Typography.Text
                    tag="p"
                    view="primary-small"
                    defaultMargins={false}
                  >
                    {years1} {years1 === 1 && "год"}{" "}
                    {years1 > 1 && years1 <= 4 && "года"} {years1 > 5 && "лет"}
                  </Typography.Text>
                  <Typography.Text
                    tag="p"
                    view="primary-small"
                    defaultMargins={false}
                  >
                    Под залог авто
                  </Typography.Text>
                </div>
              </div>
              <ButtonMobile block={true} size="xs">
                Выбрать
              </ButtonMobile>
            </div>
            <Gap size={16} />
            <div className={appSt.card}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography.Text
                    tag="p"
                    view="primary-large"
                    weight="bold"
                    defaultMargins={false}
                  >
                    16 000 ₽/мес
                  </Typography.Text>
                  <Typography.Text
                    tag="p"
                    view="primary-small"
                    defaultMargins={false}
                  >
                    1 700 000 ₽
                  </Typography.Text>
                  <Typography.Text
                    tag="p"
                    view="primary-small"
                    defaultMargins={false}
                  >
                    {years1} {years1 === 1 && "год"}{" "}
                    {years1 > 1 && years1 <= 4 && "года"} {years1 > 5 && "лет"}
                  </Typography.Text>
                  <Typography.Text
                    tag="p"
                    view="primary-small"
                    defaultMargins={false}
                  >
                    Под залог недвижимости
                  </Typography.Text>
                </div>
              </div>
              <ButtonMobile block={true} size="xs">
                Выбрать
              </ButtonMobile>
            </div>
          </div>
        </div>
      )}

      {step === 0 && (
        <div className={appSt.bottomBtnThx}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <div
              style={{
                padding: "27px",
                borderRadius: "16px",
                backgroundColor: "#F8F8F8",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src={icon1} alt="" width={8.5} height={14} />
            </div>
            <div
              onClick={() => setStep(1)}
              style={{
                padding: "16px",
                borderRadius: "16px",
                backgroundColor: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                flexBasis: "100%",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography.Text
                  tag="p"
                  view="primary-small"
                  defaultMargins={false}
                  style={{ color: "white" }}
                >
                  {step + 1} из 4
                </Typography.Text>
                <Typography.Text
                  tag="p"
                  view="primary-medium"
                  defaultMargins={false}
                  style={{ color: "white" }}
                >
                  Следующий шаг
                </Typography.Text>
              </div>
              <img src={icon2} alt="" width={8.5} height={14} />
            </div>
            {/*<ButtonMobile*/}
            {/*  loading={loading}*/}
            {/*  onClick={() => setStep(1)}*/}
            {/*  block*/}
            {/*  view="primary"*/}
            {/*>*/}
            {/*  Продолжить*/}
            {/*</ButtonMobile>*/}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className={appSt.bottomBtnThx}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <div
              onClick={() => setStep(0)}
              style={{
                padding: "27px",
                borderRadius: "16px",
                backgroundColor: "#F8F8F8",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src={icon1} alt="" width={8.5} height={14} />
            </div>
            <div
              onClick={() => setStep(2)}
              style={{
                padding: "16px",
                borderRadius: "16px",
                backgroundColor: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                flexBasis: "100%",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography.Text
                  tag="p"
                  view="primary-small"
                  defaultMargins={false}
                  style={{ color: "white" }}
                >
                  {step + 1} из 4
                </Typography.Text>
                <Typography.Text
                  tag="p"
                  view="primary-medium"
                  defaultMargins={false}
                  style={{ color: "white" }}
                >
                  Следующий шаг
                </Typography.Text>
              </div>
              <img src={icon2} alt="" width={8.5} height={14} />
            </div>
            {/*<ButtonMobile*/}
            {/*  loading={loading}*/}
            {/*  onClick={() => setStep(1)}*/}
            {/*  block*/}
            {/*  view="primary"*/}
            {/*>*/}
            {/*  Продолжить*/}
            {/*</ButtonMobile>*/}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={appSt.bottomBtnThx}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <div
              onClick={() => setStep(1)}
              style={{
                padding: "27px",
                borderRadius: "16px",
                backgroundColor: "#F8F8F8",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src={icon1} alt="" width={8.5} height={14} />
            </div>
            <div
              onClick={() => setStep(3)}
              style={{
                padding: "16px",
                borderRadius: "16px",
                backgroundColor: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                flexBasis: "100%",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography.Text
                  tag="p"
                  view="primary-small"
                  defaultMargins={false}
                  style={{ color: "white" }}
                >
                  {step + 1} из 4
                </Typography.Text>
                <Typography.Text
                  tag="p"
                  view="primary-medium"
                  defaultMargins={false}
                  style={{ color: "white" }}
                >
                  Следующий шаг
                </Typography.Text>
              </div>
              <img src={icon2} alt="" width={8.5} height={14} />
            </div>
            {/*<ButtonMobile*/}
            {/*  loading={loading}*/}
            {/*  onClick={() => setStep(1)}*/}
            {/*  block*/}
            {/*  view="primary"*/}
            {/*>*/}
            {/*  Продолжить*/}
            {/*</ButtonMobile>*/}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={appSt.bottomBtnThx}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <div
              onClick={() => setStep(2)}
              style={{
                padding: "27px",
                borderRadius: "16px",
                backgroundColor: "#F8F8F8",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src={icon1} alt="" width={8.5} height={14} />
            </div>
            <div
              onClick={() => setStep(4)}
              style={{
                padding: "16px",
                borderRadius: "16px",
                backgroundColor: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                flexBasis: "100%",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography.Text
                  tag="p"
                  view="primary-small"
                  defaultMargins={false}
                  style={{ color: "white" }}
                >
                  {step + 1} из 4
                </Typography.Text>
                <Typography.Text
                  tag="p"
                  view="primary-medium"
                  defaultMargins={false}
                  style={{ color: "white" }}
                >
                  Следующий шаг
                </Typography.Text>
              </div>
              <img src={icon2} alt="" width={8.5} height={14} />
            </div>
            {/*<ButtonMobile*/}
            {/*  loading={loading}*/}
            {/*  onClick={() => setStep(1)}*/}
            {/*  block*/}
            {/*  view="primary"*/}
            {/*>*/}
            {/*  Продолжить*/}
            {/*</ButtonMobile>*/}
          </div>
        </div>
      )}
    </>
  );
};
