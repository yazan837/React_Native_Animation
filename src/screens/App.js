import React, {useState} from 'react';

import Layout from '../components/Layout';
import Language from './Language';
import Home from './Home';
import Category from './Category';
import {useSelector} from 'react-redux';

export default function App() {
  const lang = useSelector(state => state.home.language);
  const [page, setPage] = useState('language');

  return (
    <Layout page={page} lang={lang}>
      {page == 'language' ? (
        <Language setPage={setPage} />
      ) : page == 'home' ? (
        <Home setPage={setPage} />
      ) : (
        <Category setPage={setPage} />
      )}
    </Layout>
  );
}
