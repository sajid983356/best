import React, { useState} from 'react';
import { Button, Box, Toolbar, AppBar } from '@mui/material';
import { useTranslation } from 'react-i18next';

import NumberForm from './Component/NumberForm';
import  './Component/i18n';
import Footer from './Component/FooterData';
import QRCodeGenerator from './Component/QRCodeGenerator';


function App() {
  const { t, i18n } = useTranslation();
  const [ QRCodeDisplay, setQRCodeDisplay ] = useState(false)
  const [ currentMonthUrl, setCurrentMonthUrl ] = useState('');
  const [ consumerNumber, setConsumerNumber ] = useState('');
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }
  return (
    <div>
      <AppBar sx={{ background: 'none', boxShadow:'none', color: 'black'}} position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => window.location.reload()}>Home</Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => changeLanguage('en')}>English</Button>
          <Button color="inherit" onClick={() => changeLanguage('hi')}>हिन्दी</Button>
        </Toolbar>
      </AppBar>
      {QRCodeDisplay && <QRCodeGenerator url={currentMonthUrl} consumerNumber={consumerNumber} />}
      <NumberForm translation={t} setQRCodeDisplay={setQRCodeDisplay} setCurrentMonthUrl={setCurrentMonthUrl} setConsumerNumber={setConsumerNumber}/>
      <Footer translation={t} />
    </div>
  )
}

export default App;