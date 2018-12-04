import React from 'react'
import {shallow} from 'enzyme'
import {LogIn} from "./LogIn"

describe('<LogIn />', () => {

   const checkLogInErrorMock = jest.fn();
   const checkLogInSuccessMock = jest.fn();
   const checkLogInBeginMock =jest.fn();

   it('should sign in', () => {

      window.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
               resolve({
                  status: 200,
                  json: () => {
                     return new Promise((resolve, reject) => {
                        resolve({
                           userName: 'somename',
                           passWord: 'somepassword'
                        })
                     })
                  }
               })
            })
         }
      );

      const wrapper = shallow(<LogIn
         checkLogInError={checkLogInErrorMock}
         checkLogInSuccess={checkLogInSuccessMock}
         checkLogInBegin={checkLogInBeginMock}/>);

      wrapper.find('form').simulate('submit', {preventDefault() {}});

      expect(checkLogInBeginMock.mock.calls.length).toEqual(1);
      setImmediate(()=>{
         expect(checkLogInSuccessMock.mock.calls.length).toEqual(1);
      })

   });

});
