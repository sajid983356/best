import {
  Button,
  CircularProgress,
  TextField,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    margin:'0 1rem',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "85vh",
    boxSizing: "border-box",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(1), // Adds space between the text fields
    [theme.breakpoints.down("md")]: {
      gap: theme.spacing(2), // Adds space between the text fields
      flexDirection: "column", // Switch to column layout on small screens
    },
  },
  textField: {
    width: "100%",
  },
  but: {
    padding: "0 5rem !important",
    [theme.breakpoints.down("md")]: {
      padding: "0.5rem !important",
    },
  },
  loader: {
    marginBottom: theme.spacing(2),
  },
}));

const NumberForm = ({ translation , setQRCodeDisplay, setCurrentMonthUrl, setConsumerNumber}) => {
  const classes = useStyles();
  const [number, setNumber] = useState(localStorage.getItem("number") || "");
  const [month, setMonth] = useState(localStorage.getItem("month") || "");
  const [year, setYear] = useState(localStorage.getItem("year") || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("number", number);
  }, [number]);

  useEffect(() => {
    localStorage.setItem("month", month);
  }, [month]);

  useEffect(() => {
    localStorage.setItem("year", year);
  }, [year]);

  const basicValidation = () => {
    let error = "";
    if (number.length === 0 || number.length < 9) {
      error = "pls enter a valid 9 digit consumer number";
    } else if (month.length === 0 || month.length < 2) {
      error = "pls enter a valid month (e.g., 01, 02,..., 11, 12)";
    } else if (year.length === 0 || year.length < 4) {
      error = "Please enter a valid year (e.g., 2023, 2024).";
    }
    if (error) {
      alert(error);
      return;
    }
    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const result = basicValidation();
    if (result === true) {
      setLoading(true);
      const url = `https://dashboard.bestundertaking.net:9595/duplicatebill/DuplicateBill?accno=${number}&billingMonth=${year.slice(
        -2
      )}${month}&ward=7&tariff1=LTIB&tariff2=&flag=2`;
      // window.open(url, '_blank');
      window.location.href = url;
    }
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    // Validate input to allow only numeric characters
    if (/^\d*$/.test(value)) {
      setNumber(value);
    }
  };

  const handleMonthChange = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      setMonth(event.target.value);
    }
  };
  const handleYearChange = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      setYear(event.target.value);
    }
  };

  const handleGenerateQRCode = (event) => {
    event.preventDefault();

    let error;
    if(number.length === 0 || number.length < 9) {
      error = "pls enter a valid 9 digit consumer number";
        setQRCodeDisplay(false)
    }
    if(error) {
        alert(error)
        return
    }
    const curentDate = new Date();
    const currentMonth = String(curentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns zero-based index
    const currentYear = String(curentDate.getFullYear());
    const url = `https://dashboard.bestundertaking.net:9595/duplicatebill/DuplicateBill?accno=${number}&billingMonth=${currentYear.slice(-2)}${currentMonth}&ward=7&tariff1=LTIB&tariff2=&flag=2`;
    
    console.log('currentDate', currentMonth, currentYear)
    setCurrentMonthUrl(url)
    setConsumerNumber(number)
    setQRCodeDisplay(true)
  };

  return (
    <div className={classes.root} >
      {loading && <CircularProgress className={classes.loader} />}
      <form className={classes.form}>
        <TextField
          className={classes.textField}
          label={translation("consumerNumber")}
          variant="outlined"
          size="large"
          value={number}
          onChange={handleChange}
          inputProps={{
            inputMode: "numeric", // Specifies the keyboard to numeric
            pattern: "[0-9]*", // Restricts input to digits only
            maxLength: 9, // Limits maximum length of input
          }}
        />
        <TextField
          className={classes.textField}
          label={translation("month")}
          variant="outlined"
          size="large"
          value={month}
          onChange={handleMonthChange}
          inputProps={{
            inputMode: "numeric", // Specifies the keyboard to numeric
            pattern: "[0-9]*", // Restricts input to digits only
            maxLength: 2, // Limits maximum length of input
          }}
        />
        <TextField
          className={classes.textField}
          label={translation("year")}
          variant="outlined"
          size="large"
          value={year}
          onChange={handleYearChange}
          inputProps={{
            inputMode: "numeric", // Specifies the keyboard to numeric
            pattern: "[0-9]*", // Restricts input to digits only
            maxLength: 4, // Limits maximum length of input
          }}
        />

        <Button
          className={classes.but}
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {translation("submit")}
        </Button>

        <Tooltip title="Generate QR Code for current billing month">
          <Button
            className={classes.but}
            size="large"
            type="button" // Use type="button" to prevent form submission
            variant="contained"
            color="secondary"
            onClick={handleGenerateQRCode} // Call handleGenerateQRCode function on click
          >
            {translation("generateQRCode")}
          </Button>
        </Tooltip>
      </form>
    </div>
  );
};

export default NumberForm;
