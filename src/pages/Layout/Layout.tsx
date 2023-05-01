import { Container, Main } from './styles';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import {
  accountCategoriesPaths,
  accountHoursPaths,
  companyPaths,
  generalPath,
  globalPath,
  workPaths
} from '../../constants/paths';
import { Companies } from '../Companies/Companies';
import { Works } from '../Works/Works';
import { Main as MainPage } from '../Main/Main';
import { Login } from '../Login/Login';
import { UserPage } from '../UserPage/UserPage';
import { Register } from '../Register/Register';
import { Create as CompanyCreate } from '../Companies/Create/Create';
import { Edit as CompanyEdit } from '../Companies/Edit/Edit';
import { Create as WorkCreate } from '../Works/Create/Create';
import { Edit as WorkEdit } from '../Works/Edit/Edit';
import { Work as WorkView } from '../Work/Work';
import { Create as AccountCategoryCreate } from '../AccountCategories/Create/Create';
import { Edit as AccountCategoryEdit } from '../AccountCategories/Edit/Edit';
import { AccountCategories } from '../AccountCategories/AccountCategories';
import { Create as AccountHourCreate } from '../AccountHours/Create/Create';
import { Edit as AccountHourEdit } from '../AccountHours/Edit/Edit';
import { AccountHours } from '../AccountHours/AccountHours';

export const Layout = (): JSX.Element => {

  return <Container>
    <Header />
    <Main>
      <Routes>
        <Route path={accountHoursPaths.create} Component={AccountHourCreate}></Route>
        <Route path={accountHoursPaths.edit} Component={AccountHourEdit}></Route>
        <Route path={generalPath.accountHours} Component={AccountHours}></Route>
        <Route path={accountCategoriesPaths.create} Component={AccountCategoryCreate}></Route>
        <Route path={accountCategoriesPaths.edit} Component={AccountCategoryEdit}></Route>
        <Route path={generalPath.accountCategories} Component={AccountCategories}></Route>
        <Route path={companyPaths.create} Component={CompanyCreate}></Route>
        <Route path={companyPaths.edit} Component={CompanyEdit}></Route>
        <Route path={generalPath.companies} Component={Companies}></Route>
        <Route path={workPaths.create} Component={WorkCreate}></Route>
        <Route path={workPaths.edit} Component={WorkEdit}></Route>
        <Route path={workPaths.view} Component={WorkView}></Route>
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