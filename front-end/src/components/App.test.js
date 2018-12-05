import {Switcher} from './App'
import {MemoryRouter} from "react-router-dom"
import {mount} from "enzyme"
import React from 'react'
import {UserList} from "../containers/UserList"
import {SingleUser} from "../containers/SingleUser"
import {LogIn} from '../containers/LogIn'
import {PeopleList} from "../containers/PeopleList"
import {Home} from "./Home"
import {PersonDetail} from "../containers/PersonDetail"
import {SignUp} from "../containers/SignUp"
import  {Provider} from 'react-redux'
import {store} from "../store"


describe('<App />', () => {

   let wrapper = (path) => mount(
      <MemoryRouter initialEntries={[path]}>
         <Provider store={store}>
            <Switcher />
         </Provider>
      </MemoryRouter>
   );

   it('should navigate to /log-in page', () => {
      const path = '/log-in';
      const comp = wrapper(path);
      expect(comp.find(LogIn)).toHaveLength(1);
      expect(comp.find(SignUp)).toHaveLength(0);
   });

   it('should navigate to /sign-up page', () => {
      const path = '/sign-up';
      const comp = wrapper(path);
      expect(comp.find(LogIn)).toHaveLength(0);
      expect(comp.find(SignUp)).toHaveLength(1);
   });

   it('should navigate to /users page', () => {
      const path = '/users';
      const comp = wrapper(path);
      expect(comp.find(LogIn)).toHaveLength(0);
      expect(comp.find(SignUp)).toHaveLength(0);
      expect(comp.find(UserList)).toHaveLength(1);
   });

   it('should navigate to / page', () => {
      const path = '/';
      const comp = wrapper(path);
      expect(comp.find(LogIn)).toHaveLength(0);
      expect(comp.find(SignUp)).toHaveLength(0);
      expect(comp.find(UserList)).toHaveLength(0);
      expect(comp.find(Home)).toHaveLength(1);
   });

   it('should navigate to /detail/:id page', () => {
      const path = '/detail/:id';
      const comp = wrapper(path);
      expect(comp.find(LogIn)).toHaveLength(0);
      expect(comp.find(SignUp)).toHaveLength(0);
      expect(comp.find(UserList)).toHaveLength(0);
      expect(comp.find(Home)).toHaveLength(0);
      expect(comp.find(SingleUser)).toHaveLength(1);
   });

   it('should navigate to /people-list page', () => {
      const path = '/people-list';
      const comp = wrapper(path);
      expect(comp.find(LogIn)).toHaveLength(0);
      expect(comp.find(SignUp)).toHaveLength(0);
      expect(comp.find(UserList)).toHaveLength(0);
      expect(comp.find(Home)).toHaveLength(0);
      expect(comp.find(SingleUser)).toHaveLength(0);
      expect(comp.find(PeopleList)).toHaveLength(1);
   });

   it('should navigate to /person-detail/:id page', () => {
      const path = '/person-detail/:id';
      const comp = wrapper(path);
      expect(comp.find(LogIn)).toHaveLength(0);
      expect(comp.find(SignUp)).toHaveLength(0);
      expect(comp.find(UserList)).toHaveLength(0);
      expect(comp.find(Home)).toHaveLength(0);
      expect(comp.find(SingleUser)).toHaveLength(0);
      expect(comp.find(PeopleList)).toHaveLength(0);
      expect(comp.find(PersonDetail)).toHaveLength(1);
   })
});
