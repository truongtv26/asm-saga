import { call, takeEvery } from "redux-saga/effects";
import { GET_USER_REQUEST, getUserFailure } from ".";

function* getUsersRequest() {
     // try {
     //      const response = yield call(authApi.getUser)
     //      console.log(response);
          
     //      const { data } = response
          
     // } catch (error) {
     //      console.log(error);
          
     // }
     
}



export function* authSaga() {
     yield takeEvery(GET_USER_REQUEST, getUsersRequest)
}

