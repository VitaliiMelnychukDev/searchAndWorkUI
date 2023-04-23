import { Container, Main } from './styles';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import { companyPaths, generalPath, globalPath } from '../../constants/paths';
import { Companies } from '../Companies/Companies';
import { Works } from '../Works/Works';
import { Main as MainPage } from '../Main/Main';
import { Login } from '../Login/Login';
import { UserPage } from '../UserPage/UserPage';
import { Register } from '../Register/Register';
import { Create as CompanyCreate } from '../Companies/Create/Create';
import { Edit as CompanyEdit } from '../Companies/Edit/Edit';

export const Layout = (): JSX.Element => {

  return <Container>
    <Header />
    <Main>
      <Routes>
        <Route path={companyPaths.create} Component={CompanyCreate}></Route>
        <Route path={companyPaths.edit} Component={CompanyEdit}></Route>
        <Route path={generalPath.companies} Component={Companies}></Route>
        <Route path={generalPath.works} Component={Works}></Route>
        <Route path={generalPath.login} Component={Login}></Route>
        <Route path={generalPath.register} Component={Register}></Route>
        <Route path={generalPath.account} Component={UserPage}></Route>
        <Route path={globalPath} Component={MainPage} ></Route>
      </Routes>
    </Main>
    <Footer />
  </Container>
}