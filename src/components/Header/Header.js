import React from 'react';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

function Header() {
  return (
        <header>
          <h2><LibraryBooksIcon style={{ fontSize: 30, marginRight:20 }}/> Dictionary Management Application <LibraryBooksIcon style={{ fontSize: 30, marginLeft:20 }}/></h2>
          <p>Simple React application used to manage custom dictionaries that can be applied to certain
            columns in your data sets in order to obtain a desired result set, validating to respect all the rules of consistency
            like <b>Duplicates</b>, <b>Forks</b>, <b>Cycles</b> and <b>Chains</b>.
          </p>
          <p>Technologies used: React, ES6, SASS, create-react-app, Jest Enzyme</p>
        </header>
  );
}

export default Header;