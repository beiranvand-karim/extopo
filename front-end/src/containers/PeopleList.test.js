import React from 'react'
import {shallow} from 'enzyme'
import {PeopleList} from "./PeopleList"


describe('<PeopleList />', () => {

   const mockFetchPeopleSuccess = jest.fn();
   const mockFetchPeopleError = jest.fn();
   const mockFetchPeopleBegin = jest.fn();

   it('should fetch people list', ()=> {

      window.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
               resolve({
                  status: 200,
                  json: () => {
                     return new Promise((resolve, reject) => {
                        resolve({
                           people: [
                              {_id: "5c03a4df6a7f801a34bad7a7", "name": "kairm", "email": "beiranvamd.karm@gmail.com"},
                              {_id: "5c03a4df6a7f801a34bad7a7", "name": "kairm", "email": "beiranvamd.karm@gmail.com"}
                           ]
                        })
                     })
                  }
               })
            })
         }
      );

      const wrapper = shallow(<PeopleList fetchPeopleBegin={mockFetchPeopleBegin} fetchPeopleError={mockFetchPeopleError} fetchPeopleSuccess={mockFetchPeopleSuccess}/>);
      expect(mockFetchPeopleBegin.mock.calls.length).toEqual(1);
      setImmediate(()=>{
         expect(mockFetchPeopleSuccess.mock.calls.length).toEqual(1);
      })
   });

});
